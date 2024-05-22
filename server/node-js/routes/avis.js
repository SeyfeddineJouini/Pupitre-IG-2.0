// routes/avis.js
const express = require('express'); // Importez express
const Avis = require('../models/Avis'); // Assurez-vous que le chemin d'accès est correct
const router = express.Router(); // Créez un routeur express

// Route pour récupérer tous les avis
router.get('/GetAvis', async (req, res) => {
  try {
    
    const avis = await Avis.find(); // Récupérez tous les avis
    //console.log(avis);
    res.json(avis); // Renvoyer les avis en tant que réponse
  } catch (err) {
    //console.log(err);
    res.status(500).json({ message: err.message }); // Renvoyer un code d'erreur 500 en cas d'erreur
  }
});



// Route pour récupérer les trois avis les plus récents
router.get('/Get3Avis', async (req, res) => {
    try {
      const avis = await Avis.find().sort({date: -1}).limit(3);
      res.json(avis);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });



// Route pour créer un nouvel avis
router.post('/AddAvis', async (req, res) => {
  const avis = new Avis({ 
    name: req.body.name,
    type: req.body.type,
    comment: req.body.comment,
    /*date: req.body.date,*/
    date: Date.now(),
  });

  try {
    const newAvis = await avis.save(); // Enregistrez l'avis dans la base de données
    res.status(201).json(newAvis); // Renvoyer un code de statut 201 pour indiquer que l'avis a été créé avec succès
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Route pour supprimer un avis
router.delete('/DeleteAvis/:id', async (req, res) => {
  try {
    const avis = await Avis.findByIdAndDelete(req.params.id);
    if (!avis) {
      return res.status(404).json({ message: 'Avis not found' });
    }

    res.json({ message: 'Avis deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; // Exportez le routeur pour l'utiliser dans d'autres fichiers