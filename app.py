from flask import Flask, render_template, jsonify, request
from flask_cors import CORS

app = Flask(__name__, static_folder="assets") # se agrega otro parametro..
CORS(app)

app.config.from_pyfile('config.py')
from models import db, ma, Usuarios, usuarios_schema, usuario_schema
db.init_app(app)
ma.init_app(app)

@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/api/login', methods=["POST"])
def login():
  return jsonify({
      "message": "Logueado correcto"
  })


@app.route('/api/usuario')
def listar_usuarios():
    lista = Usuarios.query.all()
    dumped = usuarios_schema.dump(lista)
    return jsonify(dumped)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
