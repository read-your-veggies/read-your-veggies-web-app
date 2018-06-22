const axios = require('axios');
const extractor = require('unfluff');
const Article = require('./db/ArticleSchema.js');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/readyourveggies');

require('dotenv').config();

// Optional: News API has their own Node module we can use in place of Axios.
// If we need to get more sophisticated with our search algorithms for articles,
// we will give this a shot.   https://newsapi.org/docs/client-libraries/node-js
// const NewsAPI = require('newsapi');
// const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

let retrieveUrls = () => {
  axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`)
    .then( (response) => {
      // console.log('news data', response.data)
      let urlList = [];
      response.data.articles.forEach( (article) => {
        urlList.push(article.url);
      })
      console.log('time to retrieve the articles');
      retrieveArticles(urlList);
    })
    .catch( (err) => {
      console.log(err);
    });
}

let retrieveArticles = function (urlList) {
  articleList = [];

  var parseAllArticles = () => {
    if (urlList.length > 0) {
      var currArticleUrl = urlList.pop();
      console.log('scraping this URL', currArticleUrl);
      
      axios.get(currArticleUrl)
          .then( (response) => {
              var webpage = extractor(response.data);
              var article = {
                url: currArticleUrl,
                title: webpage.title,
                author: webpage.author,
                source: webpage.publisher,
                description: webpage.description,
                fullText: webpage.text,
              }
              articleList.push(article);
          })
          .then( () => {
            parseAllArticles();
          })
          .catch( (err) => {
            console.log(err);
          })
    } else {
      console.log('scraped a full list of articles');
      // return articleList;

      // Now we have a full list of web-scraped article data, time to send to the db.
      populateArticles(articleList);
    }
  }
  parseAllArticles();
}

let populateArticles = (articleList) => {
  articleList.forEach( (article) => {
    Article.create(article, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Article saved to db');
      }
    })
  });
}
  
retrieveUrls(); 
// Will need to export the functions when fully integrating.