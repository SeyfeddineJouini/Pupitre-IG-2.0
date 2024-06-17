// routes/avis.js
const express = require('express'); // Importez express
const { sendResultEMail, calculateresult ,calculateresult2} = require('../controllers/quizController');
const router = express.Router(); // Créez un routeur express

// Route pour récupérer tous les avis
router.post('/calculate', calculateresult);
router.post('/calculate2', calculateresult2);
router.post('/send-email', sendResultEMail);


 module.exports = router; 
