const expect = require('chai').expect;
const mongoose = require('mongoose');
const schemas = require('../db/schemas');
const articleHelpers = require('../db/articleHelpers.js');
const testDatabasePath = process.env.TEST_DATABASE_PATH || 'mongodb://localhost/testDatabase';

describe('articles', () => {
  
  before(done => {
    mongoose.connect(testDatabasePath);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection to test database error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
  });

  describe('article helpers', () => {
    it('should fetch articles from the News API', done => {
      articleHelpers.getUrlsFromNewsAPI()
      .then(response => {
        expect(Array.isArray(response)).to.be.true;
        expect(response.length).to.not.equal(0);
        done();
      })
      .catch(err => {
        done(err);
      })
    });

    it('should parse a single article', done => { 
      let singleArticle = {
        url: 'https://www.huffingtonpost.com/entry/the-war-on-women-is-already-here_us_5b351c5de4b0b5e692f5dce5',
        articleStance: -1,
        source: 'The Huffington Post',
      } 
      articleHelpers.parseAndDecorateArticle(singleArticle)
      .then(response => {
        expect(response).to.include.all.keys('url', 'articleStance', 'source', 'fullText', 'image', 'description', 'author', 'title', 'votes');
        done();
      })
      .catch(err => {
        done(err);
      })
    });

    it('should generate articles from data fetched from the API', done => {
      let articleList = [
        {
          url: 'https://www.huffingtonpost.com/entry/the-war-on-women-is-already-here_us_5b351c5de4b0b5e692f5dce5',
          articleStance: -1,
          source: 'The Huffington Post',
        },
        {
          url: 'https://www.huffingtonpost.com/entry/huffpost-hate-mail_us_5b366d29e4b007aa2f7fb127',
          articleStance: -1,
          source: 'The Huffington Post',
        },
      ];
      articleHelpers.generateArticles(articleList)
      .then(response => {
        expect(response.length).to.equal(2);
        done();
      })
      .catch(err => {
        done(err);
      })
    });
  });

  describe('articlesDb', () => {
    beforeEach(done => {
      schemas.Article.remove({})
      .then(() => {
        done();
      })
      .catch(err => {
        done(err);
      });
    });

    let articleList = [
      {
        url: 'https://www.huffingtonpost.com/entry/the-war-on-women-is-already-here_us_5b351c5de4b0b5e692f5dce5',
        articleStance: -1,
        source: 'The Huffington Post',
        fullText: 'this is full text',
      },
      {
        url: 'https://www.huffingtonpost.com/entry/huffpost-hate-mail_us_5b366d29e4b007aa2f7fb127',
        articleStance: 1,
        source: 'The American Conservative',
        fullText: '',
      },
      {
        url: 'https://www.huffingtonpost.com/entry/the-war-on-women-is-already-here_us_5b351c5de4b0b5e692f5dce5',
        articleStance: 1,
        source: 'The American Conservative',
        fullText: 'this is a duplicate',
      },  
    ];

    it('should insert articles into db', done => {
      articleHelpers.insertArticlesIntoArticlesDb(articleList);

      setTimeout(() => {
        schemas.Article.find({})
        .then(response => {
          expect(response.length).to.not.equal(0);
          done()
        })
        .catch(err => {
          done(err);
        });
      }, 1000);
    });

    it('should not insert duplicates or articles with no fullText', done => {
      articleHelpers.insertArticlesIntoArticlesDb(articleList);

      setTimeout(() => {
        schemas.Article.find({})
        .then(response => {
          expect(response.length).to.equal(1);
          done();
        })
        .catch(err => {
          done(err);
        });
      }, 1000);
    });

    it('should scrape articles', done => {
      articleHelpers.scrapeArticles();

      setTimeout(() => {
        schemas.Article.find({})
        .then(response => {
          expect(response.length).to.not.equal(0);
          done();
        })
        .catch(err => {
          done(err);
        })
      }, 20000);   
    }).timeout(22000);
  })
});