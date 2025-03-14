@echo off
echo Ejecutando php artisan db:wipe...
php artisan db:wipe

echo Ejecutando php artisan migrate...
php artisan migrate

echo Ejecutando php artisan db:seed...
php artisan db:seed

echo Proceso completado.
pause
