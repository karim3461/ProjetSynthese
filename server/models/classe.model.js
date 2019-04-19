const mongoose = require('mongoose');

const ClasseSchema = new mongoose.Schema({
  idCours: {
    type: String,
    required: true,
	unique: true
  },
  idTrimestre: {
    type: String,
    required: true
  },
  idProfesseur: {
    type: String,
    required: true
  },
  nbEtudiants: {
    type: Number,
    required: true
  }
);


module.exports = mongoose.model('Classe', ClasseSchema);
