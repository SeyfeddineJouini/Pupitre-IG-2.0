# Bilan-Carbone
## Prérequis système

- **Node.js:** Version 19.x.x ou supérieure.
- **MongoDB:** Version 6.x.x ou supérieure.
- **Python:** Version 3.x.x ou supérieure.
- **Flask:** Version 3.x.x ou supérieure.


## Installation de l’application

1. Clonez le dépôt Git : `git clone https://github.com/SirineHa/Bilan-Carbone.git`.
2. Accédez au répertoire du frontend : `cd client`.
3. Installez les dépendances : `npm install`.
4. Accédez au répertoire du backend Node.js : `cd server/node-js`.
5. Installez les dépendances : `npm install`.
6. Décommentez le fichier `.env`, puis configurez les variables d'environnement selon vos besoins.
7. Accédez au répertoire du calculateur de bilan carbone Flask : `cd server/flask`.
8. Installez les dépendances : `pip install -r requirements.txt`.

## Configuration de la base de données

Assurez-vous que MongoDB est en cours d'exécution sur votre système.

## Démarrage des serveurs

- **Serveur frontend (React.js):** `npm start`.
- **Serveur backend (Node.js):** `npm start`.
- **Serveur backend (Flask):** `python app.py`.

## Connexion à l’application

### Accès local :

- Frontend (React.js): [http://localhost:3000](http://localhost:3000)
- Backend (Node.js): [http://localhost:5000](http://localhost:5000)
- Backend (Flask): [http://localhost:5001](http://localhost:5001)

### Accès distant via Render :

- Frontend (React.js): [https://bilan-carbone-6859.onrender.com/](https://bilan-carbone-6859.onrender.com/)
- Backend (Node.js): [https://bilan-carbone-node-js.onrender.com/](https://bilan-carbone-node-js.onrender.com/)
- Backend (Flask): [https://bilan-carbone-flask-server.onrender.com/](https://bilan-carbone-flask-server.onrender.com/)
