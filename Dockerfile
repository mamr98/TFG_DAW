# Usa una imagen base de PHP-FPM para PHP 8.2 (Debian Bookworm)
FROM php:8.2-fpm

# Instala dependencias del sistema necesarias para PHP, Git, Composer, Node.js y NPM.
# Añadimos Nginx y Supervisor
RUN apt-get update && apt-get install -y --no-install-recommends \
    nginx \
    supervisor \
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
RUN docker-php-ext-install -j$(nproc) \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    zip \
    gd \
    intl \
    opcache # Opcode cache para mejor rendimiento

# Instala Composer globalmente en el contenedor.
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Configura el directorio de trabajo para la aplicación.
WORKDIR /var/www/html

# Copia los archivos del proyecto al contenedor.
COPY . .

# Instala las dependencias de PHP usando Composer.
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Instala las dependencias de Node.js y construye los assets de frontend.
RUN npm install && npm run build

# Establece los permisos correctos para las carpetas de Laravel.
RUN chown -R www-data:www-data /var/www/html/storage \
    && chown -R www-data:www-data /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage \
    && chmod -R 775 /var/www/html/bootstrap/cache

# **COPIA LA CONFIGURACIÓN DE NGINX AL DIRECTORIO CONF.D**
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# **Copia la configuración de Supervisor**
RUN mkdir -p /etc/supervisor/conf.d/
COPY supervisor/supervisord.conf /etc/supervisor/supervisord.conf

# **Copia y haz ejecutable el script de entrada**
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Expone el puerto 80 (el script de entrada lo ajustará dinámicamente)
EXPOSE 80

# Comando de inicio: usa el script de entrada
ENTRYPOINT ["docker-entrypoint.sh"]