# Dockerfile

FROM php:8.2.4-fpm

RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    curl \
    git \
    libpq-dev \
    supervisor

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd

RUN composer install --no-dev --optimize-autoloader

# Laravel permission
RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 /var/www/storage

COPY ./supervisord.conf /etc/supervisord.conf

# Port
EXPOSE 8000

CMD php artisan serve --host=0.0.0.0 --port=8000
