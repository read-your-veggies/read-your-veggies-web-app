var mongoose = require('mongoose');
var databasePath = process.env.DATABASE_PATH || 'mongodb://localhost/readyourveggies';
mongoose.connect(databasePath);

var db = mongoose.connection;

const connectToDb = () => {
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('Connected to db.');
  });
}

module.exports.connectToDb = connectToDb;