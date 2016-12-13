const db = require('sqlite'),
      express = require('express'),
      app = express();

const PORT = process.env.PORT || 3000,
      DB_PATH = process.env.DB_PATH || './db/database.db';

app.get('/films/:id/reviews', getFilmReviews);
app.get('/films/:id/recommendations', getFilmRecommendations);

db.open(DB_PATH)
  .then(() => app.listen(PORT, () => console.log(`App listening on port ${PORT}`)))
  .catch((err) => console.error(err.stack));

function getFilmReviews(req, res) {
  // Example
  db.all(`SELECT * FROM artists LIMIT 10`)
    .then((data) => {
      console.log('Data from SQLite:', data);
      res.send('Not Implemented');
    })
}

function getFilmRecommendations(req, res) {
  res.send('Not Implemented');
}

module.exports = app;
