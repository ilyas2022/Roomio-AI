from flask import Flask
from flask_cors import CORS
from routes.generate import generate_bp
from routes.upload import upload_bp

app = Flask(__name__)
CORS(app) #Habilitar CORS para todas las rutas

app.register_blueprint(generate_bp, url_prefix="/api")
app.register_blueprint(upload_bp, url_prefix="/api")

if __name__ == "__main__":
    app.run(debug=True)