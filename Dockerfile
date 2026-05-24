# 1. ETAPA DE COMPILACIÓN (BUILDER)
FROM node:20-slim AS builder
WORKDIR /app

# Instalar dependencias esenciales del sistema para la compilación de Prisma y SQLite
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias limpias
RUN npm ci

# Copiar el esquema de base de datos primero para generar el cliente Prisma
COPY prisma ./prisma

# Generar el cliente de Prisma para que esté listo en node_modules
RUN npx prisma generate

# Copiar el resto del código del proyecto
COPY . .

# Compilar la aplicación Next.js en modo Standalone
RUN npm run build


# 2. ETAPA DE EJECUCIÓN (RUNNER)
FROM node:20-slim AS runner
WORKDIR /app

# Instalar openssl en la imagen final de producción, ya que Prisma lo requiere
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Definir variables de entorno para producción
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Crear la carpeta de datos para montar el volumen persistente de SQLite
RUN mkdir -p /app/data

# Copiar archivos compilados y estáticos del build standalone
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json

# Copiar el script de arranque y asegurar permisos
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh

# Instalar prisma CLI localmente en producción para correr db push y db seed en el arranque
RUN npm install prisma@6.19.3

# Exponer el puerto de red de Next.js
EXPOSE 3000

# Apuntar la base de datos de producción a la ruta física del volumen persistente
ENV DATABASE_URL="file:/app/data/prod.db"

# Utilizar el script de entrada para ejecutar migraciones/seeds en el arranque
ENTRYPOINT ["./entrypoint.sh"]
