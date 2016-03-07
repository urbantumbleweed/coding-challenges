// import { jsdom } from 'jsdom'
var jsdom = require('jsdom').jsdom;
var geolocate = require('mock-geolocation');
var GoogleLoader = require('google-maps'); //load googlemaps into the global namespace

GoogleLoader.load((google) => {
  global.google = google;
});

global.document = jsdom('<!doctype html><html><body></body></html>')
global.geolocate = geolocate.use();
global.window = document.defaultView
global.navigator = global.window.navigator
global.navigator.geolocation = global.geolocate;

