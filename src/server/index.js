'use strict';

var path = require('path');
var express = require('express'); //import the express library
var bodyParser = require('body-parser'); //middleware to enable handling of json

var port = process.env.PORT || 8080; //the port to use for the server
var app = express(); //create an express instance
app.use(bodyParser.json()); //decorate server with middleware

//serve the index page on GET '/'
app.get('/', express.static(path.join(__dirname, '../../public')));

app.get('/trucks', function(req, res){ //this function is the truck controller
  // get the coordinates from the query string
  console.log(Object.keys(req));
  var query = req.query;
  console.log("Query", query);
  res.json(JSON.stringify('You hit the Trucks route'));
})



var trucksController = {
  // uses a geo position and range to query for locations within in an area
  findNearBy: function(req, res) {
    res.send(Users.getAll());
  },
  // uses text and location to query by food type
  find: function(req, res) {
    res.status(201).send(Users.addOne(req.body));
  }
};

app.listen(port, function(){
  console.log('Server is listening on port ' + port);
});
