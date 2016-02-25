'use strict';

var _ = require('lodash');
var rp = require('request-promise');

var BASE_URL = 'https://data.sfgov.org/resource/rqzj-sfat.json';
var DEFAULT_RADIUS = 500; // The default radius to search
var DEFAULT_LIMIT = 30; // The default number of records to load

/**
 * Truck class used when transforming data for application use
 * @namespace Truck
 * @constructor
 * @property {string} props.objectid id provided by api
 * @property {string} props.applicant name of business
 * @property {string} props.facilityType type of food truck
 * @property {string} props.locationDescription human readable approximation of address
 * @property {string} props.foodItems summary of products offered
 * @property {string} props.latitude geolocation:latitude of business
 * @property {string} props.longitude geolocation:longitude of business
 * @property {string} props.daysHours human readable description of hours of operation
 * @property {object} props.location geospatial point object of the business location
 * @property {object} props.tags list of terms representing products offered
 */
function Truck(props){
  this.objectId = props.objectid;
  this.applicant = props.applicant;
  this.facilityType = props.facilitytype;
  this.locationDescription = props.locationdescription;
  this.foodItems = props.fooditems;
  this.latitude = props.latitude;
  this.longitude = props.longitude;
  this.daysHours = props.dayshours;
  this.location = props.location;
  this.tags = [];
}

/**
 * Wraps the http request method
 * @name _requestData
 * @memberOf Truck
 * @private
 * @internal Wraps the http request method
 * @property  {object} opts
 * @property  {string} opts.uri -the url to make the request
 * @property  {object} opts.qs -the key:value pairs that create the query string
 * @property  {boolean} opts.json -flag to parse JSON and return JavaScript object
 * @return {object}      promise object containing response data
 */
function _requestData(opts){
  return rp(opts);
}

/**
 * The wrapper to the Socrata API.
 * @memberOf Truck
 * @interface
 * @param {object} query request params from client request
 * @property  {number} query.latitude [required] Number from the browser navigator.geolocation for latitude
 * @property  {number} query.longitude [required] Number from the browser navigator.geolocation for longitude
 * @property  {number} query.radius [optional] Number representing meters from lat/long coordinate that results should be returned. Default is 500.
 * @property  {number} query.limit [optional] Max number of records the api should return. Default is 30
 * @return {object}       Promise object with the transformed data for use on client.
 */
function getTrucksByLocation(query){
  // Error Handling
  if (!query.latitude || !query.longitude){
    if (!query.latitude){
      throw new Error('`Latitude` is a required property on the `query` object');
    } else {
      throw new Error('`Longitude` is a required property on the `query` object');
    }
  }

  // values pulled from query argument
  var latitude = query.latitude; //client browser latitude position
  var longitude = query.longitude; //client browser longitude position
  var radius = query.radius || DEFAULT_RADIUS; //radius to search
  var limit = query.limit || DEFAULT_LIMIT; //limit of records

  // the query string used with the API
  var qs = 'within_circle(location,' + latitude + ', ' + longitude + ', ' + radius+')';

  // The request options used to generate the request.
  var requestOptions = {
    uri: BASE_URL,
    qs: { //where to set criteria for search
        $where: qs,//this sets the boundary for search
        $limit: limit //this sets the limit of records
    },
    json: true // Automatically parses the JSON string in the response
  };

  // The request that returns a promise for a data object.
  return _requestData(requestOptions)
    .then(function(truckData){
      return _transformTruckData(truckData);
    })
    .catch(function(err){
      var Err = new Error('There was an error getting truck data by location', err);
      console.log(Err, err);
      throw Err;
    });
}

/**
 * Function that accepts a string and splits on a separator
 * @name  _taggify
 * @memberOf Truck
 * @private
 * @internal creates a list of tags from string
 * @param  {string} stringOfTags -the string to be split into tags
 * @param  {string} separator -the string or regular expression that splits the string input
 * @return {array}              List of tags that have normalized capitalization
 */
function _taggify(stringOfTags, separator){
  var re = separator || /\s*:\s*/; //find ':' surrounded by spaces or not
  return stringOfTags.split(re).map(function(tag){
    return tag.slice(0,1).toUpperCase() + tag.slice(1);
  });// Split by finding ':' separator. Capitalize first letter to normalize
}

/**
 * Accepts data from the Socrata API and transforms it to a subset that may be used internally to the application
 * @name _transformTruckData
 * @memberOf Truck
 * @private
 * @internal A reduce function that calls on other helper functions to create data collection for the client.
 * @param  {array} dataIn  The API returns an array of objects
 * @return {object}         Object with keys: trucks, tags.  Each truck also has an array of tags
 */
function _transformTruckData(dataIn){
  // The dataObject to be decorated with application data and returned to client
  var dataForClient = {
    trucks: [],
    tags: {}
  };
  // Iterate through the data provided by API and create new Truck Models
  // Work with data to create tags that can be used for filtering.
  return _.reduce(dataIn, function(data, truck){

    // Split the fooditems description into tags==============================
    var tags = _taggify(truck.fooditems);

    // Add tags to the collection tags if it hasn't been added yet
    _tagMap(tags, data);

    // add the new truck to the data object via data
    data.trucks.push(_makeTaggedTruck(truck, tags));// add the new truck object to the data.trucks array
    return data; //set the modified dataOut to the new dataOut
  }, dataForClient);
}


module.exports = {
  getTrucksByLocation: getTrucksByLocation,
  _requestData: _requestData,
  _makeTaggedTruck: _makeTaggedTruck,
  _tagMap: _tagMap,
  _taggify: _taggify,
  _transformTruckData: _transformTruckData
};
