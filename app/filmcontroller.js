var db = require('../config/sequelizeconfig');

console.log(db);

function FilmController() {

    this.getAllFilms = function(req, res) {
      db.query("SELECT * FROM films").then(function(films) {
            res.json(films);
        })
    }

    this.getFilmInfo = function(res, req) {

    };

    this.getFilmRecommendations = function(res, req) {

    };
};

module.exports = new FilmController();
