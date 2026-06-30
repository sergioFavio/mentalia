SECRET_KEY = '990003'

SQLALCHEMY_DATABASE_URI = \
    '{SGBD}://{usuario}:{clave}@{servidor}/{database}'.format(
        SGBD = 'mysql+pymysql',
        usuario = 'root',
        clave = '',
        servidor = 'localhost',
        database = 'mentalia$mental_ia'
    )