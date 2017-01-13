const sqlite = require('sqlite'),
      Sequelize = require('sequelize'),
      express = require('express'),
      app = express();

const { PORT=3000, NODE_ENV='development', DB_PATH='./db/database.db' } = process.env;

// SEQUELIZE ORM EXAMPLE
const sequelize = new Sequelize('database', '', '', { 
  dialect: 'sqlite',
  storage: DB_PATH
});

const Review = sequelize.define('review', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  author: Sequelize.STRING,
  content: Sequelize.STRING,
  rating: Sequelize.INTEGER,
  created_at: Sequelize.DATE,
}, { timestamps: false });

Review.findAll({
  limit: 1
}).then((results) => {
  console.log('[SEQUELIZE]:', results.map((row) => row.dataValues));
});

// RAW SQLITE EXAMPLE
sqlite.open(DB_PATH).then(() => {
  sqlite.all('SELECT * FROM reviews LIMIT 1')
    .then((results) => console.log('[SQLITE]:', results));
});

// START SERVER
Promise.resolve()
  .then(() => app.listen(PORT, () => console.log(`App listening on port ${PORT}`)))
  .catch((err) => { if (NODE_ENV === 'development') console.error(err.stack); });

// ROUTES
app.get('/films/:id/recommendations', getFilmRecommendations);

// ROUTE HANDLER
function getFilmRecommendations(req, res) {
  res.send('Not Implemented');
}

module.exports = app;
