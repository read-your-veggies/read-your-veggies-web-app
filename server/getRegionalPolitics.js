const countyConvert = require('../db/data/citiesCounties.js');
const axios = require('axios');
require('dotenv').config();

// Write a function here that we will export to facebookAuth
const getRatio = function (city) {
  let county = countyConvert[city];
  let key = process.env.ELECTIONS_BY_COUNTY_API_KEY;

  axios.get(`https://electionsbycounty.com/api/v1.0/${key}/elections/${county}/Presidential`)
      .then( (response) => {

        // Filter out just the elections since 2000
        let filteredElections = response.data.filter( election => {
          return election.Date[0] === '2';
        });

        // Get the republican and democrat votes and make a ratio for each election.
        let ratios = filteredElections.map( (election) => {
          return election.DemocraticVotes / election.RepublicanVotes;
        });

        // Take the mean average of all the ratios.
        let avgRatio = ratios.reduce( (total, currVal) => {
          return total + currVal;
        }) / ratios.length;
        
        // Now with the average ratio we... add to user's profile in mongo?

      })
      .catch( (err) => {
        console.log('error!', err);
      })
}

// getRatio('Cascade Valley, Washington');