const axios = require('axios');
const extractor = require('unfluff');
const Article = require('./schemas.js').Article;
const sourceWeights = require('./data/sourceWeights.js');
require('dotenv').config();

var getUrlsFromNewsAPI = () => {
  return new Promise((resolve, reject) => {
    axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`)
    .then(response => {
      // console.log('news data', response.data)
      let urlList = [];
      response.data.articles.forEach(article => {
        urlList.push(article.url);
      });
      // console.log('time to retrieve the articles');
      // retrieveArticles(urlList);
      return urlList;
    })
    .then(urlList => {
      resolve(urlList);
    })
    .catch(err => {
      reject(err);
    })
  })
}

var getArticlesFromUrls = (urlArray) => {
  return new Promise((resolve, reject) => {
    var promises = urlArray.map(url => {
      return parseArticle(url);
    }); 
    Promise.all(promises)
    .then(articlesArray => {
      resolve(articlesArray);
    })
    .catch(err => {
      reject(err);
    })
  });
}

var getArticleStance = (source) => {
  return sourceWeights[source];
}

var parseArticle = (currArticleUrl) => {
  return new Promise((resolve, reject) => {
    axios.get(currArticleUrl)
    .then(response => {
      var webpage = extractor(response.data);
      var article = {
        url: currArticleUrl,
        title: webpage.title,
        author: webpage.author,
        source: webpage.publisher,
        description: webpage.description,
        fullText: webpage.text,
        votes: {
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
          },
        }  
      }
      //article.articleStance = getArticleStance(article.source);
      resolve(article);  
    })
    .catch(err => {
      reject(err);
    })
  });
}

var decorateArticlesWithStance = (articlesArray) => {
  return new Promise((resolve, reject) => {
    articlesArray.forEach(article => {
      article.articleStance = String(sourceWeights[article.source]);
    });
    resolve(articlesArray);
  })
}

var insertArticlesIntoDb = (articlesArray) => {
  console.log(articlesArray);
  return new Promise((resolve, reject) => {
    Article.insertMany(articlesArray, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  })   
}

var scrapeArticles = () => {
  getUrlsFromNewsAPI()
  .then(urlList => {
    return getArticlesFromUrls(urlList);
  })
  .then(articleList => {
    return decorateArticlesWithStance(articleList);
  })
  .then(decoratedArticleList => {
    insertArticlesIntoDb(decoratedArticleList);
  })
  .catch(err => {
    console.error(err);
  })
}

var deleteArticles = () => {
  Article.remove({}, err => {
    if (err) {
      console.error(err);
    } else {
      console.log('deleted articles');
    }
  });
}

module.exports = { scrapeArticles, deleteArticles }

