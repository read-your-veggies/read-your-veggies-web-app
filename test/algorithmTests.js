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