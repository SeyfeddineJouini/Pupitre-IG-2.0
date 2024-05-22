require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const dbUri = process.env.MONGODB_URI;

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    //console.log('MongoDB connected...');

    // Vérifie si un administrateur avec cet email existe déjà
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (existingAdmin) {
      //console.log('Admin user already exists');
      return;
    }

    // Créer un nouvel administrateur si non existant
    const newAdmin = new Admin({
      email: process.env.ADMIN_EMAIL, // Mis à jour pour utiliser email
      password: process.env.ADMIN_PASSWORD, // Utilisation de variable d'environnement pour le mot de passe
    });

    newAdmin.save()
      .then(() => console.log('Admin user created'))
      .catch(err => console.error(err));
  })
  .catch(err => console.error(err));
