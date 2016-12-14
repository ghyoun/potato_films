const db = require('sqlite'),
      express = require('express'),
      app = express();

const PORT = process.env.PORT || 3000,
      DB_PATH = process.env.DB_PATH || './db/database.db';

app.get('/films/:id/reviews', getFilmReviews);
app.get('/films/:id/recommendations', getFilmRecommendations);
app.get('/sample-data', getData);

db.open(DB_PATH)
  .then(() => app.listen(PORT, () => console.log(`App listening on port ${PORT}`)))
  .catch((err) => console.error(err.stack));

function getFilmReviews(req, res) {
  res.send('Not Implemented');
}

function getFilmRecommendations(req, res) {
  res.send('Not Implemented');
}

// To sample data; change name of table to see other data
function getData(req, res) {
  db.all(`SELECT * FROM artists LIMIT 10`)
    .then((data) => {
      console.log('Data from SQLite:', data);
    })
  res.send('Data Sample Sent To Console');
}

module.exports = app;
