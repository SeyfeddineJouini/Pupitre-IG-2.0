require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const localPassport = require('./config/passport');

const app = express();
const PORT = process.env.PORT || 5000; // Utilisation d'une variable d'environnement pour le port
const dbUri = process.env.MONGODB_URI;

// app.use(cors({
//   origin: ["http://localhost:3000","https://bilan-carbone-flask-server.onrender.com/","https://bilan-carbone-6859.onrender.com/","https://bilan-carbone-node-js.onrender.com/"], // Assurez-vous de configurer les bons domaines ici
//   credentials: true, // Permet les credentials cross-origin
// }));
app.use(cors({
  origin: function (origin, callback) {
    // Vérifiez si l'origine est une sous-domaine de onrender.com ou une des URL spécifiques
    if (!origin || /(\.|\b)onrender\.com$/.test(origin) || origin === 'http://localhost:3000') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Permet les credentials cross-origin
}));
app.use(bodyParser.json());

// Configuration de session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production", // Assurez-vous que secure est activé en production
    httpOnly: true, // Empêche l'accès au cookie via JavaScript côté client
    sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax', // Réglez sameSite sur 'none' en production
  }
}));

app.use(localPassport.initialize());
app.use(localPassport.session());

// Importation des routes
const routes = require('./routes');
app.use(routes);

mongoose.connect(dbUri)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});