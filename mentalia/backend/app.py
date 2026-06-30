import importlib.util
import os
import shutil
import traceback
from datetime import datetime, timezone
from functools import lru_cache
from pathlib import Path
from uuid import uuid4

from flask import Flask, jsonify, request, send_from_directory
from werkzeug.exceptions import RequestEntityTooLarge
from werkzeug.utils import secure_filename


BASE_DIR = Path(__file__).resolve().parent
UPLOAD_DIR = BASE_DIR / "uploads"
BIN_DIR = BASE_DIR / "bin"
MAIN_UPLOAD_DIR = Path(
    os.getenv("MAIN_AUDIO_UPLOAD_DIR", BASE_DIR.parent.parent / "static" / "uploads")
)
MYSQL_AUDIO_DATABASE_URL = os.getenv(
    "MYSQL_AUDIO_DATABASE_URL",
    "mysql+pymysql://root:@localhost/mentalia$mental_ia",
)
ALLOWED_AUDIO_EXTENSIONS = {
    "aac",
    "flac",
    "m4a",
    "mp3",
    "mp4",
    "mpeg",
    "mpga",
    "ogg",
    "wav",
    "webm",
}


def configure_ffmpeg_path():
    BIN_DIR.mkdir(parents=True, exist_ok=True)

    ffmpeg_path = os.getenv("FFMPEG_PATH")
    if ffmpeg_path:
        ffmpeg_file = Path(ffmpeg_path)
        ffmpeg_dir = ffmpeg_file.parent if ffmpeg_file.is_file() else ffmpeg_file

        if ffmpeg_dir.exists():
            os.environ["PATH"] = f"{ffmpeg_dir}{os.pathsep}{os.environ.get('PATH', '')}"

        if ffmpeg_file.is_file() and ffmpeg_file.name.lower() != "ffmpeg.exe":
            local_ffmpeg = BIN_DIR / "ffmpeg.exe"
            shutil.copy2(ffmpeg_file, local_ffmpeg)
            os.environ["PATH"] = f"{BIN_DIR}{os.pathsep}{os.environ.get('PATH', '')}"
            return

    if shutil.which("ffmpeg") is not None:
        return

    if importlib.util.find_spec("imageio_ffmpeg") is None:
        return

    import imageio_ffmpeg

    imageio_ffmpeg_path = Path(imageio_ffmpeg.get_ffmpeg_exe())
    local_ffmpeg = BIN_DIR / "ffmpeg.exe"
    shutil.copy2(imageio_ffmpeg_path, local_ffmpeg)
    os.environ["PATH"] = f"{BIN_DIR}{os.pathsep}{os.environ.get('PATH', '')}"


def create_app():
    configure_ffmpeg_path()

    app = Flask(__name__)
    app.config["MAX_CONTENT_LENGTH"] = int(
        os.getenv("MAX_AUDIO_UPLOAD_MB", "200")
    ) * 1024 * 1024

    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

    frontend_origins = {
        origin.strip()
        for origin in os.getenv(
            "FRONTEND_ORIGIN",
            "http://localhost:5173,http://127.0.0.1:5173",
        ).split(",")
        if origin.strip()
    }

    @app.after_request
    def add_cors_headers(response):
        origin = request.headers.get("Origin")
        response.headers["Access-Control-Allow-Origin"] = (
            origin if origin in frontend_origins else "http://localhost:5173"
        )
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, X-User-Id"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
        response.headers["Vary"] = "Origin"
        return response

    @app.errorhandler(RequestEntityTooLarge)
    def handle_large_upload(_exc):
        max_mb = app.config["MAX_CONTENT_LENGTH"] // (1024 * 1024)
        return jsonify(
            {
                "error": "El archivo de audio es demasiado grande",
                "detail": f"El limite actual es de {max_mb} MB.",
            }
        ), 413

    register_routes(app)
    return app


def parse_mysql_url(database_url):
    from urllib.parse import unquote, urlparse

    parsed = urlparse(database_url)
    return {
        "host": parsed.hostname or "localhost",
        "port": parsed.port or 3306,
        "user": unquote(parsed.username or "root"),
        "password": unquote(parsed.password or ""),
        "database": unquote((parsed.path or "").lstrip("/")),
    }


def get_mysql_connection():
    import pymysql

    config = parse_mysql_url(MYSQL_AUDIO_DATABASE_URL)
    return pymysql.connect(
        host=config["host"],
        port=config["port"],
        user=config["user"],
        password=config["password"],
        database=config["database"],
        charset="utf8mb4",
        autocommit=True,
    )


def insert_audio(audio_data):
    connection = get_mysql_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO audio (
                    id_paciente,
                    ruta_archivo,
                    fecha_subida,
                    sugerencia,
                    emocion_resultado,
                    voz_texto,
                    nombre_audio
                ) VALUES (%s, %s, %s, %s, %s, %s, %s)
                """,
                (
                    audio_data["id_paciente"],
                    audio_data["ruta_archivo"],
                    audio_data["fecha_subida"],
                    audio_data["sugerencia"],
                    audio_data["emocion_resultado"],
                    audio_data["voz_texto"],
                    audio_data["nombre_audio"],
                ),
            )
            return cursor.lastrowid
    finally:
        connection.close()


def fetch_audio(id_paciente=None):
    connection = get_mysql_connection()
    try:
        with connection.cursor() as cursor:
            if id_paciente is None:
                cursor.execute("SELECT * FROM audio ORDER BY fecha_subida DESC")
            else:
                cursor.execute(
                    "SELECT * FROM audio WHERE id_paciente = %s ORDER BY fecha_subida DESC",
                    (id_paciente,),
                )

            columns = [column[0] for column in cursor.description]
            return [dict(zip(columns, row)) for row in cursor.fetchall()]
    finally:
        connection.close()


def fetch_audio_by_id(id_audio):
    connection = get_mysql_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM audio WHERE id_audio = %s", (id_audio,))
            row = cursor.fetchone()
            if row is None:
                return None

            columns = [column[0] for column in cursor.description]
            return dict(zip(columns, row))
    finally:
        connection.close()


def copy_audio_to_main_uploads(file_path, stored_filename):
    MAIN_UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    target_path = MAIN_UPLOAD_DIR / stored_filename
    shutil.copy2(file_path, target_path)
    return target_path


def row_to_audio(row):
    ruta_archivo = row["ruta_archivo"]
    local_file_exists = (UPLOAD_DIR / ruta_archivo).exists()
    main_file_exists = (MAIN_UPLOAD_DIR / ruta_archivo).exists()

    return {
        "id_audio": row["id_audio"],
        "id_paciente": row["id_paciente"],
        "nombre_audio": row["nombre_audio"],
        "ruta_audio": f"uploads/{ruta_archivo}",
        "url_audio": f"/uploads/{ruta_archivo}",
        "fecha_subida": row["fecha_subida"],
        "fecha_audio": row["fecha_subida"],
        "sugerencia": row["sugerencia"],
        "sentimiento": row["emocion_resultado"],
        "emocion_resultado": row["emocion_resultado"],
        "voz_texto": row["voz_texto"],
        "archivo_existe": local_file_exists or main_file_exists,
    }


def register_routes(app):
    @app.route("/api/health", methods=["GET"])
    def health():
        return jsonify({"status": "ok"})

    @app.route("/api/audio/dependencies", methods=["GET"])
    def audio_dependencies():
        return jsonify(
            {
                "whisper": importlib.util.find_spec("whisper") is not None,
                "torch": importlib.util.find_spec("torch") is not None,
                "ffmpeg": shutil.which("ffmpeg") is not None,
            }
        )

    @app.route("/uploads/<path:filename>", methods=["GET"])
    def uploaded_file(filename):
        return send_from_directory(UPLOAD_DIR, filename)

    @app.route("/api/audio", methods=["GET", "OPTIONS"])
    def list_audio():
        if request.method == "OPTIONS":
            return ("", 204)

        id_paciente = request.args.get("id_paciente", type=int)

        rows = fetch_audio(id_paciente)

        return jsonify({"audios": [row_to_audio(row) for row in rows]})

    @app.route("/api/audio/paciente/<int:id_paciente>", methods=["GET", "OPTIONS"])
    def list_patient_audio(id_paciente):
        if request.method == "OPTIONS":
            return ("", 204)

        rows = fetch_audio(id_paciente)

        return jsonify({"audios": [row_to_audio(row) for row in rows]})

    @app.route("/api/audio", methods=["POST", "OPTIONS"])
    def upload_audio():
        if request.method == "OPTIONS":
            return ("", 204)

        file = request.files.get("file") or request.files.get("audio")
        id_paciente = request.form.get("id_paciente", type=int)
        descripcion = request.form.get("descripcion", "").strip()

        if not file or file.filename == "":
            return jsonify({"error": "No se recibio ningun archivo de audio"}), 400

        if not id_paciente:
            return jsonify({"error": "id_paciente es obligatorio"}), 400

        if not is_allowed_audio(file.filename):
            return jsonify({"error": "Formato de audio no permitido"}), 400

        timestamp = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S_%f")
        safe_name = secure_filename(file.filename)
        extension = safe_name.rsplit(".", 1)[1].lower()
        stored_filename = f"{id_paciente}_{timestamp}_{uuid4().hex[:8]}.{extension}"
        file_path = UPLOAD_DIR / stored_filename
        file.save(file_path)

        try:
            transcript = transcribe_audio(file_path)
            sentiment = analyze_sentiment(transcript)
            fecha_subida = datetime.now(timezone.utc).isoformat()
            audio_data = {
                "id_paciente": id_paciente,
                "ruta_archivo": stored_filename,
                "fecha_subida": fecha_subida,
                "sugerencia": descripcion,
                "emocion_resultado": sentiment,
                "voz_texto": transcript,
                "nombre_audio": stored_filename,
            }

            copy_audio_to_main_uploads(file_path, stored_filename)
            id_audio = insert_audio(audio_data)
            row = fetch_audio_by_id(id_audio)

            return jsonify(
                {
                    "message": "Audio procesado correctamente",
                    "audio": row_to_audio(row),
                    "text": transcript,
                    "sentimiento": sentiment,
                }
            ), 201
        except Exception as exc:
            if file_path.exists():
                file_path.unlink()
            traceback.print_exc()
            return jsonify({"error": "No se pudo procesar el audio", "detail": str(exc)}), 500


def is_allowed_audio(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_AUDIO_EXTENSIONS


@lru_cache(maxsize=1)
def get_whisper_model():
    if importlib.util.find_spec("whisper") is None:
        raise RuntimeError(
            "Whisper no esta instalado. Ejecuta: pip install -r backend/requirements.txt"
        )

    import whisper

    return whisper.load_model(os.getenv("WHISPER_MODEL", "base"))


@lru_cache(maxsize=1)
def get_sentiment_analyzer():
    if importlib.util.find_spec("pysentimiento") is None:
        return None

    try:
        from pysentimiento import create_analyzer
    except ImportError:
        return None

    return create_analyzer(task="sentiment", lang="es")


def transcribe_audio(file_path):
    if shutil.which("ffmpeg") is None:
        raise RuntimeError(
            "FFmpeg no esta instalado o no esta en el PATH. Whisper lo necesita para procesar audios."
        )

    model = get_whisper_model()
    result = model.transcribe(str(file_path), language="es")
    return (result.get("text") or "").strip()


def analyze_sentiment(text):
    if not text.strip():
        return "Neutral"

    analyzer = get_sentiment_analyzer()
    if analyzer is None:
        return analyze_sentiment_fallback(text)

    result = analyzer.predict(text[:4000])

    mapping = {
        "POS": "Positivo",
        "NEG": "Negativo",
        "NEU": "Neutral",
    }
    return mapping.get(result.output, result.output)


def analyze_sentiment_fallback(text):
    normalized = text.lower()
    positive_words = {
        "bien", "mejor", "tranquilo", "tranquila", "feliz", "alegre",
        "contento", "contenta", "calma", "esperanza", "motivado", "motivada",
        "positivo", "positiva", "agradecido", "agradecida",
    }
    negative_words = {
        "mal", "triste", "tristeza", "ansiedad", "ansioso", "ansiosa",
        "miedo", "dolor", "solo", "sola", "soledad", "angustia",
        "depresion", "depresión", "desesperanza", "cansado", "cansada",
        "llorar", "sufrimiento", "pesimismo",
    }

    positive_score = sum(1 for word in positive_words if word in normalized)
    negative_score = sum(1 for word in negative_words if word in normalized)

    if positive_score > negative_score:
        return "Positivo"
    if negative_score > positive_score:
        return "Negativo"
    return "Neutral"


app = create_app()


if __name__ == "__main__":
    app.run(
        host=os.getenv("FLASK_HOST", "127.0.0.1"),
        port=int(os.getenv("PORT", "5002")),
        threaded=True,
    )
