var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var graphqlExpress = require('graphql-server-express').graphqlExpress;
var graphiqlExpress = require('graphql-server-express').graphiqlExpress;
var makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
var bodyParser = require('body-parser');
var https = require('https');
var fs = require('fs');
var path = require('path');
var requestLogger = require('./utilities.js').requestLogger;
//var express_graphql = require('express-graphql');
//var { buildSchema } = require('graphql');
//const db = require('../db/index.js');
//var cors = require('cors');

var port = process.env.PORT || 5000;

const MONGO_URL = 'mongodb://localhost:27017/readyourveggies';

const prepare = (o) => {
  o._id = o._id.toString()
  return o
}

const start = async () => {
  try {
    // MONGO
    const db = await MongoClient.connect(MONGO_URL);
    const Posts = db.collection('posts');
    const Comments = db.collection('comments');

    // GRAPHQL
    const typeDefs = [`
      type Query {
        post(_id: String): Post
        posts: [Post]
        comment(_id: String): Comment
        message: String
      }

      type Post {
        _id: String
        title: String
        content: String
        comments: [Comment]
      }

      type Comment {
        _id: String
        postId: String
        content: String
        post: Post
      }

      type Mutation {
        createPost(title: String, content: String): Post
        createComment(postId: String, content: String): Comment
      }

      schema {
        query: Query
        mutation: Mutation
      }
    `];

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
        createComment: async (root, args) => {
          const res = await Comments.insert(args)
          return prepare(await Comments.findOne({_id: res.insertedIds[0]}))
        },
      },
    }

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    })

    // SERVER
    const app = express();
    app.use(requestLogger);
    app.use('/', express.static(__dirname + '/../client/dist'));
    //app.use(cors());
    app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
    app.use('/graphiql', graphiqlExpress({
      endpointURL: '/graphql'
    }));

    // LISTEN
    if (process.env.DEPLOYED !== 'true') {
      var certOptions = {
        key: fs.readFileSync(path.resolve('server.key')),
        cert: fs.readFileSync(path.resolve('server.crt'))
      }  
      var server = https.createServer(certOptions, app).listen(port, function() {
        console.log(`listening on port ${port}!`);
      });  
    } else {
      var server = app.listen(port, () => {
        console.log(`listening on port ${port}!`);
      });
    }

    // end of "try"

  } catch (e) {
    console.log(e);
  }
}

start();


