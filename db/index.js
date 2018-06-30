
var mongoose = require('mongoose');
var databasePath = process.env.DATABASE_PATH || 'mongodb://localhost/readyourveggies';
mongoose.connect(databasePath);
var db = mongoose.connection;

const connectToDb = (callback) => {
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('Connected to db.');
    callback();
  });
}

var usersMongoose = require('mongoose');
var usersDatabasePath = process.env.USERS_DATABASE_PATH;
usersMongoose.connect(usersDatabasePath);
var usersDb = usersMongoose.connection;

const connectToUsersDb = (callback) => {
  usersDb.on('error', console.error.bind(console, 'connection error:'));
  usersDb.once('open', function() {
    console.log('Connected to USERS db.');
    callback();
  });
}

var articlesMongoose = require('mongoose');
var articlesDatabasePath = process.env.ARTICLES_DATABASE_PATH;
articlesMongoose.connect(articlesDatabasePath);
var articlesDb = articlesMongoose.connection;

const connectToArticlesDb = (callback) => {
  articlesDb.on('error', console.error.bind(console, 'connection error:'));
  articlesDb.once('open', function() {
    console.log('Connected to ARTICLES db.');
    callback();
  });
}

var sourcesMongoose = require('mongoose');
var sourcesDatabasePath = process.env.SOURCES_DATABASE_PATH;
sourcesMongoose.connect(sourcesDatabasePath);
var sourcesDb = sourcesMongoose.connection;

const connectToSourcesDb = (callback) => {
  sourcesDb.on('error', console.error.bind(console, 'connection error:'));
  sourcesDb.once('open', function() {
    console.log('Connected to SOURCES db.');
    callback();
  });
}


module.exports = { connectToDb, db };