# Backend MentaLia

Backend Flask para recibir audios, transcribirlos con Whisper, analizar sentimiento y guardar el registro en la tabla `audio`.

## Configuracion

Crea un archivo `.env` o define variables de entorno antes de iniciar:

```powershell
$env:DATABASE_URL="mysql+mysqlconnector://root:Root2555@localhost/darchy$mental_ia"
$env:FRONTEND_ORIGIN="http://localhost:5173"
$env:WHISPER_MODEL="base"
$env:PORT="5002"
```

Si `DATABASE_URL` no se define, usa SQLite local en `backend/instance/mentalia.db`.

## Instalacion

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Whisper requiere FFmpeg instalado y disponible en el `PATH`.

## Ejecucion

```powershell
python app.py
```

Endpoint principal:

```text
POST /api/audio
```

Campos esperados en `multipart/form-data`:

- `file` o `audio`: archivo de audio.
- `id_paciente`: id del paciente.
- `descripcion`: texto opcional.
