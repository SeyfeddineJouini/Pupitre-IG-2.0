const express = require('express');
const router = express.Router();

const avisRoutes = require('./avis');
const statRoutes = require('./stats');
const authRoutes = require('./auth');
const quizRoutes = require('./quizRoutes');
const flaskRoutes = require('./flask');

router.use('/avis', avisRoutes);
router.use('/stats', statRoutes);
router.use('/quiz', quizRoutes);
router.use('/', authRoutes);

module.exports = router;