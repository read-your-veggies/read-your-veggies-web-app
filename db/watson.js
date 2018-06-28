var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const Article = require('./schemas.js').Article;
const Source = require('./schemas.js').Source;

var personalityInsights = new PersonalityInsightsV3({
    version: '2017-10-13',
    username: process.env.WATSON_USERNAME,
    password: process.env.WATSON_PASSWORD,
    url: 'https://gateway.watsonplatform.net/personality-insights/api/',
});

var getWatsonProfile = (data, callback) => {
  var profileParams = {
    content: data,
    content_type: 'application/json',
    consumption_preferences: true,
    raw_scores: true
  };
  personalityInsights.profile(profileParams, function(error, profile) {
    if (error) {
      console.log(error);
      callback(error, null);
    } else {
      callback(null, JSON.stringify(profile, null, 2));
    }
  });
}

var buildArticlesBySource = (sources) => {
  var articlesBySource = {};
  sources.forEach(dbSource => {
    articlesBySource[dbSource.name] = {
      articles: JSON.parse(dbSource.articles),
      titles: JSON.parse(dbSource.titles),
      fullTexts: JSON.parse(dbSource.fullTexts),
    }
  });
  return articlesBySource;
}

var buildExistingArticles = (sources) => {
  var existingArticles = {};
  sources.forEach(source => {
    source.articles.forEach(article => {
      existingArticles[article.url] = true;
    });
  });
  return existingArticles;
}

var addNewArticles = (articlesBySource, existingArticles, articlesArray) => {
  articlesArray.forEach(article => {
    if (articlesBySource[article.source] === undefined) {
      articlesBySource[article.source] = {
        articles: [],
        titles: [],
        fullTexts: [],
        titlesPersonality: "",
        fullTextsPersonality: "",
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

  return articlesBySource;
}

var buildNewSourceData = (articlesBySource) => {
  var newSourceData = [];
  for (var source in articlesBySource) {
    newSourceData.push({
      name: source,
      articles: JSON.stringify(articlesBySource[source].articles),
      titles: JSON.stringify(articlesBySource[source].titles),
      fullTexts: JSON.stringify(articlesBySource[source].fullTexts),
      titlesPersonality: articlesBySource[source].titlesPersonality,
      fullTextsPersonality: articlesBySource[source].fullTextsPersonality,
    });
  }
  return newSourceData;
}

var updateSourcesDb = () => {
  Article.find({})
  .then(articles => {
    Source.find({})
    .then(sources => {
      var existingArticles = buildExistingArticles(sources);
      var articlesBySource = buildArticlesBySource(sources);
      var newArticlesObj = addNewArticles(articlesBySource, existingArticles, articles); 
      var newSourceData = buildNewSourceData(newArticlesObj);
      return newSourceData;
    })
    .then(newSourceData => {
      Source.remove({})
      .then(() => {
        Source.insertMany(newSourceData);
        console.log('updated sources db');
      })
      .catch(err => {
        console.log('error inserting new source data in updateSourcesDb');
      })
    })
    .catch(err => {
      console.log('error finding sources in updateSourcesDb');
    })
  })
  .catch(err => {
    console.log('error finding articles in updateSourcesDb');
  })
}

var updateSinglePersonality = (sourceName, type) => {
  if (!sourceName || !type) {
    console.log('source and type required for getWatsonPersonality');
  } else {
    Source.find({name: sourceName})
    .then(source => {
      var data = {
        "contentItems": JSON.parse(source[0][type][0]),
      };
      getWatsonProfile(data, (err, personality) => {
        if (err) {
          console.log('error accessing Watson');
        } else {
          var queryString = `${type}Personality`;
          Source.updateOne({name: sourceName}, {[queryString]: personality})
          .then(res => {
            console.log(`updated personality for ${sourceName}, ${type}`);
          })
          .catch(err => {
            console.log('error updating source');
          })       
        }
      });
    })
    .catch(err => {
      console.log('error finding source in getWatsonPersonality');
    });
  }
}

var updateAllPersonalities = () => {
  Source.find({}, 'name')
  .then(sourceNames => {
    sourceNames.forEach(source => {
      updateWatsonPersonality(source.name, 'fullTexts');
      updateWatsonPersonality(source.name, 'titles');
    });
  })
  .catch(err => {
    console.error(err);
  })
}

module.exports = { getWatsonProfile, updateSourcesDb, updateSinglePersonality, updateAllPersonalities }

