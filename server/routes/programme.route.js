const express = require('express');

const Programme = require('../models/programme.model');

const router = express.Router();
module.exports = router;

//Liste de tous les programmes
router.get('/', function(req, res, next) {
  Programme.find(function (err, products) {
    if (err) {
		return next(err);
	}
    res.json(products);
  });
});

//Obtenir un programme
router.get('/:id', function(req, res, next) {
  Programme.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

//Ajouter un programme
router.post('/', function(req, res, next) {
  Programme.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

//Mettre à jour un programme
router.put('/:id', function(req, res, next) {
  Programme.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
	//Cette fonction fait un warning de depreciation dans la console, mais fonctionne correctement.  
    if (err) return next(err);
    res.json(post);
  });
});

//Supprimer un programme
router.delete('/:id', function(req, res, next) {
  Programme.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});