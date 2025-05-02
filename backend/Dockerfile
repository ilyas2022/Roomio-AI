#Backend Dockerfile
FROM python:3.9-slim

WORKDIR /app

# Instalar dependencias
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código
COPY backend/ .

# Puerto
EXPOSE 5000

# Comando para producción usando Gunicorn
CMD ["gunicorn", "--config", "gunicorn_config.py", "app:app"]