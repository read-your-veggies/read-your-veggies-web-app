var makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const db = require('./index.js').db;
typeDefs = require('./typeDefs.js');
//needed to delete by _id
const mongodb = require('mongodb');

const prepare = (object) => {
  object._id = object._id.toString();
  return object;
}

const getGraphQlSchema = async () => {
  try {
    const Articles = db.collection('articles');
    const Users = db.collection('users');
    const Sources = db.collection('sources');

    const resolvers = {
      Query: {
        message: () => 'Hello From GraphQL Server!',
        articles: async () => {
          return (await Articles.find({}).toArray()).map(prepare);
        },
        article: async (root, {_id}) => {
          return prepare(await Articles.findOne(new mongodb.ObjectID(_id)));
        },
        user: async (root, {_id}) => {
          console.log(_id);
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

        updateArticleVotes: async (root, args) => {
          let currentState = prepare(await Articles.findOne(new mongodb.ObjectID(args._id)));
          
          for (var key in currentState.votes) {
            if (args.votes[key]) {
              currentState.votes[key].totalVotes++
            }
          }
          const res = await Articles.findOneAndUpdate(
            {_id: new mongodb.ObjectID(args._id)}, 
            {$set: {votes: currentState.votes }}, 
            {returnOriginal:false}
          );
          return res.value;
        },

        updateUserVotes: async (root, args) => {
          let previouslyCompletedArticles = JSON.parse(prepare(await Users.findOne(new mongodb.ObjectID(args._id))).completed_articles);
          console.log('previous')
          console.log(JSON.stringify(previouslyCompletedArticles));
          let incomingArticle = JSON.parse(args.completed_articles);
          console.log('incoming')
          console.log(JSON.stringify(incomingArticle));
          let incomingArticleKey = Object.keys(incomingArticle)[0];
          console.log('incoming key')
          console.log(incomingArticleKey);
          previouslyCompletedArticles[incomingArticleKey] = incomingArticle[incomingArticleKey];
          console.log('updated')
          console.log(JSON.stringify(previouslyCompletedArticles));

          const res = await Users.findOneAndUpdate(
            {_id: new mongodb.ObjectID(args._id)}, 
            {$set: {completed_articles: JSON.stringify(previouslyCompletedArticles) }}, 
            {returnOriginal:false}
          );
          return res.value
        },

        updateUserHealth: async (root, args) => {
          let oldHealth = await Users.findOne({_id: new mongodb.ObjectID(args._id)});
          if (!oldHealth) oldHealth = 0;
          let newHealth = oldHealth.health + args.new_health;
          const res = await Users.findOneAndUpdate({_id: new mongodb.ObjectID(args._id)},{$set:{health: newHealth}}, {returnOriginal:false});
          return res.value;
        },

        onboardUser: async (root, args) => {
          const res = await Users.findOneAndUpdate({_id: new mongodb.ObjectID(args._id)},{$set:{onboard_information: args.onboard_info}}, {returnOriginal:false});
          return res.value;
        },
      }
    }

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });

    return schema;

  } catch (e) {
    console.log(e);
  }
}

module.exports = { getGraphQlSchema }