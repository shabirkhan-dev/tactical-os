#!/bin/sh
set -eu

if [ "${RUN_MIGRATIONS:-true}" = "true" ]; then
	echo "[nest-api] running database migrations..."
	bun src/database/migrate.ts
fi

exec "$@"
