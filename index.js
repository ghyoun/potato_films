const db = require('sqlite'),
      express = require('express'),
      app = express();

const PORT = process.env.PORT || 3000;

app.get('/films/:id/reviews', getFilmReviews);
app.get('/films/:id/recommendations', getFilmRecommendations);

db.open('./db/database.db')
  .then(() => app.listen(PORT, () => console.log(`App listening on port ${PORT}`)))
  .catch((err) => console.error(err.stack));

function getFilmReviews(req, res) {
  res.send('Not Implemented');
}

function getFilmRecommendations(req, res) {
  res.send('Not Implemented');
}

module.exports = app;
