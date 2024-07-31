# Utilisation de l'image Node.js Alpine
FROM node:20-alpine

# Définition du répertoire de travail dans le conteneur
WORKDIR /app

# Copie du package.json et du package-lock.json dans le répertoire de travail
COPY package*.json ./

# Nettoyage du cache npm
RUN npm cache clean --force

# Installation des dépendances Node.js
RUN npm install && echo "Dependencies installed"

# Installation de react-scripts globalement
RUN npm install react-scripts -g && echo "react-scripts installed"

RUN npm install react-refresh --save-dev && echo "react-refresh installed"


# Copie du reste des fichiers de l'application
COPY . .

# Exposition du port 3000 (s'il est nécessaire)
EXPOSE 3000

# Commande par défaut pour exécuter npm run build (ou npm start selon le besoin)
#CMD ["npm", "run", "build"]
#CMD npm install && npm run build
