'use strict'
var path = require('path');
var film = require('./filmcontroller.js');
var express = require('express');
var router = express.Router();
module.exports = function(app) {

  //res.sends a json file will all films in the db
  app.get('/allFilms', film.getAllFilms);

  //gets the json info for a particular film id
  app.get('/films/:id', film.getFilmInfo);

  //gets the recommendations for a particular movie id. Developers can also use limit and offset parameters
  app.get('/films/:id/recommendations',film.getFilmRecommendations);

  app.get('*', function(req, res) {
    res.send("This is a API for Movie Recommendations");
  });

};
