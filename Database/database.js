const { Client } = require('pg');
const {dbInfo, dbInfo2} = require('../config.js');
const dbClient = new Client(dbInfo);
const fs = require('fs');

dbClient.connect()
.then(() => console.log('Connected to Postgres Database!'))
.catch((err) => console.error(err, 'Error connecting to Postgres :('))
//.finally(() => dbClient.end())

const handleCreateNewPlaceInDatabase =function(obj) {
  let date = new Date().toString();
  return dbClient.query(`INSERT INTO places (name, beenhere, date, wanttogo,
    photourl, description, points) VALUES (${obj.name}, 0, '${date}', 0,
    ${obj.photoURL}, ${obj.description}, 50) RETURNING *`)
}

const getAllCardsFromDatabase = function() {
  return dbClient.query(`SELECT * FROM places`)
}

const getUserCardsFromDatabase = function(obj) {
  return dbClient.query(`SELECT * FROM traveler_places INNER JOIN places
  ON place = place_id WHERE traveler = ${obj.travelerID}`)
}

const handleAddToUserPlacesInDatabase = function(obj) {
  let date = new Date().toString();
  return dbClient.query(`INSERT INTO traveler_places (traveler, place, date)
  VALUES (${obj.travelerID}, ${obj.placeID}, '${date}') RETURNING *`)
}

module.exports = {
  handleCreateNewPlaceInDatabase: handleCreateNewPlaceInDatabase,
  getAllCardsFromDatabase: getAllCardsFromDatabase,
  handleAddToUserPlacesInDatabase: handleAddToUserPlacesInDatabase,
  getUserCardsFromDatabase: getUserCardsFromDatabase
}