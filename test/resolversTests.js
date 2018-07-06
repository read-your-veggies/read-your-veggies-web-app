const expect = require('chai').expect;
// const testDbConn = require('../db/index.js').testDbConn;
// const Articles = testDbConn.collection('articles');
// const Users = testDbConn.collection('users');
// const Sources = testDbConn.collection('sources');
const Article = require('../db/schemas').Article;
const resolvers = require('../db/resolvers.js');

describe('graphQl resolvers', () => {
  describe('queries', () => {
    before(done => {
      let dummyArticle = {
        title: "Test title 1",
        url: "Test url 1",
        votes: {
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
        },
      };

      var newArticle = new Article(dummyArticle);

      newArticle.save()
      .then(() => {
        console.log('dummy article saved');
        done();
      })
      .catch(err => {
        done(err);
      });
          
    //   Article.insertMany(dummyArticles, (err, res) => {
    //    if (err) console.error(err);
    //    Users.insertMany(dummyUsers, (err, res) => {
    //      if (err) console.error(err);
    //      Sources.insertMany(dummySources, (err, res) => {
    //        if(err) console.error(err);
    //        done();
    //      });
    //    })
    //   }) 
    });
   
    after(() => {
      Article.findOneAndRemove({title: 'Test title 1'})
      .then(res => {
        console.log('dummy article removed');
      })
      .catch(err => {
        console.error(err);
      });
    });

    it('returns a message', done => {
      expect(resolvers.Query.message()).to.equal('Hello From GraphQL Server!');
      done();
    });

    // it('returns all articles', async function(done) {
    //   var result = await resolvers.Query.articles();
    //   expect(result.length).to.not.equal(0);
    //   done();
    // });

    // it('returns an article by ID', done => {
    //   var result = resolvers.Query.articles({_id: '5b3e6d1e8fe1e57dccd7dc83'})
    //   expect(result.title).to.equal('Perks, pestering, power, putdowns');
    //   done();
    // });

    it('updates article votes', done => {
      var id;
      Article.findOne({title: "Test title 1"})
      .then(async (res) => {
        id = res._id;
        await resolvers.Mutation.updateArticleVotes(null, {_id: id, userStance: 0.5, votes: {agree: true, fun: true}});
        return;
      })
      .then(() => {
        Article.findOne({title: "Test title 1"})
        .then(article => {
          var expected = {
            agree: {
              summedUserStance: 0.5,
              totalVotes: 1,
            },
            disagree: {
              summedUserStance: 0,
              totalVotes: 0,
            },
            fun: {
              summedUserStance: 0.5,
              totalVotes: 1,
            },
            bummer: {
              summedUserStance: 0,
              totalVotes: 0,
            },
          }
          expect(article.votes).to.eql(expected);
          done();
        })
        .catch(err => {
          done(err);
        })
      })
      .catch(err => {
        done(err);
      })
    })
  })

})