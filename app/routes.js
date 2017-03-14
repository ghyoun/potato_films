'use strict'
var path = require('path');
var film = require('./filmcontroller.js');
var express = require('express');
var router = express.Router();
module.exports = function(app) {

  app.get('/films', function(req, res) {
    res.send("This is a API for Movie Recommendations");
  });

  app.get('/allFilms', film.getAllFilms);

  app.get('/films/:id', film.getFilmInfo);

  app.get('/films/:id/recommendations',film. getFilmRecommendations);

};
