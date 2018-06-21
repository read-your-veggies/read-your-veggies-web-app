const extractor = require('unfluff');
const axios = require('axios');

let url = "http://www.cnn.com/2014/07/07/world/americas/mexico-earthquake/index.html";
axios.get(url)
  .then( (response) => {
    let webpage = extractor(response.data);
    console.log('unfluffed', webpage.text);
  })
  .catch(function (error) {
    console.log(error);
  });