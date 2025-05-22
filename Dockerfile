# Etapa de construcción
FROM node:18-alpine AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Etapa de producción
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar dependencias desde la etapa de construcción
COPY --from=builder /app/node_modules ./node_modules

# Copiar el código fuente
COPY . .

# Exponer el puerto que utilizará la aplicación
EXPOSE 3060

# Establecer variables de entorno para producción
ENV NODE_ENV=production

# Iniciar la aplicación
CMD ["npm", "start"]