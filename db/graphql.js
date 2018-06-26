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
    const Posts = db.collection('posts');
    const Comments = db.collection('comments');
    const Articles = db.collection('articles');
    const Users = db.collection('users');

    const resolvers = {
      Query: {
        post: async (root, {_id}) => {
          return prepare(await Posts.findOne(new mongodb.ObjectID(_id)));
        },
        posts: async () => {
          return (await Posts.find({}).toArray()).map(prepare);
        },
        comment: async (root, {_id}) => {
          return prepare(await Comments.findOne(ObjectId(_id)));
        },
        message: () => 'Hello From GraphQL Server!',
        articles: async () => {
          return (await Articles.find({}).toArray()).map(prepare);
        },
        article: async (root, {_id}) => {
          return prepare(await Articles.findOne(new mongodb.ObjectID(_id)));
        },
        user: async (root, {_id}) => {
          return prepare(await Users.findOne(new mongodb.ObjectID(_id)));
        },
      },
      Post: {
        comments: async ({_id}) => {
          return (await Comments.find({postId: _id}).toArray()).map(prepare)
        }
      },
      Comment: {
        post: async ({postId}) => {
          return prepare(await Posts.findOne(ObjectId(postId)))
        }
      },
      Mutation: {
        createPost: async (root, args, context, info) => {
          const res = await Posts.insert(args);
          console.log('res is', res);
          return prepare(await Posts.findOne({_id: res.insertedIds[0]}))
        },
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
          console.log(args._id)
          const res = await Articles.findOneAndDelete({_id: new mongodb.ObjectID(args._id)});
          console.log(res);
          return res.value;
        },
        createComment: async (root, args) => {
          const res = await Comments.insert(args)
          return prepare(await Comments.findOne({_id: res.insertedIds[0]}))
        },
        onboardUser: async (root, args) => {
          const res = await Users.findOneAndUpdate({_id: new mongodb.ObjectID(args._id)}, {onboard_information: args.onboard_info});
          console.log(res);
          return res.value;
        }
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