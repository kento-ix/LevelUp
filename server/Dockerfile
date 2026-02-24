FROM php:8.2-apache

# Install PDO MySQL・mysql extension
RUN apt-get update && apt-get install -y \
    libmariadb-dev \
    unzip \
    zip \
    git \
    && docker-php-ext-install pdo pdo_mysql mysqli

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# activate mod_reewrite (Apache)
RUN a2enmod rewrite

RUN sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf

RUN chown -R www-data:www-data /var/www/html