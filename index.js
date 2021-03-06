const sqlite = require('sqlite'),
      Sequelize = require('sequelize'),
      request = require('request'),
      express = require('express'),
      app = express();

const { PORT=3000, NODE_ENV='development', DB_PATH='./db/database.db' } = process.env;

//I wanted to modularize this more to be scalable to add more models
//The apps folder contains a route file, controller file, and a folder for models 



// START SERVER
Promise.resolve()
  .then(() => app.listen(PORT, () => console.log(`App listening on port ${PORT}`)))
  .catch((err) => { if (NODE_ENV === 'development') console.error(err.stack); });



// ROUTES


require('./app/routes')(app); // pass our application into our routes


module.exports = app;
