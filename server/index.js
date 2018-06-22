var express = require('express');
var graphqlExpress = require('graphql-server-express').graphqlExpress;
var graphiqlExpress = require('graphql-server-express').graphiqlExpress;
var bodyParser = require('body-parser');
var https = require('https');
var fs = require('fs');
var passport = require('./facebookAuth.js');
var session = require('express-session');
var path = require('path');
var authMiddleware = require('./authMiddleware.js');
var requestLogger = require('./utilities.js').requestLogger;
var scrapeArticles = require('../db/utilities.js').scrapeArticles;
var deleteArticles = require('../db/utilities.js').deleteArticles;
var getGraphQlSchema = require('../db/graphql.js').getGraphQlSchema;

// SERVER
const app = express();
app.use(requestLogger);

app.use('/', express.static(__dirname + '/../client/dist'));

app.use(session({
  secret: 'Clark Kent is Superman!',
  resave: true,
  saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(authMiddleware);

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/',
}));

async function startGraphQl() {
  var schema = await getGraphQlSchema();
  app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
}
startGraphQl();

// LISTEN
var port = process.env.PORT || 5000;

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

// WORKERS
//deleteArticles();
scrapeArticles();





