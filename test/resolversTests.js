const expect = require('chai').expect;
const helpers = require('../db/data/calculateUserStance.js');
const testDatabasePath = process.env.TEST_DATABASE_PATH || 'mongodb://localhost/testDatabase';

describe('graphQl resolvers', () => {
  before(done => {
    mongoose.connect(testDatabasePath);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection to test database error'));
    db.once('open', function() {
      console.log('Connected to test database for graphQl resolvers tests');
      done();
    });
  });

  describe('onboarding', () => {
    
  })

})