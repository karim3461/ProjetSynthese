const mongoose = require('mongoose');

const TrimestreSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  abbreviation: {
    type: String,
    required: true
  }
);


module.exports = mongoose.model('Trimestre', TrimestreSchema);
