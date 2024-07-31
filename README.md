### SERVEUR ACHETE AVEC DEBIAN INSTALLE


### LANCEMENT SERVER COMMANDE

ssh debian@141.94.69.205
Utiliser le password fourni dans le mail

### CHANGE PASSWORD

passwd

Demande le password actuel, puis le nouveau. J'utilise le classique

### ACCES VIA NAVIGATEUR

Pour cela modifier le DNS ajouter l'ipV4 en A et IPv6 en AAAA. Les informations sont sur OVH

### INSTALL DOCKER
# Mettre à jour les paquets existants
sudo apt update

# Installer les pré-requis pour Docker
sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release

# Ajouter la clé GPG officielle de Docker
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Configurer le repository stable pour Docker
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Installer Docker Engine
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io

# Installer Git

sudo apt install git

# Générer une clés SSH sur le serveur

ssh-keygen -t ed25519 -C bourdaispe@outlook.fr
appuyer sur entrer jusqu'à ce que la clef soit généré
+--[ED25519 256]--+
|.oo.ooo=o.       |
|.o ..++.         |
|. . = .          |
| . o = o         |
| .o =oo S        |
|o. ++.+. .       |
|o =.o=..         |
|.+ *oEo.         |
|=+Bo.o+.         |
+----[SHA256]-----+


# Ajouter la clef sur github
cd ~/.ssh
Puis rentrer le numéro qu'on à généré au dessus
cat id_ed25519.pub


### IMPORTER MON DOSSIER DOCKER

git clone <url_git>


### INSTALL DOCKER COMPOSE
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

Donner les permissions d'exécution:
    sudo chmod +x /usr/local/bin/docker-compose

Vérifier installation:
    docker-compose --version

Ajouter l'utilisateur au groupe Docker:
    sudo usermod -aG docker debian
et utiliser groups pour vérifier si on appartient bien au group

Se déconnecter et se reconnecter
    exit


### CREATION DU DOCKER

docker-compose up -d


### DOCKER

docker ps
docker ps -a

### RESTART CONTAINER

docker-compose restart nginx php

ou

docker restart phpmyadmin
docker restart nginx
docker restart php
docker restart database


### EFFACER LES VOLUMES DOCKER (BDD ETC...)

docker system prune


### CREATION D'UN FICHIER 

echo '<?php echo "Bonjour depuis PHP !"; ?>' | sudo tee index.php



### CREATION D'UN htpasswd
sudo htpasswd -c /etc/nginx/.htpasswd username

username = pierreAdmin

cat /etc/nginx/.htpasswd


### NGINX LOGS
docker logs nginx


### INSTALLER ET REDIRIGER VERS NGINX LE SITE WEB

Commencer par installer nodeJs sur le serveur
sudo apt install -y nodejs npm

Installer npm install legacy-peer-deps
Ensuite " npm run build " pour créer le dossier build

Copiez les fichiers de build dans le dossier app configuré dans votre fichier docker-compose.yml :
sudo cp -r * ~/PrivateServeur/docker/app/

Relancer les conteneurs Docker:

cd ~/PrivateServeur/docker
docker-compose down
docker-compose up --build -d


Installer Php:
sudo apt install php php-cli

ensuite verifier la version de php
php --version


Installer Composer:
Si Composer n'est pas déjà installé sur votre système, vous pouvez l'installer en suivant les instructions ci-dessous :

cd ~
curl -sS https://getcomposer.org/installer -o composer-setup.php
sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer

Se rendre dans l'endroit ou se trouve composer.json et lancer la commande suivante:
composer install

si une erreur apparait, lancer la commande suivante:
sudo apt update
sudo apt install php8.2-xml php8.2-dom

Vérifier l'installation :

Après l'installation, vérifiez que les extensions ont été correctement activées pour PHP CLI en exécutant :
php --ini

Assurez-vous que les extensions xml et dom sont listées dans les fichiers de configuration PHP CLI. 
Vous devriez voir quelque chose comme /etc/php/8.2/cli/conf.d/20-xml.ini et /etc/php/8.2/cli/conf.d/20-dom.ini.

Puis refaire composer install
composer install --ignore-platform-reqs

utiliser ignore si besoin de forcer l'installation

### COPIER LE BUILD VERS LE DOSSIER APP
se mettre dans le dossier build de front end
cp -r * ~/PrivateServeur/docker/app
ou
cp -r ~/build/* ~/app/


### AVOIR TOUT A LA RACINE

# Cloner le dépôt dans un dossier temporaire
git clone git@github.com:PierreM33/PrivateServeur.git temp-repo

# Déplacer le contenu du dossier temporaire vers le répertoire courant
mv temp-repo/* temp-repo/.[^.]* .

# Supprimer le dossier temporaire
rm -rf temp-repo


### SUPPRIMER LES CONTAINER DOCKER
docker volume ls
docker volume prune
docker volume rm <volume_name>

Les images:

docker images -a
docker image prune
docker rmi <image_id>


### FORCER GIT
git fetch origin
git reset --hard origin/main


### SAVE DATABASE HISTORIQUE

debian@vps-58c98726:~/PrivateServeur/docker$ docker volume ls
DRIVER    VOLUME NAME
local     docker_dbdata
debian@vps-58c98726:~/PrivateServeur/docker$ docker volume inspect docker_dbdata
[
    {
        "CreatedAt": "2024-07-10T14:38:40Z",
        "Driver": "local",
        "Labels": {
            "com.docker.compose.project": "docker",
            "com.docker.compose.version": "2.28.1",
            "com.docker.compose.volume": "dbdata"
        },
        "Mountpoint": "/var/lib/docker/volumes/docker_dbdata/_data",
        "Name": "docker_dbdata",
        "Options": null,
        "Scope": "local"
    }
]
debian@vps-58c98726:~/PrivateServeur/docker$ ^C
debian@vps-58c98726:~/PrivateServeur/docker$ cd /var/lib/docker/volumes/docker_dbdata/_data
-bash: cd: /var/lib/docker/volumes/docker_dbdata/_data: Permission denied
debian@vps-58c98726:~/PrivateServeur/docker$ sudo su
root@vps-58c98726:/home/debian/PrivateServeur/docker# cd /var/lib/docker/volumes/docker_dbdata/_data
root@vps-58c98726:/var/lib/docker/volumes/docker_dbdata/_data# ls la
ls: cannot access 'la': No such file or directory
root@vps-58c98726:/var/lib/docker/volumes/docker_dbdata/_data# ls -la
total 100640
-rw-r----- 1  999 systemd-journal   196608 Jul 10 16:02 '#ib_16384_0.dblwr'
-rw-r----- 1  999 systemd-journal  8585216 Jul 10 14:38 '#ib_16384_1.dblwr'
drwxr-x--- 2  999 systemd-journal     4096 Jul 10 16:00 '#innodb_redo'
drwxr-x--- 2  999 systemd-journal     4096 Jul 10 16:00 '#innodb_temp'
drwxrwxrwt 8  999 systemd-journal     4096 Jul 10 16:00  .
drwx-----x 3 root root                4096 Jul 10 14:38  ..
-rw-r----- 1  999 systemd-journal       56 Jul 10 14:38  auto.cnf
-rw-r----- 1  999 systemd-journal  2943837 Jul 10 14:38  binlog.000001
-rw-r----- 1  999 systemd-journal      180 Jul 10 14:54  binlog.000002
-rw-r----- 1  999 systemd-journal      180 Jul 10 15:06  binlog.000003
-rw-r----- 1  999 systemd-journal      180 Jul 10 15:56  binlog.000004
-rw-r----- 1  999 systemd-journal      180 Jul 10 16:00  binlog.000005
-rw-r----- 1  999 systemd-journal      157 Jul 10 16:00  binlog.000006
-rw-r----- 1  999 systemd-journal       96 Jul 10 16:00  binlog.index
-rw------- 1  999 systemd-journal     1705 Jul 10 14:38  ca-key.pem
-rw-r--r-- 1  999 systemd-journal     1112 Jul 10 14:38  ca.pem
-rw-r--r-- 1  999 systemd-journal     1112 Jul 10 14:38  client-cert.pem
-rw------- 1  999 systemd-journal     1705 Jul 10 14:38  client-key.pem
drwxr-x--- 2  999 systemd-journal     4096 Jul 10 14:38  expeditionWarsV2
-rw-r----- 1  999 systemd-journal     3540 Jul 10 16:00  ib_buffer_pool
-rw-r----- 1  999 systemd-journal 12582912 Jul 10 16:00  ibdata1
-rw-r----- 1  999 systemd-journal 12582912 Jul 10 16:00  ibtmp1
drwxr-x--- 2  999 systemd-journal     4096 Jul 10 14:38  mysql
-rw-r----- 1  999 systemd-journal 32505856 Jul 10 16:00  mysql.ibd
lrwxrwxrwx 1  999 systemd-journal       27 Jul 10 16:00  mysql.sock -> /var/run/mysqld/mysqld.sock
drwxr-x--- 2  999 systemd-journal     4096 Jul 10 14:38  performance_schema
-rw------- 1  999 systemd-journal     1705 Jul 10 14:38  private_key.pem
-rw-r--r-- 1  999 systemd-journal      452 Jul 10 14:38  public_key.pem
-rw-r--r-- 1  999 systemd-journal     1112 Jul 10 14:38  server-cert.pem
-rw------- 1  999 systemd-journal     1705 Jul 10 14:38  server-key.pem
drwxr-x--- 2  999 systemd-journal     4096 Jul 10 14:38  sys
-rw-r----- 1  999 systemd-journal 16777216 Jul 10 16:02  undo_001
-rw-r----- 1  999 systemd-journal 16777216 Jul 10 16:02  undo_002
root@vps-58c98726:/var/lib/docker/volumes/docker_dbdata/_data# cd expeditionWarsV2/
root@vps-58c98726:/var/lib/docker/volumes/docker_dbdata/_data/expeditionWarsV2# ls
root@vps-58c98726:/var/lib/docker/volumes/docker_dbdata/_data/expeditionWarsV2# ls
qsdsd.ibd
root@vps-58c98726:/var/lib/docker/volumes/docker_dbdata/_data/expeditionWarsV2# ls
qsdsd.ibd
root@vps-58c98726:/var/lib/docker/volumes/docker_dbdata/_data/expeditionWarsV2# ls -la
total 120
drwxr-x--- 2 999 systemd-journal   4096 Jul 10 16:09 .
drwxrwxrwt 8 999 systemd-journal   4096 Jul 10 16:00 ..
-rw-r----- 1 999 systemd-journal 114688 Jul 10 16:10 qsdsd.ibd
root@vps-58c98726:/var/lib/docker/volumes/docker_dbdata/_data/expeditionWarsV2# exit
exit
debian@vps-58c98726:~/PrivateServeur/docker$ docker compose exec
requires at least 2 arg(s), only received 0
debian@vps-58c98726:~/PrivateServeur/docker$ docker compose exec -ti database /bin/bash
bash-5.1# ls
afs  boot  docker-entrypoint-initdb.d  etc   lib    media  opt   root  sbin  sys  usr
bin  dev   entrypoint.sh               home  lib64  mnt    proc  run   srv   tmp  var
bash-5.1# mysqldump
Usage: mysqldump [OPTIONS] database [tables]
OR     mysqldump [OPTIONS] --databases [OPTIONS] DB1 [DB2 DB3...]
OR     mysqldump [OPTIONS] --all-databases [OPTIONS]
For more options, use mysqldump --help
bash-5.1# mysqldump expeditionWarsV2
mysqldump: Got error: 1045: Access denied for user 'root'@'localhost' (using password: NO) when trying to connect
bash-5.1# mysqldump -u pierre -proot expeditionWarsV2
mysqldump: [Warning] Using a password on the command line interface can be insecure.
-- MySQL dump 10.13  Distrib 8.0.38, for Linux (x86_64)
--
-- Host: localhost    Database: expeditionWarsV2
-- ------------------------------------------------------
-- Server version       8.0.38

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
mysqldump: Error: 'Access denied; you need (at least one of) the PROCESS privilege(s) for this operation' when trying to dump tablespaces

--
-- Table structure for table `qsdsd`
--

DROP TABLE IF EXISTS `qsdsd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qsdsd` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qsdsd`
--

LOCK TABLES `qsdsd` WRITE;
/*!40000 ALTER TABLE `qsdsd` DISABLE KEYS */;
INSERT INTO `qsdsd` VALUES (3),(4);
/*!40000 ALTER TABLE `qsdsd` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-10 16:14:21
bash-5.1# mysqldump -u pierre -proot expeditionWarsV2 > /tmp/dump.sql
mysqldump: [Warning] Using a password on the command line interface can be insecure.
mysqldump: Error: 'Access denied; you need (at least one of) the PROCESS privilege(s) for this operation' when trying to dump tablespaces
bash-5.1# mysqldump -u root -proot expeditionWarsV2 > /tmp/dump.sql
mysqldump: [Warning] Using a password on the command line interface can be insecure.
bash-5.1# /tmp
bash: /tmp: Is a directory
bash-5.1# cd /tmp
bash-5.1# ls
dump.sql
bash-5.1# exit
exit
debian@vps-58c98726:~/PrivateServeur/docker$ docker compose exec -ti database "^C
debian@vps-58c98726:~/PrivateServeur/docker$ docker compose exec -ti database "mysqldump -u root -proot expeditionWarsV2"
OCI runtime exec failed: exec failed: unable to start container process: exec: "mysqldump -u root -proot expeditionWarsV2": executable file not found in $PATH: unknown
debian@vps-58c98726:~/PrivateServeur/docker$ docker compose exec -ti database "bash -c mysqldump -u root -proot expeditionWarsV2"
OCI runtime exec failed: exec failed: unable to start container process: exec: "bash -c mysqldump -u root -proot expeditionWarsV2": executable file not found in $PATH: unknown
debian@vps-58c98726:~/PrivateServeur/docker$ git pull
remote: Enumerating objects: 7, done.
remote: Counting objects: 100% (7/7), done.
remote: Compressing objects: 100% (1/1), done.
remote: Total 4 (delta 3), reused 4 (delta 3), pack-reused 0
Unpacking objects: 100% (4/4), 341 bytes | 341.00 KiB/s, done.
From github.com:PierreM33/PrivateServeur
   0b5175e..2a7bd2c  main       -> origin/main
Updating 0b5175e..2a7bd2c
Fast-forward
 docker/docker-compose.yml | 1 +
 1 file changed, 1 insertion(+)
debian@vps-58c98726:~/PrivateServeur/docker$ docker compose up -d
[+] Running 4/4
 ✔ Container database    Started                                                                                                  2.9s
 ✔ Container php         Started                                                                                                  1.9s
 ✔ Container phpmyadmin  Started                                                                                                  1.9s
 ✔ Container nginx       Started                                                                                                  2.0s
debian@vps-58c98726:~/PrivateServeur/docker$ docker compose exec -ti database /bin/bash
bash-5.1# cd /data
bash-5.1# ls
bash-5.1# touch test
bash-5.1# ls
test
bash-5.1# exit
exit
debian@vps-58c98726:~/PrivateServeur/docker$ ls
app  composer-setup.php  composer.phar  docker-compose.yml  index.php  mysql  nginx  php
debian@vps-58c98726:~/PrivateServeur/docker$ cd mysql/
debian@vps-58c98726:~/PrivateServeur/docker/mysql$ ls
test
debian@vps-58c98726:~/PrivateServeur/docker/mysql$ history
    1  ls
    2  uname -a
    3  passwd
    4  sudo apt update
    5  sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release
    6  y
    7  sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release
    8  curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    9  echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   10  sudo apt update
   11  sudo apt install docker-ce docker-ce-cli containerd.io
   12  docker ps
   13  sudo docker ps
   14  sudo apt install git
   15  git clone git@github.com:PierreM33/PrivateServeur.git
   16  ls
   17  -ls
   18  ls
   19  ls -al ~/.ssh
   20  ssh-keygen -t ed25519 -C bourdaispe@outlook.fr
   21  git clone git@github.com:PierreM33/PrivateServeur.git
   22  cd ~/.ssh
   23  cat id_ed25519.pub
   24  git clone git@github.com:PierreM33/PrivateServeur.git
   25  ls
   26  cd ..
   27  ls
   28  cd ~/.ssh
   29  cd ~/.ssh
   30  rm -rf PrivateServeur
   31  ls
   32  cd ..
   33  git clone git@github.com:PierreM33/PrivateServeur.git
   34  ls
   35  cd PrivateServeur/
   36  ls
   37  cd docker/
   38  docker-compose up -d
   39  ~docker-compose up -d
   40  ~docker-compose up
   41  docker-compose up -d
   42  docker-compose up
   43  docker-compose --version
   44  cd ../..
   45  ls
   46  sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   47  sudo chmod +x /usr/local/bin/docker-compose
   48  docker-compose --version
   49  cd PrivateServeur/docker/
   50  docker-compose up -d
   51  groups
   52  sudo usermod -aG docker debian
   53  groups
   54  ls -l /var/run/docker.sock
   55  exit
   56  ls
   57  cd PrivateServeur/docker/
   58  ls
   59  docker-compose up -d
   60  docker-ps
   61  docker ps
   62  cd../..
   63  ls
   64  cd ..
   65  ls
   66  cd ..
   67  ls
   68  docker ps
   69  git clone git@github.com:PierreM33/PrivateServeur.git
   70  docker compose down
   71  docker ps
   72  docker-compose down
   73  cd PrivateServeur/docker/
   74  docker-compose down
   75  cd ../..
   76  ls
   77  rm PrivateServeur/
   78  rm-rf PrivateServeur/
   79  rm -r PrivateServeur
   80  ls
   81  git clone git@github.com:PierreM33/PrivateServeur.git
   82  ls
   83  cd PrivateServeur/docker/
   84  docker-compose up -d
   85  docker-compose down
   86  cd ../..
   87  ls
   88  rm -r PrivateServeur
   89  git clone git@github.com:PierreM33/PrivateServeur.git
   90  cd PrivateServeur/docker/
   91  docker-compose up -d
   92  docker ps
   93  docker-compose logs phpmyadmin
   94  docker-compose down
   95  cd ../..
   96  ls
   97  rm -r PrivateServeur
   98  git clone git@github.com:PierreM33/PrivateServeur.git
   99  cd PrivateServeur/docker/
  100  docker-compose up
  101  docker-compose up d
  102  git pull origin main
  103  docker-compose up -d
  104  docker volumes ls
  105  docker volume ls
  106  docker volume inspect docker_dbdata
  107  cd /var/lib/docker/volumes/docker_dbdata/_data
  108  sudo su
  109  docker compose exec
  110  docker compose exec -ti database /bin/bash
  111  docker compose exec -ti database "mysqldump -u root -proot expeditionWarsV2"
  112  docker compose exec -ti database "bash -c mysqldump -u root -proot expeditionWarsV2"
  113  git pull
  114  docker compose up -d
  115  docker compose exec -ti database /bin/bash
  116  ls
  117  cd mysql/
  118  ls
  119  history
debian@vps-58c98726:~/PrivateServeur/docker/mysql$
# ServeurOnline
# ExpeditionWarsV3
# ServerStarter
