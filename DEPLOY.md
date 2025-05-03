# Despliegue en Fly.io para RoomioAI

Este documento describe el proceso para desplegar RoomioAI en Fly.io.

## Requisitos previos

1. Instalar Fly CLI:
   ```bash
   # En Windows con PowerShell
   iwr https://fly.io/install.ps1 -useb | iex
   
   # En macOS/Linux
   curl -L https://fly.io/install.sh | sh
   ```

2. Iniciar sesión en Fly.io:
   ```bash
   fly auth login
   ```

## Despliegue del Backend

1. Navega al directorio del backend:
   ```bash
   cd backend
   ```

2. Crea una aplicación en Fly.io:
   ```bash
   fly apps create roomio-ai-backend
   ```

3. Configura las variables de entorno necesarias:
   ```bash
   fly secrets set REPLICATE_API_TOKEN=your_replicate_token \
     CLOUDINARY_CLOUD_NAME=your_cloudinary_name \
     CLOUDINARY_API_KEY=your_cloudinary_key \
     CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

4. Despliega la aplicación:
   ```bash
   fly deploy
   ```

## Despliegue del Frontend

1. Regresa al directorio raíz:
   ```bash
   cd ..
   ```

2. Crea una aplicación en Fly.io:
   ```bash
   fly apps create roomio-ai
   ```

3. Configura la URL del backend:
   ```bash
   fly secrets set BACKEND_URL=https://roomio-ai-backend.fly.dev
   ```

4. Despliega la aplicación:
   ```bash
   fly deploy
   ```

## Verificación del despliegue

1. Verifica el estado de tus aplicaciones:
   ```bash
   fly status -a roomio-ai
   fly status -a roomio-ai-backend
   ```

2. Abre tu aplicación en el navegador:
   ```bash
   fly open -a roomio-ai
   ```

## Escalar la aplicación

Si necesitas más recursos:

```bash
fly scale vm shared-cpu-1x --memory 512 -a roomio-ai
fly scale vm shared-cpu-1x --memory 1024 -a roomio-ai-backend
```

## Solución de problemas

1. Ver logs:
   ```bash
   fly logs -a roomio-ai
   ```

2. Conectar por SSH:
   ```bash
   fly ssh console -a roomio-ai
   ```

3. Reiniciar la aplicación:
   ```bash
   fly apps restart roomio-ai
   ``` 