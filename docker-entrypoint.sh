#!/bin/bash
set -e

# Reemplaza el puerto en la configuración de Nginx con el valor de la variable de entorno PORT.
# Si PORT no está definida por Railway, se usará 80 como fallback.
# IMPORTANTE: Ahora apunta a /etc/nginx/conf.d/default.conf
PORT_TO_LISTEN=${PORT:-80}
sed -i "s|listen 80;|listen ${PORT_TO_LISTEN};|g" /etc/nginx/conf.d/default.conf
sed -i "s|listen \[::\]:80;|listen \[::\]:${PORT_TO_LISTEN};|g" /etc/nginx/conf.d/default.conf

# Inicia Supervisor, que a su vez iniciará Nginx y PHP-FPM.
exec /usr/bin/supervisord -c /etc/supervisord.conf