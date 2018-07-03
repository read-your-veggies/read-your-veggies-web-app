const expect = require('chai').expect;
const helpers = require('../db/data/calculateUserStance.js');
const testDatabasePath = process.env.TEST_DATABASE_PATH || 'mongodb://localhost/testDatabase';

describe('helpers', () => {
  describe('calculateUserOnboardStance', () => {
    it('onboards a liberal who agrees with his parents', done => {
      var onboardString = JSON.stringify({
        stanceSlider: -50,
        parentSlider: 50,
      });
      var stance = helpers.calculateUserOnboardStance(onboardString);
      expect(stance).to.equal(-0.25); 
      done();
    })

    it('onboards a liberal who disagrees with his parents', done => {
      var onboardString = JSON.stringify({
        stanceSlider: -50,
        parentSlider: -50,
      });
      var stance = helpers.calculateUserOnboardStance(onboardString);
      expect(stance).to.equal(-0.25);
      done();
    })

    it('onboards a conservative who agrees with his parents', done => {
      var onboardString = JSON.stringify({
        stanceSlider: 100,
        parentSlider: 100,
      });
      var stance = helpers.calculateUserOnboardStance(onboardString);
      expect(stance).to.equal(1); 
      done();
    })

    it('onboards a conservative who disagrees with his parents', done => {
      var onboardString = JSON.stringify({
        stanceSlider: 100,
        parentSlider: -50,
      });
      var stance = helpers.calculateUserOnboardStance(onboardString);
      expect(stance).to.equal(0.5); 
      done();
    })
  })

  describe('calculateUserReadingStance', () => {
    it('conservative reader likes liberal article, 2 votes', done => {
      //reading stance of 0, 10 articles read
      var currentStance = [0, 9];
      var newArticle = {
        userStance: 1,
        articleStance: -1,
        votes: {
          fun: true,
          agree: true,
          bummer: false,
          disagree: false,
        }
      }
      var readingStance = helpers.calculateUserReadingStance(currentStance, newArticle);
      expect(readingStance).to.eql([-0.1, 10]);
      done();
    })

    it('conservative reader likes liberal article, 1 vote', done => {
      //reading stance of 0, 10 articles read
      var currentStance = [0, 9];
      var newArticle = {
        userStance: 1,
        articleStance: -1,
        votes: {
          fun: true,
          agree: false,
          bummer: false,
          disagree: false,
        }
      }
      var readingStance = helpers.calculateUserReadingStance(currentStance, newArticle);
      expect(readingStance).to.eql([-0.05, 10]);
      done();
    })

    it('liberal reader likes conservative article, 2 votes', done => {
      var currentStance = [0, 9];
      var newArticle = {
        userStance: -1,
        articleStance: 1,
        votes: {
          fun: true,
          agree: true,
          bummer: false,
          disagree: false,
        }
      }
      var readingStance = helpers.calculateUserReadingStance(currentStance, newArticle);
      expect(readingStance).to.eql([0.1, 10]);
      done();
    })

    it('liberal reader likes conservative article, 1 vote', done => {
      var currentStance = [0, 9];
      var newArticle = {
        userStance: -1,
        articleStance: 1,
        votes: {
          fun: true,
          agree: false,
          bummer: false,
          disagree: false,
        }
      }
      var readingStance = helpers.calculateUserReadingStance(currentStance, newArticle);
      expect(readingStance).to.eql([0.05, 10]);
      done();
    })

    it('moderately liberal reader likes moderately conservative article', done => {
      var currentStance = [0, 9];
      var newArticle = {
        userStance: -0.5,
        articleStance: 0.5,
        votes: {
          fun: true,
          agree: true,
          bummer: false,
          disagree: false,
        }
      }
      var readingStance = helpers.calculateUserReadingStance(currentStance, newArticle);
      expect(readingStance).to.eql([0.05, 10]);
      done();
    })

    it('moderately conservative reader likes moderately liberal article', done => {
      var currentStance = [0, 9];
      var newArticle = {
        userStance: 0.5,
        articleStance: -0.5,
        votes: {
          fun: true,
          agree: true,
          bummer: false,
          disagree: false,
        }
      }
      var readingStance = helpers.calculateUserReadingStance(currentStance, newArticle);
      expect(readingStance).to.eql([-0.05, 10]);
      done();
    })

    it('liberal reader dislikes liberal article', done => {
      var currentStance = [0, 9];
      var newArticle = {
        userStance: -0.5,
        articleStance: -1,
        votes: {
          fun: false,
          agree: false,
          bummer: true,
          disagree: true,
        }
      }
      var readingStance = helpers.calculateUserReadingStance(currentStance, newArticle);
      expect(readingStance).to.eql([0.025, 10]);
      done();
    })

    it('conservative reader dislikes conservative article', done => {
      var currentStance = [0, 9];
      var newArticle = {
        userStance: 0.5,
        articleStance: 1,
        votes: {
          fun: false,
          agree: false,
          bummer: true,
          disagree: true,
        }
      }
      var readingStance = helpers.calculateUserReadingStance(currentStance, newArticle);
      expect(readingStance).to.eql([-0.025, 10]);
      done();
    })

    it('liberal reader dislikes conservative article', done => {
      var currentStance = [0, 9];
      var newArticle = {
        userStance: -0.5,
        articleStance: 0.5,
        votes: {
          fun: false,
          agree: false,
          bummer: true,
          disagree: true,
        }
      }
      var readingStance = helpers.calculateUserReadingStance(currentStance, newArticle);
      expect(readingStance).to.eql([-0.05, 10]);
      done();
    })

    it('conservative reader dislikes liberal article', done => {
      var currentStance = [0, 9];
      var newArticle = {
        userStance: 0.5,
        articleStance: -0.5,
        votes: {
          fun: false,
          agree: false,
          bummer: true,
          disagree: true,
        }
      }
      var readingStance = helpers.calculateUserReadingStance(currentStance, newArticle);
      expect(readingStance).to.eql([0.05, 10]);
      done();
    })

    it('neutral reader likes liberal article, 2 votes', done => {
      var currentStance = [0, 9];
      var newArticle = {
        userStance: 0,
        articleStance: -1,
        votes: {
          fun: true,
          agree: true,
          bummer: false,
          disagree: false,
        }
      }
      var readingStance = helpers.calculateUserReadingStance(currentStance, newArticle);
      expect(readingStance).to.eql([-0.05, 10]);
      done();
    })

    it('neutral reader dislikes liberal article, 1 vote', done => {
      var currentStance = [0, 9];
      var newArticle = {
        userStance: 0,
        articleStance: -1,
        votes: {
          fun: false,
          agree: false,
          bummer: false,
          disagree: true,
        }
      }
      var readingStance = helpers.calculateUserReadingStance(currentStance, newArticle);
      expect(readingStance).to.eql([0.025, 10]);
      done();
    })

    it('neutral reader likes conservative article, 2 votes', done => {
      var currentStance = [0, 9];
      var newArticle = {
        userStance: 0,
        articleStance: 1,
        votes: {
          fun: true,
          agree: true,
          bummer: false,
          disagree: false,
        }
      }
      var readingStance = helpers.calculateUserReadingStance(currentStance, newArticle);
      expect(readingStance).to.eql([0.05, 10]);
      done();
    })

    it('neutral reader likes conservative article, 1 vote', done => {
      var currentStance = [0, 9];
      var newArticle = {
        userStance: 0,
        articleStance: 1,
        votes: {
          fun: true,
          agree: false,
          bummer: false,
          disagree: false,
        }
      }
      var readingStance = helpers.calculateUserReadingStance(currentStance, newArticle);
      expect(readingStance).to.eql([0.025, 10]);
      done();
    })
  })
})

describe('graphQl resolvers', () => {
  before(done => {
    mongoose.connect(testDatabasePath);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection to test database error'));
    db.once('open', function() {
      console.log('Connected to test database for Watson test');
      done();
    });
  });

  describe('onboarding', () => {

  })

})