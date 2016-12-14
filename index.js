const db = require('sqlite'),
      express = require('express'),
      app = express();

const { PORT=3000, NODE_ENV='development', DB_PATH='./db/database.db' } = process.env;

app.get('/films/:id/reviews', getFilmReviews);
app.get('/films/:id/recommendations', getFilmRecommendations);
app.get('/sample-data', getData);

db.open(DB_PATH)
  .then(() => app.listen(PORT, () => console.log(`App listening on port ${PORT}`)))
  .catch((err) => { if (NODE_ENV === 'development') console.error(err.stack); });

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
