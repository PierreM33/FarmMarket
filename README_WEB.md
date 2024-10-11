# Projet de Vente de Bétail

## Description
Ce projet est une plateforme de vente de bétail en ligne. Il comprend une interface utilisateur pour les visiteurs et un tableau de bord d'administration pour la gestion des produits et des utilisateurs. Suivez les instructions ci-dessous pour configurer et exécuter l'application.

## Prérequis
- Docker et Docker Compose
- Node.js et npm (pour la partie frontend)
- PHP et Symfony (pour la partie backend)
- Lecture du README.md

## Installation et Lancement

### 1. Lancer les conteneurs avec Docker
À la racine du projet (là où se trouve le fichier `docker-compose.yml`), exécutez la commande suivante pour construire et démarrer les services Docker :

```bash
docker-compose up --build
```

### 2. Initialisation de la base de données

Pensez à utiliser les commandes dans la partie app et backend pour initialiser la base de données.
Créez et migrez la base de données avec les commandes suivantes :

```bash
docker exec -it "numero du container" /bin/sh
php bin/console doctrine:database:create
php bin/console make:migration
php bin/console doctrine:migrations:migrate
```

### 3. Site Web
Le site possède une page d'accueil avec un message de bienvenu, et 4 containers.
Les containers ou le lien en haut à gauche renvoi vers la page de détail du produit.

Le nom du site renvoie sur l'accueil.

Ne pas oublier de lancer la commande pour éviter les problème de CORS quand je site n'est pas en ligne.

Pour se créer un compte, il faut se rendre sur la partie

```bash
http://localhost:3000/admin
```

Cette partie vous permettra de vous inscrire, puis de vous connecter.
Dans la partie administation, vous pourrez ajouter des produits, les modifier et voir la liste des utilisateurs inscrit ayant accès au dashboard.
