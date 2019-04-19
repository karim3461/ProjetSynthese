const Joi = require('joi');
const Cours = require('../models/cours.model');

const coursSchema = Joi.object({
  nom: Joi.string().required(),
  sigle: Joi.string().required()
})


module.exports = {
  insert
}

async function insert(cours) {
  cours = await Joi.validate(cours, coursSchema, { abortEarly: false });
  return await new Cours(cours).save();
}
