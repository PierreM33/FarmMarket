# Projet de Vente de Bétail

Ce projet est une application de gestion et de vente de bétail en ligne, utilisant React.js pour le front-end et Symfony pour le back-end. 
L'architecture du projet repose sur Docker pour simplifier le déploiement et la gestion des services.

## Prérequis

- Docker et Docker Compose installés
- Node.js et npm installés pour le front-end
- PHP et Composer installés pour le back-end

## Lancer le projet

### 1. Démarrage avec Docker

À la racine du projet, exécuter la commande suivante pour lancer tous les services (Symfony, React, PhpMyAdmin) via Docker Compose :

```bash
docker-compose up --build
```

### 2. Initialisation de la base de données

Pour initialiser la base de données, exécuter les commandes suivantes :
Commencez par entrer dans le container php:

```bash
docker exec -it "numeroContainer" /bin/sh
```

Optionnel: 
```bash
php bin/console doctrine:database:create
```

```bash
php bin/console make:migration
php bin/console doctrine:migrations:migrate
```

### 3. Installation des dépendances

#### Front-end

Se rendre dans le dossier `app` et exécuter la commande suivante pour installer les dépendances :

```bash
npm install
```

#### Back-end

Composer est déjà installé dans le conteneur PHP.

### 4. Lancer l'application

#### Front-end

Dans le dossier `app`, exécuter la commande suivante pour lancer l'application React :

```bash
npm start
```

#### Back-end

Dans le dossier `backend`, installer compose:

```bash
composer install
```

```bash
php bin/console server:run
```



## Accès

- Front-end : [http://localhost:3001](http://localhost:3001)
- Back-end : [http://localhost:8000](http://localhost:8000)
- PhpMyAdmin : [http://localhost:8081](http://localhost:8081)

### 5. Passage des CORS

Pour éviter les problèmes de CORS en local:

```bash
cd "c:\Program Files\Google\Chrome\Application"
./chrome.exe --disable-web-security --user-data-dir="c:/ChromeDevSession"
```

### 6.Postman

Pour tester les différentes routes de l'API:

```bash
http://127.0.0.1:8081/ 
```

