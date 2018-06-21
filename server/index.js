var express = require('express');
var bodyParser = require('body-parser');
var requestLogger = require('./utilities.js').requestLogger;
var https = require('https');
var fs = require('fs');
var path = require('path');

const db = require('../db/index.js');


var app = express();

//middleware
app.use(requestLogger);
app.use(bodyParser.json());

// Serve static files to the client
app.use(express.static(__dirname + '/../client/dist'));

//All routes here:
//
//
//

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

