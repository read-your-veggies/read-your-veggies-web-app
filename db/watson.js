var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const Article = require('./schemas.js').Article;
const Source = require('./schemas.js').Source;

var personalityInsights = new PersonalityInsightsV3({
    version: '2017-10-13',
    username: process.env.WATSON_USERNAME,
    password: process.env.WATSON_PASSWORD,
    url: 'https://gateway.watsonplatform.net/personality-insights/api/',
});

var getWatsonProfile = (data) => {
  var profileParams = {
    content: data,
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
}

var insertArticlesIntoSourceDb = () => {
  Article.find({}, (err, res) => {
    if (err) {
      console.log('error finding articles in insertArticlesIntoSourceDb');
    } else {
      var articlesFromDb = res;
      Source.find({}, (err, res) => {
        if (err) {
          console.log('error finding sources in insertArticlesIntoSourceDb');
        } else {
          var articlesBySource = {};
          var existingArticles = {};
          res.forEach(dbSource => {
            var parsedArticles = JSON.parse(dbSource.articles);
            articlesBySource[dbSource.name] = {
              articles: parsedArticles,
              titles: JSON.parse(dbSource.titles),
              fullTexts: JSON.parse(dbSource.fullTexts),
            }
            parsedArticles.forEach(article => {
              existingArticles[article.url] = true;
            })
          });
          // console.log('articlesBysource is', articlesBySource);
          // console.log('existingArticles is', existingArticles);
          articlesFromDb.forEach(article => {
            if (articlesBySource[article.source] === undefined) {
              articlesBySource[article.source] = {
                articles: [],
                titles: [],
                fullTexts: [],
              };
            }
            if (existingArticles[article.url] === undefined) {
              articlesBySource[article.source].articles.push(article);
              articlesBySource[article.source].titles.push({
                content: article.title,
                contenttype: "text/plain",
                language: "en",
              });
              articlesBySource[article.source].fullTexts.push({
                content: article.fullText,
                contenttype: "text/plain",
                language: "en",
              });
            }
          });
          console.log('articlesBysource is', articlesBySource);
          var newSourceData = [];
          for (var source in articlesBySource) {
            newSourceData.push({
              name: source,
              articles: JSON.stringify(articlesBySource[source].articles),
              titles: JSON.stringify(articlesBySource[source].titles),
              fullTexts: JSON.stringify(articlesBySource[source].fullTexts),
            });
          }
          Source.remove({}, err => {
            if (err) {
              console.log('error removing source data');
            } else {
              Source.insertMany(newSourceData, err => {
                if (err) {
                  console.log('error inserting source data');
                } else {
                  console.log('inserted source data');
                }
              });
            }
          })        
        }
      });
    }
  });
}

var getWatsonPersonality = (source, type) => {
  if (!source || !type) {
    console.log('source and type required for getWatsonPersonality');
  } else {
    Source.find({name: source}, (err, res) => {
      if (err) {
        console.log('error finding source in getWatsonPersonality');
      } else {
        var data = {
          "contentItems": JSON.parse(res[0][type][0]),
        };
        getWatsonProfile(data);
      }
    });
  }
}

module.exports = { getWatsonProfile, insertArticlesIntoSourceDb, getWatsonPersonality }

