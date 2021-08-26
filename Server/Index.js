const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const {googleInfo} = require('../config.js');
const db = require('../Database/database.js');
const controllers = require('../Server/controllers.js');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(__dirname + '/../dist'));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.get('/search', (req, res) => {
  console.log(req.query.query);
  controllers.handleGoogleSearchRequest(req.query.query, res);
})

app.get('/getAllCards', (req, res) => {
  db.getAllCardsFromDatabase()
  .then((results) => {
    //console.log(results.rows);
    res.send(results.rows);
  })
  .catch((err) => {
    console.error(err);
  })
})

app.get('/getUserCards', (req, res) => {
  db.getUserCardsFromDatabase(req.query)
  .then((results) => {
    console.log(results.rows);
    res.send(results.rows);
  })
  .catch((err) => {
    console.error(err);
  })
})

app.post('/createNew', (req, res) => {
  console.log(req.query);
  db.handleCreateNewPlaceInDatabase(req.query)
  .then((results) => {
    console.log(results.rows);
    res.send(results.rows[0]);
  })
  .catch((err) => {
    console.error(err);
    console.log('I am in the server index');
    res.send('Item Card already exists');
  })
})

app.post('/addToUserPlaces', (req, res) => {
  console.log(req.query);
  db.handleAddToUserPlacesInDatabase(req.query)
  .then((results) => {
    console.log(results.rows);
    res.send(results.rows[0]);
  })
  .catch((err) => {
    console.error(err);
    console.log('I am in the server index');
  })
})

