const axios = require('axios');
const extractor = require('unfluff');
const Article = require('./schemas.js').Article;
const sources = require('./data/sources.js');
require('dotenv').config();
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

var personalityInsights = new PersonalityInsightsV3({
    version_date: '2017-10-13',
    username: process.env.WATSON_USERNAME,
    password: process.env.WATSON_PASSWORD,
    url: 'https://gateway-fra.watsonplatform.net/personality-insights/api'
});

var getUrlsFromNewsAPI = () => {
  return new Promise((resolve, reject) => {
    newsapi.v2.topHeadlines({
      // category: 'politics',
      // language: 'en',
      // country: 'us'
      sources: Object.keys(sources).join(','),
      pageSize: 50,
    }).then(response => {
      console.log('response.articles is', response.articles);
      let articles = [];
      response.articles.forEach(article => {
        let articleObj = {
          url: article.url,
          articleStance: sources[article.source.id],
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
      article.source = webpage.publisher;
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
      return modifyArticleStance(article);
    })
    .then(decoratedArticle => {
      resolve(decoratedArticle);
    })
    .catch(err => {
      //reject(err);
      console.error(err);
    })
  });
}

var modifyArticleStance = (article) => {
  return new Promise((resolve, reject) => {
    console.log(article.articleStance);
    // hit watson
    console.log(personalityInsights);
    var profileParams = {
      // Get the content from the JSON file.
      content: JSON.stringify({
        contentItems: [
          {
            content: article.fullText,
            contenttype: 'text/plain',
            language: 'en',
          }
        ]
      }),
      content_type: 'application/json',
      consumption_preferences: true,
      raw_scores: true
    };
    
    personalityInsights.profile(profileParams, function(error, profile) {
      if (error) {
        console.log(error);
      } else {
        console.log(JSON.stringify(profile, null, 2));
      }
    });
    resolve(article);
  });
}

var insertArticlesIntoDb = (articles) => {
  return new Promise((resolve, reject) => {
    Article.insertMany(articles, (err) => {
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
    return generateArticles(urlList);
  })
  .then(articles => {
    insertArticlesIntoDb(articles);
    console.log('Articles Inserted');
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

