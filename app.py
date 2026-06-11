from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from flask_bcrypt import Bcrypt

app = Flask(__name__, static_folder="assets") # se agrega otro parametro..
CORS(app)
bcrypt = Bcrypt(app)

app.config.from_pyfile('config.py')
from models import db, ma, Usuarios, usuarios_schema, usuario_schema
db.init_app(app)
ma.init_app(app)

@app.route('/')
def hello_world():
    return render_template('index.html')

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

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
