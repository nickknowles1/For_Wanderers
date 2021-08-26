

const axios = require('axios');
const {googleInfo} = require('../config.js');


const handleGoogleSearchRequest = function(query, res) {
  axios.get(`https://www.googleapis.com/customsearch/v1?cx=${googleInfo.cx}&searchType=image&q=${query}&key=${googleInfo.api_key}`)
  .then((results) => {
    //console.log(results.data.items);
    res.send(results.data.items);
  })
  .catch((err) => {
    console.error(err);
    console.log('I am in the controllers')
  })
}

module.exports = {
  handleGoogleSearchRequest: handleGoogleSearchRequest
}