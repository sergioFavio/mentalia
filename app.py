from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_mail import Mail, Message


app = Flask(__name__, static_folder="assets") # se agrega otro parametro..
CORS(app)
bcrypt = Bcrypt(app)

app.config.from_pyfile('config.py')
from models import db, ma, Usuarios, usuarios_schema, usuario_schema
db.init_app(app)
ma.init_app(app)


mail = Mail()
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 465
app.config["MAIL_USE_SSL"] = True
app.config["MAIL_USERNAME"] = 'serginho61@gmail.com'
app.config["MAIL_PASSWORD"] = 'bfmmvotlxgjmdqzo'
mail.init_app(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/contact', methods=["POST"])
def correo():
  data = request.get_json() or {}
  required_fields = ["name", "email", "telephone", "message"]
  missing_fields = [field for field in required_fields if not str(data.get(field, "")).strip()]

  if missing_fields:
    return jsonify({
      "error": "Faltan campos obligatorios",
      "campos": missing_fields,
    }), 400

  try:
    msg = Message(
      "Mensaje desde Mentalia.online",
      sender=app.config["MAIL_USERNAME"],
      recipients=['serginho61@gmail.com'],
    )
    content = """
    <html>
      <b>Nombre:</b> {0} <br>
      <b>Email:</b> {1} <br>
      <b>Whatsapp/Telegram:</b> {2} <br>
      <b>Mensaje:</b> {3}<br>
      <b>Tengo interes en:</b> {4}
    </html>
    """
    msg.html = content.format(
      data["name"],
      data["email"],
      data["telephone"],
      data["message"],
      data.get("intereses", "No especificados"),
    )
    mail.send(msg)
    return jsonify({"message": "Se envio el correo correctamente"})
  except Exception as e:
    return jsonify({"error": f"No se pudo enviar el correo: {str(e)}"}), 500



@app.route('/api/login', methods=["POST"])
def login():
  correo = request.json.get("correo") or request.json.get("email")
  clave = request.json.get("clave") or request.json.get("password")

  usuario = Usuarios.query.filter_by(correo=correo).first()
  if usuario and bcrypt.check_password_hash(usuario.clave, clave):
      return usuario_schema.jsonify(usuario)

  return jsonify({
      "error": "Revisa si los datos son correctos"
  })


@app.route('/api/usuario')
def listar_usuarios():
    lista = Usuarios.query.all()
    dumped = usuarios_schema.dump(lista)
    return jsonify(dumped)

@app.route('/api/usuario', methods=["POST"])
def crear_usuario():
    data = request.get_json() or {}

    try:
        clave = data.get("clave", "default123")
        clave_hash = bcrypt.generate_password_hash(clave).decode("utf-8")

        usuario = Usuarios(
            None,
            data.get("run"),
            data.get("nombre_completo"),
            data.get("apellido_completo"),
            data.get("correo"),
            clave_hash,
            data.get("sexo"),
            data.get("fecha_nacimiento"),
            data.get("id_cargo", 2),
        )

        db.session.add(usuario)
        db.session.commit()
        return usuario_schema.jsonify(usuario), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/api/usuario/<int:id_usuario>', methods=["PUT"])
def actualizar_usuario(id_usuario):
    usuario = Usuarios.query.get_or_404(id_usuario)
    data = request.get_json() or {}

    try:
        campos_requeridos = [
            "run",
            "nombre_completo",
            "apellido_completo",
            "correo",
            "sexo",
            "fecha_nacimiento",
        ]
        campos_faltantes = [
            campo for campo in campos_requeridos if not str(data.get(campo, "")).strip()
        ]

        if campos_faltantes:
            return jsonify({
                "error": "Faltan campos obligatorios",
                "campos": campos_faltantes,
            }), 400

        usuario.run = data["run"].strip()
        usuario.nombre_completo = data["nombre_completo"].strip()
        usuario.apellido_completo = data["apellido_completo"].strip()
        usuario.correo = data["correo"].strip()
        usuario.sexo = data["sexo"].strip()
        usuario.fecha_nacimiento = data["fecha_nacimiento"].strip()

        db.session.commit()
        db.session.refresh(usuario)
        return usuario_schema.jsonify(usuario)
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
