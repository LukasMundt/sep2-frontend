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

echo "Starting app"

APACHE_CONFDIR="" source /etc/apache2/envvars
rm -f "${APACHE_PID_FILE}"
exec /usr/sbin/apache2 -DFOREGROUND