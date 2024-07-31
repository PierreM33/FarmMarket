### LANCEMENT DOCKER

Dans le dossier Docker (docker-compose up --build)

### CREATION DE LA DB

### ADRESSE IP SERVER
--> Symphony: http://127.0.0.1:8000/
--> PhpMyAdmin: http://127.0.0.1:8081/
--> React: http://localhost:3000/ 

### ADRESSE IP POSTMAN
http://127.0.0.1:8081/ --> PostMan api/Ce que je veux tester

### COMMANDES
    ### LANCER LE SERVEUR DANS BACK END
        php bin/console server:run
    ### LANCER LE SERVEUR DANS FRONT END
        npm start

### PASSER LE CORS
cd "c:\Program Files\Google\Chrome\Application"
./chrome.exe --disable-web-security --user-data-dir="c:/ChromeDevSession"


### CREAT DATABASE DANS BACK END
php bin/console doctrine:database:create   
php bin/console make:migration     
php bin/console doctrine:migrations:migrate    



### CREATION ENTITY

php bin/console make:entity

    ##EXEMPLE:

Class name of the entity to create or update (e.g. TinyElephant): (SOIT J'UPDATE SOIT JE CREE)
> User

Your entity already exists! So let's add some new fields!

New property name (press <return> to stop adding fields):
> email

Field type (enter ? to see all types) [string]:
>

Field length [255]:
>

Can this field be null in the database (nullable) (yes/no) [no]:
>

updated: src/Entity/User.php

### CHAMPS AJOUTE

> php bin/console make:migration
> php bin/console doctrine:migrations:migrate
> php bin/console doctrine:schema:update --force


### AJOUT ENTITY ET INDIQUE UNE ERREUR DANS POSTMAN DE CHAMPS NON TROUVE DANS LA DATABASE

> php bin/console cache:clear
> php bin/console doctrine:schema:update --force
> php bin/console doctrine:migrations:status

### QUAND JE FAIS DES MODIFICATIONS DANS LA DATABASE QUI CA NE VEUT PAS ETRE PRIS EN COMPTE EXECUTER CECI:

php bin/console doctrine:database:drop --force
php bin/console doctrine:database:create
php bin/console doctrine:schema:update --force





