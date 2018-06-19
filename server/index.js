var express = require('express');
var bodyParser = require('body-parser');
var requestLogger = require('./utilities.js').requestLogger;

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

var port = process.env.PORT || 9000; 

// listen for requests
app.listen(port, () => {
console.log(`Listening on port ${port}`);
});

db.connectToDb();

