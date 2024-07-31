FROM php:8.1-fpm

# Met à jour les paquets et installe les dépendances nécessaires
RUN apt-get update && apt-get install -y \
    default-mysql-client \
    zlib1g-dev g++ git libicu-dev zip libzip-dev wget \
  && rm -rf /var/lib/apt/lists/*

# Installe les extensions PHP nécessaires et les modules PECL
RUN docker-php-ext-install intl opcache pdo pdo_mysql \
    && pecl install apcu -y \
    && pecl install xdebug \
    && docker-php-ext-enable xdebug apcu \
    && echo "xdebug.mode=debug" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.client_host=host.docker.internal" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip

# Définit le répertoire de travail dans le conteneur
WORKDIR /var/www/backEnd

# Installe Symfony CLI
RUN wget https://get.symfony.com/cli/installer -O - | bash \
    && ln -s /root/.symfony*/bin/symfony /usr/local/bin/symfony

# Installe Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
