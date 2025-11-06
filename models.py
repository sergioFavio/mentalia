from flask_sqlalchemy import SQLAlchemy   # ORM para base de datos MySQL
from flask_marshmallow import Marshmallow

db = SQLAlchemy()
ma = Marshmallow()

class Usuarios(db.Model):
    id_usuario = db.Column(db.Integer, primary_key=True, autoincrement=True)
    run = db.Column(db.String(15), nullable=False)
    nombre_completo = db.Column(db.String(255), nullable=False)
    apellido_completo = db.Column(db.String(255), nullable=False)
    correo = db.Column(db.String(200), nullable=False)
    clave = db.Column(db.String(255), nullable=False)
    sexo = db.Column(db.String(255), nullable=False)
    fecha_nacimiento = db.Column(db.String(255), nullable=False)
    id_cargo = db.Column(db.Integer, nullable=False)

    def __init__(self, id_usuario, run, nombre_completo , apellido_completo, correo, clave, sexo, fecha_nacimiento, id_cargo):
        self.id_usuario = id_usuario
        self.run = run
        self.nombre_completo = nombre_completo
        self.apellido_completo = apellido_completo
        self.correo = correo
        self.clave = clave
        self.sexo = sexo
        self.fecha_nacimiento = fecha_nacimiento
        self.id_cargo = id_cargo

    def __repr__(self):
        return '<Name %r>' % self.name

class UsuariosSchema(ma.Schema):
    class Meta:
        fields = ("id_usuario", "run", "nombre_completo" , "apellido_completo", "correo", "clave", "sexo", "fecha_nacimiento", "id_cargo")

usuario_schema = UsuariosSchema()
usuarios_schema = UsuariosSchema(many=True)