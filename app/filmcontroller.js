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

    //uses req.query to get any parameters
    //filters recommendations by the same genre-id and 15 years before, after the movie release date
    this.getFilmRecommendations = function(res, req) {
      var givenId = req.req.params.id;
      var genreId;
      var releaseDate;
      var defaultLimit;
      if (req.req.query.limit == null) {
        defaultLimit = 10;
      } else {
        defaultLimit = req.req.query.limit;
      }
      var defaultOffset;
      if (req.req.query.offset == null) {
        defaultOffset = 0;
      } else {
        defaultOffset = req.req.query.offset;
      }
      var limitCount = defaultLimit;
      var offsetCount = defaultOffset;
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

              for (var i = 0; i < foundFilms.length; i++) {
                var tempDate = new Date(foundFilms[i].release_date);
                var diff = (releaseDate - tempDate)/86400000;
                if (diff <= 5478 && diff >= -5478 && limitCount > 0) {
                  if (givenId != foundFilms[i].id) {
                    if (offsetCount <= 0) {
                      filteredFilms.push(foundFilms[i]);
                      limitCount--;
                    } else {
                      offsetCount--;
                    }
                  }
                }
              }
              res.res.json({
                'recommendations' : filteredFilms,
                'meta' : {
                  "limit" : defaultLimit,
                  "offset" : defaultOffset,
                }
              })
            }
          });
        }
      });
    };

};

module.exports = new FilmController();
