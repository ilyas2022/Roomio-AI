# Roomio AI - Rediseño de Interiores con IA

Aplicación web que permite rediseñar espacios interiores utilizando inteligencia artificial.

## Estructura del Proyecto

- **frontend/**: Aplicación React con Vite
- **backend/**: API Flask con integración de Replicate y Cloudinary

## Requisitos Previos

- Docker y Docker Compose
- Cuenta en Replicate para acceso a la API de IA
- Cuenta en Cloudinary para almacenamiento de imágenes

## Configuración

1. Clona el repositorio:
```bash
git clone https://github.com/tuusuario/roomio-ai.git
cd roomio-ai
```

2. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```
# Frontend Variables
VITE_API_URL=http://backend:5000

# Backend Variables
REPLICATE_API_TOKEN=your_replicate_token_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ALLOWED_ORIGINS=http://localhost,https://yourproductiondomain.com
```

## Desarrollo Local

Para ejecutar el proyecto en modo desarrollo:

```bash
docker-compose up
```

## Producción

Para desplegar en producción:

1. Asegúrate de actualizar las variables de entorno para producción
2. Ejecuta el build y lanza los contenedores:
```bash
docker-compose build
docker-compose up -d
```

## Monitoreo y Mantenimiento

- Accede a los logs:
```bash
docker-compose logs -f
```

- Reinicia los servicios:
```bash
docker-compose restart
```

## Estructura de Endpoints API

- `POST /api/generate`: Genera un nuevo diseño
- `POST /api/upload`: Sube una imagen
- `GET /health`: Endpoint de verificación de salud

## Tecnologías Utilizadas

- **Frontend**: React, TailwindCSS, Vite
- **Backend**: Flask, Replicate, Cloudinary
- **Infraestructura**: Docker, Nginx

## Contribución

1. Haz fork del repositorio
2. Crea una rama para tu feature
3. Envía un pull request

## Licencia

Este proyecto está bajo la Licencia MIT. 