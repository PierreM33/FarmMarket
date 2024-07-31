### LANCEMENT SERVEUR

- Dans le dossier racine on lance les containers 
docker-compose up --build -d

- Une fois lancé, se rendre dans le dossier node via PowerShell
docker exec -it node /bin/sh

- Lancer l'installation de NPM
npm install

- Lancer le build de React
npm run build


- Se rendre dans le container php:

docker-compose exec php bash
php bin/console doctrine:database:drop --force
php bin/console doctrine:database:create
php bin/console doctrine:schema:update --force

Si jamais j'ai une erreur a la commande, je dois surement installer composer:
composer require symfony/runtime


- Test de la connexion:

docker-compose exec php bash
mysql -h host.docker.internal -u userAdmin -p


Lancer en local:

Se rendre sur le dossier app et lancer: npm start

Lancer le docker:

Pour avoir accès a la database lancer le docker puis créer la database

Je lance le npm run build avant de lancer le docker pour éviter des conflits
