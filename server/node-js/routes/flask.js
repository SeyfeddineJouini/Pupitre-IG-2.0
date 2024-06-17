const express = require('express'); // Importez express
const cors = require('cors');
const axios = require('axios');

const router = express.Router(); // Créez un routeur express

router.use(cors());

router.post('/calculate_carbon_footprint', async (req, res) => {
    const flaskServer = process.env.FLASK_SERVER;
    try {
        const data = req.body;
        // Appel à l'endpoint Flask pour calculer l'empreinte carbone
        const flaskResponse = await axios.post(`${flaskServer}/api/calcul_emission`, data);
        // Renvoyer les résultats à votre application React
        res.json(flaskResponse.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});
router.post('/calculate_emissions_2', async (req, res) => {
    const flaskServer2 = process.env.FLASK_SERVER_2;
    try {
        const data = req.body;
        // Appel à l'endpoint Flask pour calculer l'empreinte carbone
        const flaskResponse2 = await axios.post(`${flaskServer2}/api/calcul_emission_2`, data);
        // Renvoyer les résultats à votre application React
        res.json(flaskResponse2.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router; // Exportez le routeur pour l'utiliser dans d'autres fichiers