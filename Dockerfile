# Usa una imagen base de PHP-FPM para PHP 8.2 (Debian Bookworm)
FROM php:8.2-fpm

# Instala dependencias del sistema necesarias para PHP, Git, Composer, Node.js y NPM.
# El --no-install-recommends reduce el tamaño de la imagen.
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    libzip-dev \
    libonig-dev \
    libxml2-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libwebp-dev \
    zip \
    unzip \
    nodejs \
    npm \
    # Limpia el cache de apt para reducir el tamaño de la imagen
    && rm -rf /var/lib/apt/lists/*

# Instala y habilita las extensiones PHP necesarias.
# Agrego 'gd' (para manipulación de imágenes) e 'intl' (para internacionalización)
# que son muy comunes en proyectos Laravel.
RUN docker-php-ext-install -j$(nproc) \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    zip \
    gd \
    intl

# Instala Composer globalmente en el contenedor.
# Usamos un 'COPY --from' para mayor eficiencia y cacheo.
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Configura el directorio de trabajo para la aplicación.
WORKDIR /var/www/html

# Copia los archivos del proyecto al contenedor.
# Asegúrate de que .dockerignore excluya node_modules, vendor, .git, etc.
COPY . .

# Instala las dependencias de PHP usando Composer.
# Agrego --verbose temporalmente para depuración, puedes quitarlo después.
RUN composer install --no-dev --optimize-autoloader --verbose

# Instala las dependencias de Node.js y construye los assets de frontend.
RUN npm install && npm run build

# Establece los permisos correctos para la carpeta 'storage' de Laravel.
RUN chown -R www-data:www-data /var/www/html/storage \
    && chown -R www-data:www-data /var/www/html/bootstrap/cache

# Expone el puerto por el que se ejecutará la aplicación (PHP-FPM, no php artisan serve directamente).
EXPOSE 8000

# Comando para iniciar PHP-FPM.
# Para producción, necesitarás un servidor web como Nginx o Apache que se comunique con PHP-FPM.
# En Render, si usas una plantilla de Laravel, ellos gestionan Nginx.
# Si solo lanzas este contenedor, Render puede usar un proxy para el puerto 9000.
CMD ["php-fpm"]