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
var articleHelpers = require('../db/articleHelpers.js');
var getGraphQlSchema = require('../db/graphql.js').getGraphQlSchema;
<<<<<<< HEAD
=======

// SERVER
const app = express();
app.use(requestLogger);
>>>>>>> dc8859b43cb153c3e227050c86f1c7edbde653cb

app.use('/', express.static(__dirname + '/../client/dist'));
/*****************************AUTH*****************************/
app.use(session({
  secret: 'Clark Kent is Superman!',
  resave: true,
  saveUninitialized: true,
}))

<<<<<<< HEAD
var app = express();
app.use(requestLogger);

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

/*****************************AUTH*****************************/
app.use(session({
  secret: 'Clark Kent is Superman!',
  resave: true,
  saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(authMiddleware);

//dummy endpoint to verify user authentication
//Authentication 
app.get('/checkauthheaders', (req, res) => {res.send();})
//Handle logouts
app.get('/logout', ((req, res) => {
  req.logout();
  console.log(req.user);
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    req.session = null;
    res.clearCookie('connect.sid');
    req.logout();
    req.logOut();
    res.redirect('/');
  });
}));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/',
}));
app.get('/auth/facebook', passport.authenticate('facebook',{
  // authType: 'rerequest',
  // This scope array seems to be how we request additional info
  scope:['email', 'user_location', 'user_hometown', 'user_age_range']
}));

//React Router Redirect Hack
app.get('/dashboard', (req,res) => res.redirect('/'));
app.get('/login', (req,res) => res.redirect('/'));
/*****************************GRAPHQL*****************************/
async function startGraphQl() {
  var schema = await getGraphQlSchema();
  app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
}
startGraphQl();

/*****************************LISTEN*****************************/
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
=======
app.use(passport.initialize());
app.use(passport.session());
app.use(authMiddleware);
app.get('/auth/facebook', passport.authenticate('facebook',{
  // authType: 'rerequest',
  scope:['email', 'user_location', 'user_hometown', 'user_age_range']
}));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  // This scope array seems to be how we request additional info
  successRedirect: '/',
  failureRedirect: '/',
}));
app.get('/checkAuthHeaders', (req , res) => {res.send(200)});

//React Router Redirect Hack
app.get('/dashboard', (req,res) => res.redirect('/'));
app.get('/login', (req,res) => res.redirect('/'));
/*****************************GRAPHQL*****************************/
async function startGraphQl() {
  var schema = await getGraphQlSchema();
  app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
}
startGraphQl();

/*****************************LISTEN*****************************/
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

/*****************************WORKERS*****************************/
articleHelpers.deleteArticles();
articleHelpers.scrapeArticles();




>>>>>>> dc8859b43cb153c3e227050c86f1c7edbde653cb

/*****************************WORKERS*****************************/
articleHelpers.deleteArticles();
articleHelpers.scrapeArticles();