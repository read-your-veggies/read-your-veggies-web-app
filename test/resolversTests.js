const expect = require('chai').expect;
const testDbConn = require('../db/index.js').testDbConn;
const Articles = testDbConn.collection('articles');
const Users = testDbConn.collection('users');
const Sources = testDbConn.collection('sources');
const resolvers = require('../db/resolvers.js');

describe('graphQl resolvers', () => {
  before(done => {
   let dummyArticles = [
     {
      _id: 1,
      title: "Test title 1",
      url: "Test url 1",
     },
     {
      _id: 2,
      title: "Test title 2",
      url: "Test url 2",
     },
   ];
   let dummyUsers = [
     {
       _id: 3,
       name: "Chuck",
     },
     {
       _id: 4,
       name: "Phil",
     }
   ];
   let dummySources = [
     {
       _id: 5,
       name: "Test source 1",
     },
     {
       _id: 6,
       name: "Test source 2",
     }
   ];
   Articles.insertMany(dummyArticles, (err, res) => {
    if (err) console.error(err);
    Users.insertMany(dummyUsers, (err, res) => {
      if (err) console.error(err);
      Sources.insertMany(dummySources, (err, res) => {
        if(err) console.error(err);
        done();
      });
    })
   }) 
  });

  after(() => {
    Articles.remove({});
    Users.remove({});
    Sources.remove({});
  });

  describe('queries', () => {
    it('message', done => {
      expect(resolvers.Query.message()).to.equal('Hello From GraphQL Server!');
      done();
    });

    it('message', done => {
      expect(resolvers.Query.articles()).to.equal('Hello From GraphQL Server!');
      done();
    });
  })

})