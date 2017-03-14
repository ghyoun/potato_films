var db = require('../config/sequelizeconfig');
const request = require('request'),
      express = require('express'),
      app = express();

var router = express.Router();

function FilmController() {

    this.getAllFilms = function(req, res) {
      db.sequelize.query("SELECT * FROM films").then(function(films) {
            res.json(films);
        })
    };

    this.getFilmInfo = function(res, req) {
      var givenId = req.req.params.id;

      db.Films.findAll({
        where: {
          id : givenId,
        }
      }).then(function(foundFilm) {
        if (foundFilm == null || foundFilm == [] || foundFilm == '') {
          res.res.json({
            "message" : "Could not file film",
          });
        } else {
          res.res.json(foundFilm);
        }
      });
    };

    this.getFilmRecommendations = function(res, req) {
      var givenId = req.req.params.id;
      var genreId;
      var releaseDate;
      db.Films.findAll({
        where: {
          id : givenId,
        }
      }).then(function(foundFilm) {
        if (foundFilm == null || foundFilm == [] || foundFilm == '') {
          res.res.json({
            "message" : "Could not find film",
          });
        } else {
          genreId = foundFilm[0].genre_id;
          releaseDate = new Date(foundFilm[0].release_date);
          db.Films.findAll({
            where : {
              genre_id : genreId
            }
          }).then(function(foundFilms) {
            if (foundFilms == null || foundFilms == [] || foundFilms == '') {
              res.res.json({
                "message" : "Could not find any film reccomendations",
              });
            } else {
              var filteredFilms = []
              var limitCount = 0;
              var offsetCount = 1;
              for (var i = 0; i < foundFilms.length; i++) {
                var tempDate = new Date(foundFilms[i].release_date);
                var diff = (releaseDate - tempDate)/86400000;
                if (diff <= 730 && diff >= -730 && limitCount < 10) {
                  if (givenId != foundFilms[i].id) {
                    if (offsetCount <= 0) {
                      filteredFilms.push(foundFilms[i]);
                      limitCount++;
                    } else {
                      offsetCount--;
                    }
                  }
                }
              }
              res.res.json({
                'recommendations' : filteredFilms,
                'meta' : {
                  "limit" : 10,
                  "offset" : 0,
                }
              })
            }
          });
        }
      });


    };
};

module.exports = new FilmController();
