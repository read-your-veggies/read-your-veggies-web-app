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
          return prepare(await Posts.findOne(ObjectId(_id)));
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
          const res = await Articles.deleteOne({_id: new mongodb.ObjectID(args._id)});
          return res;
        },
        createComment: async (root, args) => {
          const res = await Comments.insert(args)
          return prepare(await Comments.findOne({_id: res.insertedIds[0]}))
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