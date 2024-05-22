const express = require('express');
const Statistique = require('../models/Statistique'); // Assurez-vous que le chemin d'accès est correct
const router = express.Router();



// Route pour récupérer tous les statistiques
router.get('/GetStats', async (req, res) => {
    try {
      const statistiques = await Statistique.find();
        res.json(statistiques);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour récupérer les trois avis les plus récents
router.get('/Get3Stats', async (req, res) => {
  try {
    const statistiques = await Statistique.find().sort({date: -1}).limit(3);
    res.json(statistiques);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Route pour créer un nouvel statistique
router.post('/AddStats', async (req, res) => {
  //console.log(req)
  const statistique = new Statistique({
      // Assurez-vous que ces champs correspondent à ceux de votre modèle Statistique
      name: req.body.name,
      mode: req.body.mode,
      scoreTotal: req.body.scoreTotal,
      transport: req.body.transport,
      alimentation: req.body.alimentation,
      logement: req.body.logement,
      divers: req.body.divers,
      spe: req.body.spe,
      date: Date.now(),
  });
  //console.log(statistique);
  try {
      const newStatistique = await statistique.save();
      res.status(201).json(newStatistique);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});



// Route pour supprimer un avis
router.delete('/DeleteStats/:id', async (req, res) => {
  try {
    const statistique = await Statistique.findByIdAndDelete(req.params.id);
    if (!statistique) {
      return res.status(404).json({ message: 'Statistique not found' });
    }

    res.json({ message: 'Statistique deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/api/statistiques/totalScore', async (req, res) => {
  try {
    const statistiques = await Statistique.find();
    let total = statistiques.reduce((sum, stat) => sum + parseInt(stat.scoreTotal, 10), 0);

    res.json({ total });
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques: ", error);
    res.status(500).json({ message: "Erreur lors de la récupération des statistiques." });
  }
});
router.get('/api/statistiques/count', async (req, res) => {
  try {
    const count = await Statistique.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error("Erreur lors de la récupération du nombre de statistiques: ", error);
    res.status(500).json({ message: "Erreur lors de la récupération du nombre de statistiques." });
  }
});

module.exports = router;
