# Guide de Lancement du Serveur

Ce guide vous aidera à configurer et lancer votre environnement de développement à l'aide de Docker. Suivez les étapes ci-dessous pour mettre en place et tester votre application.

## Prérequis

Assurez-vous d'avoir les outils suivants installés sur votre machine :
- Docker
- Docker Compose
- Node.js (pour l'exécution des commandes NPM)
- Composer (si vous rencontrez des problèmes avec les commandes PHP)

## Étapes de Configuration

### 1. Lancer les Conteneurs Docker

Accédez au dossier racine de votre projet et lancez les conteneurs en arrière-plan :

```bash
docker-compose up --build -d
```

une fois lancé, se rendre dans le dossier node via PowerShell

```bash
docker exec -it node /bin/sh
npm install
npm run build
```

Se rendre dans le container php:



```bash
docker-compose exec php bash
```
Installez composer
```bash
composer require symfony/runtime
```
Générer la database
```bash
php bin/console doctrine:database:drop --force
php bin/console doctrine:database:create
php bin/console doctrine:schema:update --force
```

Tester la connexion:

```bash
docker-compose exec php bash
mysql -h host.docker.internal -u userAdmin -p
```

### 2. Lancer l'Application

Pour lancer l'application en local, exécutez la commande suivante dans le dossier `app` :

```bash
npm start
```

Pour lancer l'application à l'aide de Docker, assurez-vous d'avoir créé la base de données en suivant les étapes ci-dessus. Ensuite, lancez les conteneurs Docker :

```bash

```

### 3. Générer la Base de Données
Si la database est vide alors je dois executer les migrations en suivant les commandes ci-dessous:

```bash
php bin/console make:migration
php bin/console doctrine:migrations:migrate
```

### 4. Astuces
Je lance le npm run build avant de lancer le docker pour éviter des conflits

Regarder les migrations:
```bash
 php bin/console doctrine:migrations:list
```

Supprimer les migrations:
```bash
rm migrations/*.php
```
