#!/bin/sh
set -e

echo "=== Aura Docker Entrypoint ==="

# 1. Asegurar que exista la carpeta del volumen persistente de la base de datos
echo "Verificando carpeta de volumen de datos..."
mkdir -p /app/data

# 2. Sincronizar esquema de base de datos
echo "Sincronizando esquema de base de datos (npx prisma db push)..."
npx prisma db push --accept-data-loss || echo "Advertencia: Error al sincronizar base de datos o ya está al día."

# 3. Poblar base de datos con vocabulario y lecciones de gramática
echo "Sembrando base de datos (npx prisma db seed)..."
npx prisma db seed || echo "Advertencia: Error al sembrar base de datos o ya fue sembrada."

# 4. Iniciar servidor standalone de Next.js
echo "Iniciando servidor standalone de Aura..."
exec node server.js
