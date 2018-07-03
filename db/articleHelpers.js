const axios = require('axios');
const extractor = require('unfluff');
const Article = require('./schemas.js').Article;
const sources = require('./data/sources.js');
require('dotenv').config();
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

// fetches articles from news API, outputs [{url: 'washingtonpost.com...', articleStance: -0.5, source: 'The Washington Post}]
var getUrlsFromNewsAPI = () => {
  return new Promise((resolve, reject) => {
    newsapi.v2.topHeadlines({
      sources: Object.keys(sources).join(','),
      //ultimately this should be 100
      pageSize: 20,
    })
    .then(response => {
      let articles = [];
      response.articles.forEach(article => {
        let articleObj = {
          url: article.url,
          articleStance: sources[article.source.id],
          source: article.source.name,
        }
        articles.push(articleObj);
      });
      resolve(articles);
    })
    .catch(err => {
      reject(err);
    })
  });
}

var generateArticles = (articles) => {
  return new Promise((resolve, reject) => {
    var promises = articles.map(article => {
      return parseAndDecorateArticle(article);
    }); 
    Promise.all(promises)
    .then(articles => {
      resolve(articles);
    })
    .catch(err => {
      reject(err);
    })
  });
}

var parseAndDecorateArticle = (article) => {
  return new Promise((resolve, reject) => {
    axios.get(article.url)
    .then(response => {
      var webpage = extractor(response.data);
      article.title = webpage.title;
      article.author = webpage.author;
      article.description = webpage.description;
      article.image = webpage.image;
      article.fullText = webpage.text;
      article.votes = {
        agree: {
          summedUserStance: 0,
          totalVotes: 0,
        },
        disagree: {
          summedUserStance: 0,
          totalVotes: 0,
        },
        fun: {
          summedUserStance: 0,
          totalVotes: 0,
        },
        bummer: {
          summedUserStance: 0,
          totalVotes: 0,
        },
        mean: {
          summedUserStance: 0,
          totalVotes: 0,
        },
        worthyAdversary: {
          summedUserStance: 0,
          totalVotes: 0,
        }
      };
      return article;
    })
    .then(article => {
      resolve(article);
    })
    .catch(err => {
      //reject(err);
      //console.log('error parsing article', article);
    })
  });
}

var insertArticlesIntoArticlesDb = (articles) => {
  articles.forEach(article => {
    if (article.fullText !== "") {
      var newArticle = new Article(article);
      newArticle.save(err => {
        //if (err) console.log(`article already exists in db ${article.url}`);
      });
    } else {
      //console.log('article had no fullText, was not inserted'); 
    }
  });
}

var scrapeArticles = () => {
  getUrlsFromNewsAPI()
  .then(urlList => {
    return generateArticles(urlList);
  })
  .then(articles => {
    insertArticlesIntoArticlesDb(articles);
    console.log('Articles Inserted');
  })
  .catch(err => {
    console.log('error scraping articles');
  })
}

var deleteArticles = () => {
  Article.remove({}, err => {
    if (err) {
      console.error('error deleting articles');
    } else {
      console.log('deleted articles');
    }
  });
}

module.exports = { scrapeArticles, deleteArticles, getUrlsFromNewsAPI, generateArticles, parseAndDecorateArticle, insertArticlesIntoArticlesDb }

