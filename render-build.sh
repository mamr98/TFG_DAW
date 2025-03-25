#!/bin/bash

# Instalar PHP y dependencias
sudo apt-get update
sudo apt-get install -y php php-cli php-mbstring php-xml php-mysql composer

# Instalar dependencias del proyecto
composer install --no-dev
php artisan key:generate

# Instalar y construir assets
npm install
npm run build

# Optimizar Laravel
php artisan optimize