const mongoose = require('mongoose');

const ProgrammeSchema = new mongoose.Schema({
   nom: {
    type: String,
    required: true
  },
  sigle: {
    type: String,
    required: true,
    unique: true
  }
});


module.exports = mongoose.model('Programme', ProgrammeSchema);
