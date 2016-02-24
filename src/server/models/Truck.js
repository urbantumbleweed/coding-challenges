'use strict';

var _ = require('lodash');
var rp = require('request-promise');

var BASE_URL = 'https://data.sfgov.org/resource/rqzj-sfat.json';
var DEFAULT_RADIUS = 500; // The default radius to search
var DEFAULT_LIMIT = 30; // The default number of records to load

module.exports = {
  getTrucksByLocation: getTrucksByLocation,
  _requestData: _requestData,
  _makeTaggedTruck: _makeTaggedTruck,
  _tagMap: _tagMap,
  _taggify: _taggify,
  _transformTruckData: _transformTruckData
};
