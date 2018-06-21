var express = require('express');

var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

var bodyParser = require('body-parser');
var https = require('https');
var fs = require('fs');
var path = require('path');

const db = require('../db/index.js');
var requestLogger = require('./utilities.js').requestLogger;

var app = express();

//middleware
app.use(requestLogger);
app.use(bodyParser.json());

// Serve static files to the client
app.use('/', express.static(__dirname + '/../client/dist'));


/*************** GRAPHQL STUFF *****************/
// GraphQL schema
var schema = buildSchema(`
    type Query {
        message: String
    }
`);
// Root resolver
var root = {
    message: () => 'Hello World!'
};
// Create an express server and a GraphQL endpoint
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
/*************** GRAPHQL STUFF *****************/

var port = process.env.PORT || 5000;

//Conditional check for DEV vs DEPLOYMENT environments
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

db.connectToDb();

