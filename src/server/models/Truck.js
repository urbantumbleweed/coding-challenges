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
