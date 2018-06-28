const countyConvert = require('../db/data/citiesCounties.js');
const axios = require('axios');
require('dotenv').config();

// Write a function here that we will export to facebookAuth
const getRatio = function (city) {
  // Idea: We can pass in the user ID as a 2nd argument and invoke the User model 
  // to add the information to the db from within this function itself.
  // We would have to import User schema and perform a findOneAndUpdate
  let county = countyConvert[city];
  let key = process.env.ELECTIONS_BY_COUNTY_API_KEY;
  
  return axios.get(`https://electionsbycounty.com/api/v1.0/${key}/elections/${county}/Presidential`)
    .then( (response) => {
      // Filter out just the elections since 2000
      let filteredElections = response.data.filter( election => {
        return election.Date[0] === '2';
      });
      
      // Get the republican and democrat votes and make a ratio for each election.
      let ratios = filteredElections.map( (election) => {
        return election.DemocraticVotes / election.RepublicanVotes;
      });
      
      // Take the mean average of all the ratios, and return.
      return ratios.reduce( (total, currVal) => {
        return total + currVal;
      }) / ratios.length;
    })
    .catch( (err) => {
      console.log('error!', err);
    })
}

module.exports = getRatio