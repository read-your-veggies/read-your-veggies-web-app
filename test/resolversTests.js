const expect = require('chai').expect;
const User = require('../db/schemas.js').User;
const Article = require('../db/schemas.js').Article;
const resolvers = require('../db/resolvers.js');

describe('graphQl resolvers', () => {
  before(done => {
    const dummyArticle = {
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

    const dummyUser = {
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

    const dummyUser2 = {
      name: 'Test user 2',
      locPolRatio: -0.7,
      homePolRatio: 0.1,
      browsing_history_stance: [-0.2, 10],
      reading_stance: [0.5, 9],
      user_stance: -0.1,
    }

    const dummyUser3 = {
      name: 'Test user 3',
      onboard_stance: -0.5,
      locPolRatio: -0.7,
      homePolRatio: 0.1,
      browsing_history_stance: [0, 0],
      reading_stance: [-0.1, 9],
      user_stance: -0.4,
    }

    var newArticle = new Article(dummyArticle);
    var newUser = new User(dummyUser);
    var newUser2 = new User(dummyUser2);
    var newUser3 = new User(dummyUser3);

    newArticle.save()
    .then(() => {
      console.log('dummy article saved');
      newUser.save()
      .then(() => {
        console.log('dummy user saved');
        newUser2.save()
        .then(() => {
          console.log('dummy user 2 saved');
          newUser3.save()
          .then(() => {
            console.log('dummy user 3 saved');
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
      .catch(err => {
        done(err);
      })
    })
    .catch(err => {
      done(err);
    });
  });
  
  after(() => {
    Article.findOneAndRemove({title: 'Test title 1'})
    .then(() => {
      console.log('dummy article removed');
      User.findOneAndRemove({name: 'Test user'})
      .then(() => {
        console.log('dummy user removed');
        User.findOneAndRemove({name: 'Test user 2'})
        .then(() => {
          console.log('dummy user 2 removed');
          User.findOneAndRemove({name: 'Test user 3'})
          .then(() => {
            console.log('dummy user 3 removed');
          })
          .catch(err => {
            console.error(err);
          })
        })
        .catch(err => {
          console.error(err);
        })
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

  it('onboards user', done => {
    var id;
    var onboardInfo = JSON.stringify({
      stanceSlider: -100,
      parentSlider: -100,
      veggieSlider: 40,
    });
    User.findOne({name: "Test user 2"})
    .then(async (res) => {
      id = res._id;    
      await resolvers.Mutation.onboardUser(null, {_id: id, onboard_info: onboardInfo});
      return;
    })
    .then(() => {
      User.findOne({name: "Test user 2"})
      .then(user => {
        expect(user.onboard_information).to.equal(onboardInfo);
        expect(user.onboard_stance).to.equal(-1);
        expect(user.user_stance).to.equal(-0.55);
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

  it('updates user browsing stance', done => {
    var id;
    var history = [
      'HuffPost - how to be super liberal',
      'The New York Times - world news',
    ];
    User.findOne({name: "Test user 3"})
    .then(async (res) => {
      id = res._id;    
      await resolvers.Mutation.updateUserBrowsingHistory(null, {_id: id, browsing_history: history});
      return;
    })
    .then(() => {
      User.findOne({name: "Test user 3"})
      .then(user => {
        expect(user.browsing_history_stance).to.eql([-0.75, 2]);
        expect(user.user_stance).to.equal(-0.4699999999999999);
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