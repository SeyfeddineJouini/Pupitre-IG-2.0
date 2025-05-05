const mongoose = require('mongoose'); // Importez mongoose
const Schema = mongoose.Schema;  // Utilisez l'objet Schema de mongoose

const AvisSchema = new Schema({     // AvisSchema est un objet qui contient les champs de votre collection
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    /*date: {
        type: String,
        required: true
    }*/
    date: {
        type: Date,
        default: Date.now
    }
});

const Avis = mongoose.model('Avis', AvisSchema, 'avis'); // Créez un modèle Avis à partir de AvisSchema
module.exports = Avis;
