#!/bin/sh
set -e

# Run prisma migrations (safe for prod)
if [ -n "$DATABASE_URL" ]; then
  echo "Running prisma migrate deploy..."
  pnpm dlx prisma migrate deploy
else
  echo "Warning: DATABASE_URL is not set. Skipping prisma migrate deploy."
fi

echo "Starting application..."
exec node dist/main.js


