from flask import Flask
from flask_cors import CORS
from routes.generate import generate_bp
from routes.upload import upload_bp
import os

app = Flask(__name__)

# Configurar CORS para permitir peticiones desde Vercel
allowed_origins = os.getenv('ALLOWED_ORIGINS', '*')
CORS(app, origins=allowed_origins.split(','))

app.register_blueprint(generate_bp, url_prefix="/api")
app.register_blueprint(upload_bp, url_prefix="/api")

# No es necesario este bloque en Render
#if __name__ == "__main__":
# app.run(debug=True)