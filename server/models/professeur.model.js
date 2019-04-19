const mongoose = require('mongoose');

const ProfesseurSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  }
);


module.exports = mongoose.model('Professeur', ProfesseurSchema);
