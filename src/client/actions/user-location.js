'use strict';

import * as types from '../constants/ActionTypes';
const GoogleLoader = require('google-maps'); //load googlemaps into the global namespace
import { Promise } from 'bluebird';
const FILTER_DISTANCE = 12000; //this will be used to limit locations to SF area


//Helper functions found on stackoveflow
//http://stackoverflow.com/questions/1502590/calculate-distance-between-two-points-in-google-maps-v3
/////////////////////////////////////////////////////////////////
function rad(x){
  return x * Math.PI / 180;
};

var getDistance = function(p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat - p1.lat);
  var dLong = rad(p2.lng - p1.lng);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};

/////////////////////////////////////////////////////////////////

// This function is used on application startup
// it reads from the html5 geolocation api
// The default location is for 5th and Market in SF
// if the users position is not in SF, then the default is used
// the function relies on the helper function above to calculate
// whether the user is in the SF area.
// The 12000 meters provides a radius of ~7 miles from the default.
export function getUserLocation(){
  return (dispatch, getState) => {
    // TODO: dispatch loading indicator here
    if (navigator && navigator.geolocation){// if browser navigator
      // get location from html5
      navigator.geolocation.getCurrentPosition((loc) => {
        //turn off loading indicator here

        //set reference locations
        const original = {lat: getState().userLocation.latitude, lng: getState().userLocation.longitude};
        const newLocation = {lat: loc.coords.latitude, lng: loc.coords.longitude};

        if (getDistance(original, newLocation) > FILTER_DISTANCE){// if the distance between the new location
        // and original location is greater than FILTER_DISTANCE
        // then return the original location,
          dispatch(updateUserLocation({
            latitude: original.lat,
            longitude: original.lng
          }));
        } else {// else dispatch the new location
          dispatch(updateUserLocation({
            latitude: newLocation.lat,
            longitude: newLocation.lng
          }));
        }
      });
    }
    // TODO: else
      // allow user to enter location some other way
  }
}

// This is alternative way for the user to set the location
// it pulls the coordinates from the googlemap.
// when the user drags the user-position it sets the pin on the map
// and calls this function with the new position.
export function setUserLocation({lat, lng}){
  return {
    type: types.UPDATE_CURRENT_POSITION,
    payload: {
      latitude: lat,
      longitude: lng
    }
  };
}

// return an action object with the type and payload
// TODO: need to check if address is in SF Area
// If not, use initial location
// and notify user that app works in SF only
export function updateUserLocation(payload){
  return {
    type: types.UPDATE_CURRENT_POSITION,
    payload
  };
}
