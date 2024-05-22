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
    divers: {
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

/*const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StatistiqueSchema = new Schema({
    resultat: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    reponse: {
        type: Schema.Types.ObjectId, 
        ref: 'Reponse' 
    },
});

// creation avis
StatistiqueSchema.statics.createStatistique = async function(statistiqueData) {
    try {
        return await this.create(statistiqueData);
    } catch (error) {
        throw new Error(error);
    }
};

const Statistique = mongoose.model('Statistique', StatistiqueSchema);

module.exports = Statistique;*/