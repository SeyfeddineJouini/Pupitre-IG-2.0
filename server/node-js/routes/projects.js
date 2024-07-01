const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Importer le module fs
const Project = require('../models/Project');

const router = express.Router();

// Configuration de multer pour le téléchargement de fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); // Utiliser un chemin relatif pour le répertoire 'uploads'
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Renommer le fichier pour éviter les conflits
  }
});

const upload = multer({ storage: storage });

// Fonction pour supprimer les fichiers associés à un projet
const deleteFiles = (files) => {
  files.forEach(file => {
    const filePath = path.join(__dirname, '..', file.path);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file ${filePath}:`, err);
      } else {
        console.log(`Successfully deleted file ${filePath}`);
      }
    });
  });
};

// Route pour ajouter un projet
// Route pour ajouter un projet
router.post('/add', upload.array('files'), async (req, res) => {
    const { title } = req.body;
    console.log('Request body:', req.body);
    console.log('Files:', req.files);
  
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files were uploaded.' });
    }
  
    const files = req.files.map(file => ({
      name: file.originalname,
      path: `/uploads/${file.filename}`
    }));
  
    try {
      const newProject = new Project({ title, files });
      await newProject.save();
      res.status(201).json({ message: 'Projet ajouté avec succès', id: newProject._id, title: newProject.title, files: newProject.files });
    } catch (err) {
      console.error('Error saving project:', err);
      res.status(500).json({ error: err.message });
    }
  });
  

// Route pour récupérer tous les projets
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route pour supprimer un projet
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Supprimer les fichiers associés au projet
    deleteFiles(project.files);

    await Project.deleteOne({ _id: req.params.id }); // Suppression du projet de la base de données
    res.status(200).json({ message: 'Project deleted successfully', id: req.params.id });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
