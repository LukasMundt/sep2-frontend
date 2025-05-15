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

    echo "🌐 Prüfe Erreichbarkeit von $BACKEND_URL mit HEAD-Request..."
    if curl --head --silent --max-time 5 "$BACKEND_URL" > /dev/null; then
        echo "🟢 BACKEND_URL antwortet"
    else
        echo "⚠️  BACKEND_URL konnte nicht erreicht werden!"
    fi

    echo "🌐 Erzeuge Apache-Konfiguration mit BACKEND_URL=$BACKEND_URL"
    envsubst '${BACKEND_URL}' < /app/code/apache/app.conf.template > /etc/apache2/sites-enabled/app.conf
else
    echo "❌ BACKEND_URL ist ungültig: $BACKEND_URL"
fi

echo "Starting app"

APACHE_CONFDIR="" source /etc/apache2/envvars
rm -f "${APACHE_PID_FILE}"
exec /usr/sbin/apache2 -DFOREGROUND