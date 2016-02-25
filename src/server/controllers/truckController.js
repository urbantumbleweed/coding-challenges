'use strict';

var Truck = require('../models/Truck');

function getTrucks(req, res){
  // get the coordinates from the query string
  var query = req.query; // will have latitude, longitude properties
  Truck.getTrucksByLocation(query)
    .then(function(trucks){ // once trucks have been retrieved
      res.json(trucks); //send the collection back as json
    })
    .catch(function(err){
      var Err = new Error('There was an error calling `getByLocation` from truckController', err);
      console.log(Err);
      res.status(500).send('Sorry. We couldn\'t process your request');
    });
}

module.exports = {
  getTrucks: getTrucks
}
