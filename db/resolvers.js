//needed to delete by _id
const mongodb = require('mongodb');
const userDbConn = require('./index.js').userDbConn;
const articleDbConn = require('./index.js').articleDbConn;
const sourceDbConn = require('./index.js').sourceDbConn;
const Articles = articleDbConn.collection('articles');
const Users = userDbConn.collection('users');
const Sources = sourceDbConn.collection('sources');
const helpers = require('./data/helpers.js');

const prepare = (object) => {
  object._id = object._id.toString();
  return object;
}

module.exports = {
  Query: {
    message: () => 'Hello From GraphQL Server!',
    articles: async () => {
      return (await Articles.find({}).sort({'timestamp': -1}).limit(20).toArray()).map(prepare);    
    },
    article: async (root, {_id}) => {
      return prepare(await Articles.findOne(new mongodb.ObjectID(_id)));
    },
    user: async (root, {_id}) => {
      return prepare(await Users.findOne(new mongodb.ObjectID(_id)));
    },
    sources: async () => {
      return (await Sources.find({}).toArray()).map(prepare);
    },
    source: async (root, {name}) => {
      return prepare(await Sources.findOne({name: name}));
    },
  },
  Mutation: {
    // probably should disable this for production:
    createArticle: async (root, args, context, info) => {
      const res = await Articles.insert(args);
      console.log('res is', res);
      return prepare(await Articles.findOne({_id: res.insertedIds[0]}))
    },
    // probably should disable this as well:
    deleteArticles: async () => {
      const res = await Articles.remove({});
      console.log('res is', res);
      return 'deleted';
    },
    //test function to allow client to delete article on click
    deleteArticle: async (root, args, context, info) => {
      console.log('deleting', args._id)
      const res = await Articles.findOneAndDelete({_id: new mongodb.ObjectID(args._id)});
      console.log(res);
      return res.value;
    },

    // We need to have this update the summed user stance fields as well.
    updateArticleVotes: async (root, args) => {
      // We need to know the state of the current votes before we can update them.
      let currentState = prepare(await Articles.findOne(new mongodb.ObjectID(args._id)));
      
      // Take the current state and update the vote fields as necessary.
      for (var key in currentState.votes) {
        if (args.votes[key]) {
          currentState.votes[key].totalVotes++;
          currentState.votes[key].summedUserStance += args.userStance;
        }
      }

      // Pass the updated votes object back into the database.
      const res = await Articles.findOneAndUpdate(
        {_id: new mongodb.ObjectID(args._id)}, 
        {$set: {votes: currentState.votes }}, 
        {returnOriginal:false}
      );
      return res.value;
    },

    updateUserVotes: async (root, args) => {
      
      let userDocument = prepare(await Users.findOne(new mongodb.ObjectID(args._id)));
      let previouslyCompletedArticles = JSON.parse(userDocument.completed_articles);
      let currentReadingStance = userDocument.reading_stance;
      
      let incomingArticle = JSON.parse(args.completed_articles);
      let incomingArticleKey = Object.keys(incomingArticle)[0];

      previouslyCompletedArticles[incomingArticleKey] = incomingArticle[incomingArticleKey];
      
      var updatedReadingStance = helpers.calculateUserReadingStance(currentReadingStance, incomingArticle[incomingArticleKey]);

      var aggregates = {
        onboardingStance: userDocument.onboard_stance,
        localPolStance: userDocument.locPolRatio,
        homePolStance: userDocument.homePolRatio,
        browsingStance: userDocument.browsing_history_stance,
        readingStance: updatedReadingStance,
      }
      var updatedAggregateStance = helpers.calculateUserAggregateStance(aggregates);
      
      const res = await Users.findOneAndUpdate(
        {_id: new mongodb.ObjectID(args._id)}, 
        {$set: {
          completed_articles: JSON.stringify(previouslyCompletedArticles),
          reading_stance: updatedReadingStance,
          user_stance: updatedAggregateStance,
          health: userDocument.health + incomingArticle[incomingArticleKey].nutritionalValue,
          }
        }, 
        {returnOriginal:false}
      );
      
      return res.value
    },

    // updateUserHealth: async (root, args) => {
    //   let oldHealth = await Users.findOne({_id: new mongodb.ObjectID(args._id)});
    //   if (!oldHealth) oldHealth = 0;
    //   let newHealth = oldHealth.health + args.new_health;
    //   const res = await Users.findOneAndUpdate({_id: new mongodb.ObjectID(args._id)},{$set:{health: newHealth}}, {returnOriginal:false});
    //   return res.value;
    // },

    onboardUser: async (root, args) => {
      let userDocument = prepare(await Users.findOne(new mongodb.ObjectID(args._id)));

      var onboardStance = helpers.calculateUserOnboardStance(args.onboard_info);

      var aggregates = {
        onboardingStance: onboardStance,
        localPolStance: userDocument.locPolRatio,
        homePolStance: userDocument.homePolRatio,
        browsingStance: userDocument.browsing_history_stance,
        readingStance: userDocument.reading_stance,
      }
      var updatedAggregateStance = helpers.calculateUserAggregateStance(aggregates);

      const res = await Users.findOneAndUpdate(
        {_id: new mongodb.ObjectID(args._id)}, 
        {$set: {
          onboard_information: args.onboard_info,
          onboard_stance: onboardStance,
          user_stance: updatedAggregateStance,
          }
        }, 
        {returnOriginal:false}
      );
      
      return res.value;
    },

    updateUserBrowsingHistory: async (root, args) => {
      const userDocument = prepare(await Users.findOne(new mongodb.ObjectID(args._id)));
      const incomingBrowsingHistory = args.browsing_history.filter((item) => item !== '');
      
      var updatedBrowsingHistoryStance = helpers.calculateUserBrowsingStance(incomingBrowsingHistory, userDocument.browsing_history_stance);

      var aggregates = {
        onboardingStance: userDocument.onboard_stance,
        localPolStance: userDocument.locPolRatio,
        homePolStance: userDocument.homePolRatio,
        browsingStance: updatedBrowsingHistoryStance,
        readingStance: userDocument.reading_stance,
      }
      var updatedAggregateStance = helpers.calculateUserAggregateStance(aggregates);

      const res = await Users.findOneAndUpdate(
        {_id: new mongodb.ObjectID(args._id)}, 
        {$set: {
          browsing_history_stance: updatedBrowsingHistoryStance,
          user_stance: updatedAggregateStance,
          }
        }, 
        {returnOriginal:false}
      );
      
      return res.value;
    }
  }
}