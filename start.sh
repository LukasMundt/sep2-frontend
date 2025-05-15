#!/bin/bash

set -eu

# ensure that data directory is owned by 'cloudron' user
chown -R cloudron:cloudron /app/data

if [[ ! -f /app/data/.env-file-copied ]]; then
    echo "=> First run"
    cp /app/code/.env.prod-cloudron /app/data/env
    chown -R cloudron:cloudron /app/data
    touch /app/data/.env-file-copied
fi

# Setze Port auf 80
export PORT=80

# Starte Express-Server
echo "Starting Express server"
exec node /app/code/server.cjs
