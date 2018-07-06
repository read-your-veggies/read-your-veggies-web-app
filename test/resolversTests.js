const expect = require('chai').expect;
// const testDbConn = require('../db/index.js').testDbConn;
// const Articles = testDbConn.collection('articles');
// const Users = testDbConn.collection('users');
// const Sources = testDbConn.collection('sources');
const User = require('../db/schemas.js').User;
const Article = require('../db/schemas.js').Article;
const resolvers = require('../db/resolvers.js');

describe('graphQl resolvers', () => {
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

    let dummyUser = {
      name: 'Test user',
      completed_articles: JSON.stringify({
        1: dummyArticle
      }),
      health: 10,
      onboard_stance: -0.5,
      locPolRatio: -0.7,
      homePolRatio: 0.1,
      browsing_history_stance: [-0.2, 10],
      reading_stance: [0.5, 9],
      user_stance: -0.3,
    }

    var newArticle = new Article(dummyArticle);
    var newUser = new User(dummyUser);

    newArticle.save()
    .then(() => {
      console.log('dummy article saved');
      newUser.save()
      .then(() => {
        console.log('dummy user saved');
        done();
      })
      .catch(err => {
        done(err);
      })
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
    .then(() => {
      console.log('dummy article removed');
      User.findOneAndRemove({name: 'Test user'})
      .then(() => {
        console.log('dummy user removed');
      })
      .catch(err => {
        console.error(err);
      })
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
        var expected = JSON.stringify({
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
        });
        expect(JSON.stringify(article.votes)).to.equal(expected);
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

  it('updates user votes', done => {
    var id;
    User.findOne({name: "Test user"})
    .then(async (res) => {
      id = res._id;    
      let newArticle = JSON.stringify({
        2: {
          userStance: -0.3,
          articleStance: 1,
          votes: {
            fun: true,
            agree: true,
            bummer: false,
            disagree: false,
          },
          nutritionalValue: 5,
        }
      })
      await resolvers.Mutation.updateUserVotes(null, {_id: id, completed_articles: newArticle});
      return;
    })
    .then(() => {
      User.findOne({name: "Test user"})
      .then(user => {
        var completedArticles = Object.keys(JSON.parse(user.completed_articles));
        expect(completedArticles.length).to.equal(2);
        expect(user.health).to.equal(15);
        expect(user.reading_stance).to.eql([0.515, 10]);
        expect(user.user_stance).to.equal(-0.2985);
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