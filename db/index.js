require('dotenv').config();
const mongoose = require('mongoose');

// //connect to local test db
// const testDbConn = mongoose.createConnection('mongodb://localhost:27017/testDatabase');
// testDbConn.on('error', function(err){
//   if(err) throw err;
// });
// testDbConn.once('open', function callback () {
//   console.info('connected to local test db');
// });

//connect to user db
const userDbConn = mongoose.createConnection(process.env.USERS_DATABASE_PATH);
userDbConn.on('error', function(err){
  if(err) throw err;
});
userDbConn.once('open', function callback () {
  console.info('connected to users db');
});

//connect to article db
const articleDbConn = mongoose.createConnection(process.env.ARTICLES_DATABASE_PATH);
articleDbConn.on('error', function(err){
  if(err) throw err;
});
articleDbConn.once('open', function callback () {
  console.info('connected to articles db');
});

//connect to sourcedb
const sourceDbConn = mongoose.createConnection(process.env.SOURCES_DATABASE_PATH);
sourceDbConn.on('error', function(err){
  if(err) throw err;
});
sourceDbConn.once('open', function callback () {
  console.info('connected to sources db');
});

module.exports = { userDbConn, articleDbConn, sourceDbConn  };