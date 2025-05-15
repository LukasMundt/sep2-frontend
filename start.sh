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

echo "Reading environment variables"
set -o allexport
source /app/data/env
set +o allexport

# Prüfen ob BACKEND_URL gesetzt ist und eine valide URL darstellt
if [[ -z "${BACKEND_URL:-}" ]]; then
    echo "❌ BACKEND_URL ist nicht gesetzt!"
elif [[ "$BACKEND_URL" =~ ^https?://.+\..+ ]]; then
    echo "✅ BACKEND_URL ist gesetzt: $BACKEND_URL"
    echo "➡️  Versuche Verbindung via curl..."
    if curl --head --silent --fail "$BACKEND_URL" > /dev/null; then
        echo "🌍 BACKEND_URL ist erreichbar"
    else
        echo "⚠️  Warnung: BACKEND_URL ist nicht erreichbar!"
    fi
else
    echo "❌ BACKEND_URL ist ungültig: $BACKEND_URL"
fi

# Apache Konfiguration zur Laufzeit generieren
mkdir -p /run/apache
envsubst '${BACKEND_URL}' < /app/code/apache/app.conf.template > /run/apache/app.conf

# Apache starten mit benutzerdefinierter Config
echo "Starting Apache with dynamic config"
APACHE_CONFDIR="" source /etc/apache2/envvars
rm -f "${APACHE_PID_FILE}"
exec /usr/sbin/apache2 -f /run/apache/app.conf -DFOREGROUND
