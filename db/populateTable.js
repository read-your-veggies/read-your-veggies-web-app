var dummy = require('./dummyData.json');
var Article = require('./ArticleSchema.js');
var conn = require('./index.js').connectToDb;

// console.log(dummy);

dummy.forEach( (article) => {
  Article.create(article, (err, result) => {
      if (err) {
          console.log(err);
      } else {
        console.log('Articles saved to db');
      }
  })
});