const mongoose = require('mongoose');

const CoursSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  sigle: {
    type: String,
    required: true,
    unique: true
  },
  programmes: {
	type: [String]
  },
  trimestres : [{
    annee: Number,
    saison: String,
	professeur: String,
	nbEtudiants: Number
  }]
}, {
  versionKey: false
}).index({
  '$**': 'text' //Allow search on all fields
  //'nom': 'text', //Allow search on all fields
  //'sigle': 'text', //Allow search on all fields
});

module.exports = mongoose.model('Cours', CoursSchema);
