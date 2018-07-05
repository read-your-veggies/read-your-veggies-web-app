const expect = require('chai').expect;
const helpers = require('../db/data/helpers.js');

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

    it('handles pre-existing stances', done => {
      var currentStance = [0.5, 9];
      var newArticle = {
        userStance: -0.5,
        articleStance: 1,
        votes: {
          fun: true,
          agree: true,
          bummer: false,
          disagree: false,
        }
      }
      var readingStance = helpers.calculateUserReadingStance(currentStance, newArticle);
      expect(readingStance).to.eql([0.525, 10]);
      done();
    })
  })

  describe('calculateUserBrowsingStance', () => {
    it('liberal reader reads liberal sites', done => {
      var currentStance = [-0.5, 8];
      var history = [ 'The New York Times - Breaking News', 'Trump Administration Reverses Obama on Affirmative Action - The New York Times' ];
      var stance = helpers.calculateUserBrowsingStance(history, currentStance);
      expect(stance).to.eql([-0.5, 10]);
      done();
    })

    it('liberal reader reads conservative sites', done => {
      var currentStance = [-0.5, 8];
      var history = [ 'Breitbart News Network', 'National Review' ];
      var stance = helpers.calculateUserBrowsingStance(history, currentStance);
      expect(stance).to.eql([-0.2, 10]);
      done();
    })

    it('conservative reader reads liberal sites', done => {
      var currentStance = [0.5, 8];
      var history = [ 'The New York Times - Breaking News', 'Trump Administration Reverses Obama on Affirmative Action - The New York Times' ];
      var stance = helpers.calculateUserBrowsingStance(history, currentStance);
      expect(stance).to.eql([0.3, 10]);
      done();
    })

    it('conservative reader reads conservative sites', done => {
      var currentStance = [0.5, 8];
      var history = [ 'Breitbart News Network', 'National Review' ];
      var stance = helpers.calculateUserBrowsingStance(history, currentStance);
      expect(stance).to.eql([0.6, 10]);
      done();
    })

    it('ignores non-news sites', done => {
      var currentStance = [-0.5, 8];
      var history = [ 'The New York Times - Breaking News', 'Google Keep', 'Trump Administration Reverses Obama on Affirmative Action - The New York Times' ];
      var stance = helpers.calculateUserBrowsingStance(history, currentStance);
      expect(stance).to.eql([-0.5, 10]);
      done();
    })

    it('does not exceed -1', done => {
      var currentStance = [-1, 8];
      var history = [ 'HuffPost' ];
      var stance = helpers.calculateUserBrowsingStance(history, currentStance);
      expect(stance).to.eql([-1, 9]);
      done();
    })

    it('does not exceed 1', done => {
      var currentStance = [1, 8];
      var history = [ 'Fox News' ];
      var stance = helpers.calculateUserBrowsingStance(history, currentStance);
      expect(stance).to.eql([1, 9]);
      done();
    })
  })

  describe('calculateAggregateStance', () => {
    it('calculates aggregate stance', done => {
      var aggregates = {
        onboardingStance: -0.5,
        localPolStance: -0.7,
        homePolStance: 0.1,
        browsingStance: [-0.2, 10],
        readingStance: [0.8, 10],
      }
      var stance = helpers.calculateUserAggregateStance(aggregates);
      expect(stance).to.equal(-0.27);
      done();
    })

    it('is unaffected by a missing value', done => {
      var aggregates = {
        onboardingStance: -0.5,
        localPolStance: -0.7,
        homePolStance: 0.1,
        browsingStance: [-0.2, 10],
      }
      var stance = helpers.calculateUserAggregateStance(aggregates);
      expect(stance).to.equal(-0.35);
      done();
    })
  })
})