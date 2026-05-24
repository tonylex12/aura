#!/bin/sh
set -e

echo "=== Aura Docker Entrypoint ==="

# 1. Sincronizar esquema de base de datos PostgreSQL
echo "Sincronizando esquema de base de datos PostgreSQL (npx prisma db push)..."
npx prisma db push --accept-data-loss || echo "Advertencia: Error al sincronizar base de datos o ya está al día."

# 2. Poblar base de datos con vocabulario y lecciones de gramática
echo "Sembrando base de datos PostgreSQL (npx prisma db seed)..."
npx prisma db seed || echo "Advertencia: Error al sembrar base de datos o ya fue sembrada."

# 3. Iniciar servidor standalone de Next.js
echo "Iniciando servidor standalone de Aura..."
exec node server.js
