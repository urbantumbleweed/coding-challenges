'use strict';

var Truck = require('../models/Truck');

function getTrucks(req, res){

  //for testing
  // res.json(require('../../mock-data.json'))
  // get the coordinates from the query string
  var query = req.query; // will have latitude, longitude properties
  if (query.type === 'bounds'){
    Truck.getTrucksByBounds(query)
      .then(function(trucks){ // once trucks have been retrieved
        res.json(trucks); //send the collection back as json
      })
      .catch(function(err){
        var Err = new Error('There was an error calling `getTrucksByBounds` from truckController:getTrucks', err);
        console.log(Err);
        res.status(500).send('Sorry. We couldn\'t process your request');
      });
  } else {
    Truck.getTrucksByLocation(query)
      .then(function(trucks){ // once trucks have been retrieved
        res.json(trucks); //send the collection back as json
      })
      .catch(function(err){
        var Err = new Error('There was an error calling `getTrucksByLocation` from truckController:getTrucks', err);
        console.log(Err);
        res.status(500).send('Sorry. We couldn\'t process your request');
      });
  }
}

module.exports = {
  getTrucks: getTrucks
}
