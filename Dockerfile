FROM docker:20-dind

WORKDIR /app

# Instalar docker-compose
RUN apk add --no-cache py3-pip curl
RUN pip3 install docker-compose

# Copiar archivos del proyecto
COPY . .

# Exponer puertos
EXPOSE 8080 5000

# Comando para iniciar los servicios
CMD ["docker-compose", "up"] 