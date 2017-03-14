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
        console.log("result" + foundFilm);
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
        console.log("result" + foundFilm);
        if (foundFilm == null || foundFilm == [] || foundFilm == '') {
          res.res.json({
            "message" : "Could not file film",
          });
        } else {
          genreId = foundFilm[0].genre_id;
          releaseDate = new Date(foundFilm[0].release_date);
          console.log(typeof releaseDate);
        }
      });

      db.Films.findAll({
        where : {
          genre_id : genreId,
        }
      })
    };
};

module.exports = new FilmController();
