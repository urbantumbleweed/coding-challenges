'use strict';

import expect, { createSpy, spyOn } from 'expect' //The assertion library
const geolocate = require('mock-geolocation'); //mock out the geolocation api
import configureMockStore from 'redux-mock-store' //needed because dispatch is property of a store
import thunk from 'redux-thunk' //the middleware that needs to be tested
import { isFSA } from 'flux-standard-action';
import { extend, isMatch } from 'lodash';
import * as types from '../../constants/ActionTypes'
import * as actions from '../../actions/user-location'

// tell the module to use geolocate to mock out geolocation api
geolocate.use();

const newLocation = [37.7804739, -122.40616800000001] //lat, lng


const middlewares = [ thunk ]; //use an array in case we need to add more.
const mockStore = configureMockStore(middlewares); //decorate our mock store with middleware

// // use the location object that matches the mock data
const location = {
  latitude: 37.7804739,
  longitude: -122.40616800000001,
  radius: 500,
  limit: 2
};

describe('user-location actions', () => {
  // reset the network mock after each test
  afterEach(() => {
    geolocate.restore();
  });

  describe('#getUserLocation()', () => {
    beforeEach(() => {
      geolocate.use();
    });

    it('should return a function', () => {
      expect(actions.getUserLocation(location)).toBeA('function');
    });

    it('should dispatch ', (done) => {
      const { latitude, longitude } = location;
      // configure store for test with initial state
      const getState = {
        latitude: 37.7804739,
        longitude: -122.40616800000001
      };// the initial state of the store
      const incomingAction = { type: 'GET_CURRENT_LOCATION' }; //the action when action is initialized

      // use geolocate to send new location
      geolocate.send({
        latitude: 37.7804739,
        longitude: -122.40616800000001
      });

      // assert all the actions expected to
      // dispatch when getUserLocation succeeds
      const expectedActions = [
        incomingAction,
        { type: 'UPDATE_CURRENT_POSITION', payload: location },
      ];
      const store = mockStore(getState, expectedActions, done);
      store.dispatch(actions.getUserLocation(location));
    });
  });

  describe('#updateUserLocation()', () => {
    let location;

    beforeEach(() => {
      location = {
        latitude: 37.7804739,
        longitude: -122.40616800000001
      };
    });

    it('should return an object', () => {
      expect(actions.updateUserLocation(location)).toBeA('object');
    });

    it('should return an object with a type of UPDATE_CURRENT_POSITION', () => {
      expect(actions.updateUserLocation(location).type).toEqual('UPDATE_CURRENT_POSITION');
    });

    it('should return a flux standard action', () => {
      expect(isFSA(actions.updateUserLocation(location))).toBe(true);
    });

    it('should return payload that is an object', () => {
      expect(actions.updateUserLocation(location).payload).toBeA('object');
    });

    it('should return payload with `latitude` and `longitude`', () => {
      const payload = actions.updateUserLocation(location).payload;
      expect(payload).toEqual({latitude: 37.7804739, longitude: -122.40616800000001});
    });
  });
})
