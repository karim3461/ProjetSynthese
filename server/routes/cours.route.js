const express = require('express');

const Cours = require('../models/cours.model');

const router = express.Router();
module.exports = router;

//Liste de tous les Cours
router.get('/', function(req, res, next) {
  Cours.find({}).sort([["sigle", "asc"]]).exec(function (err, products) {
    if (err) {
		return next(err);
	}
    res.json(products);
  });
});

//Recherche de cours
router.post('/recherche', function(req, res, next) {
	search = { 
	  nom: new RegExp(req.body.nom, "i"),
	  sigle: new RegExp(req.body.sigle, "i"),
	}
	
	if (req.body.programmes !== ""){
		search.programmes = new RegExp(req.body.programmes, "i");
	}
	
	//console.log(JSON.stringify(search));
	
  Cours.find(search).sort([["sigle", "asc"]]).exec(function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

//Obtenir un cours
router.get('/:id', function(req, res, next) {
  Cours.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

//Ajouter un Cours
router.post('/', function(req, res, next) {
  console.log(JSON.stringify(req.body));
  Cours.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

//Mettre à jour un Cours
router.put('/:id', function(req, res, next) {
  Cours.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
	//Cette fonction fait un warning de depreciation dans la console, mais fonctionne correctement.  	
    if (err) return next(err);
    res.json(post);
  });
});

//Supprimer un Cours
router.delete('/:id', function(req, res, next) {
  Cours.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});