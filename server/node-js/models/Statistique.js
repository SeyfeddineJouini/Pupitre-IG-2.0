const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StatistiqueSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    scoreTotal: {
        type: String, 
        required: true 
    },
    transport: {
        type: String, 
        required: true 
    },
    alimentation: {
        type: String, 
        required: true 
    },
    logement: {
        type: String, 
        required: true 
    },
    biens: {
        type: String, 
        required: true 
    },
    services: {
        type: String, 
        required: true 
    },
    spe: {
        type: String, 
        required: true 
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// ici le 3e argument est le nom de la collection dans la base de données
const Statistique = mongoose.model('Statistique', StatistiqueSchema, 'stats');

module.exports = Statistique;
