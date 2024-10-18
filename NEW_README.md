# New README

## Commandes:

Une fois le repository cloné, il faut se rendre dans le dossier suivant:

```bash
app et lancer l'installation avec npm install, avant de lancer npm start.
```

Dans la racine du dossier lancer le docker pour initialiser les containers.
```bash
compose up --build 
```

Une fois que les containers sont initialisés, il faut entrer dans le container php pour initialiser la database.

Entrer dans le container:
```bash
docker exec -it "numeroDuContainer" /bin/sh
```
ou 
```bash
docker exec -it phpTech /bin/sh
```

Installer composer qui ne semble pas se faire à la création du container. Avec la commande :
```bash
composer install
```
Une fois l'installion de composer effectué (1 bonne minute), entrer les commandes suivantes pour migrer la database :
```bash
php bin/console make:migration
```
Dans le dossier backend lancer cette commande :
```bash
php bin/console server:run
```

Pour que les requêtes aboutissent en Dev local il faut passer le système de Cors, pour cela entrer la commande depuis la console:
```bash
cd "c:\Program Files\Google\Chrome\Application"
```
Puis:
```bash
./chrome.exe --disable-web-security --user-data-dir="c:/ChromeDevSession"
```


