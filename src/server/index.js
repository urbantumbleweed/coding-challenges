'use strict';

var path = require('path');
var express = require('express'); //import the express library
var bodyParser = require('body-parser'); //middleware to enable handling of json



// Instantiate Server Object
var port = process.env.PORT || 8080; //the port to use for the server
var server = express(); //create an express instance

// Configure Middleware
server.use(bodyParser.json()); //decorate server with middleware

// Routing
//serve the index page on GET '/'
server.get('/', express.static(path.join(__dirname, '../../public')));

// Initialize the Server
server.listen(port, function(){
  console.log('Server is listening on port ' + port);
});
