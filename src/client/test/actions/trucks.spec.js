'use strict';

import expect from 'expect' //The assertion library
import configureMockStore from 'redux-mock-store' //needed because dispatch is property of a store
import thunk from 'redux-thunk' //the middleware that needs to be tested
import nock from 'nock' //network mock, will simulate http requests
import { isFSA } from 'flux-standard-action';
import { extend, isMatch } from 'lodash';
import * as types from '../../constants/ActionTypes'
import * as actions from '../../actions/trucks'
import * as autoCompleteActions from '../../actions/search'


const middlewares = [ thunk ]; //use an array in case we need to add more.
const mockStore = configureMockStore(middlewares); //decorate our mock store with middleware

const mockData = require('../../../../mock-data'); //supply mock data that is also being served by client
// use the location object that matches the mock data
const location = {
  latitude: '37.7804739',
  longitude: '-122.406168000011',
  radius: 500,
  limit: 2
};


describe('trucks actions', () => {
  // reset the network mock after each test
  afterEach(() => {
    nock.cleanAll();
  });

  describe('#fetchTrucksByLocation()', () => {
    let truckData;
    beforeEach(() => {
      truckData = actions.fetchTrucksSuccess(mockData).payload;
    });

    it('should return a function', () => {
      expect(actions.fetchTrucksByLocation(location)).toBeA('function');
    });

    it('should dispatch FETCH_TRUCKS, REPOSITION_MAP, FETCH_TRUCKS_SUCCESS and CREATE_AUTO_COMPLETE_SUGGESTIONS', (done) => {
      const { latitude, longitude } = location;
      nock(/w+/) //intercepts url set in the action function
        .get('/trucks/') //looking for the trucks resource
        .query(location) //pass in location to generate query string
        .reply(200, { body: mockData })

      // configure store for test
      const getState = { trucks: [] };// the initial state of the store
      const incomingAction = { type: 'FETCH_TRUCKS', location }; //the action when action is initialized

      // assert all the actions expected to
      // dispatch when fetchTrucksByLocation succeeds
      const expectedActions = [
        incomingAction,
        { type: 'FETCH_TRUCKS_SUCCESS', payload: truckData },
        { type: 'CREATE_AUTO_COMPLETE_SUGGESTIONS', payload: mockData.tags }
      ];
      const store = mockStore(getState, expectedActions, done);
      store.dispatch(actions.fetchTrucksByLocation(location));
    });
  });

  describe('#fetchTrucksSuccess()', () => {
    let data;

    beforeEach(() => {
      data = {trucks: [ { objectId: 'one', applicant: 'Bacon Bacon'}], tags: ['tag1', 'tag2']};
    });

    it('should return an object', () => {
      expect(actions.fetchTrucksSuccess(data)).toBeA('object');
    });

    it('should return an object with a type of FETCH_TRUCKS_SUCCESS', () => {
      expect(actions.fetchTrucksSuccess(data).type).toEqual('FETCH_TRUCKS_SUCCESS');
    });

    it('should return a flux standard action', () => {
      expect(isFSA(actions.fetchTrucksSuccess(data))).toBe(true);
    });

    it('should return payload that is an object', () => {
      expect(actions.fetchTrucksSuccess(data).payload).toBeA('object');
    });

    it('should return payload with `trucks` and `tags`', () => {
      const payload = actions.fetchTrucksSuccess(data).payload;
      expect(payload).toEqual({'one': {objectId: 'one', applicant: 'Bacon Bacon', show: true}});
    });
  });

  describe('#fetchTrucksFailure()', () => {
    let err;

    beforeEach(() => {
      err = new Error('Something bad happened');
    });

    it('should return an object', () => {
      expect(actions.fetchTrucksFailure(err)).toBeA('object');
    });

    it('should return an object with a type of FETCH_TRUCKS_FAILURE', () => {
      expect(actions.fetchTrucksFailure(err).type).toEqual('FETCH_TRUCKS_FAILURE');
    });

    it('should return a flux standard action', () => {
      expect(isFSA(actions.fetchTrucksFailure(err))).toBe(true);
    });

    it('should return payload that is an error object', () => {
      expect(actions.fetchTrucksFailure(err).payload).toBeAn(Error);
    });

    it('should return with an error property set to `true`', () => {
      expect(actions.fetchTrucksFailure(err).error).toBe(true);
    });
  });

  // xit('deleteTodo should create DELETE_TODO action', () => {
  //   expect(actions.deleteTodo(1)).toEqual({
  //     type: types.DELETE_TODO,
  //     id: 1
  //   })
  // })

  // xit('editTodo should create EDIT_TODO action', () => {
  //   expect(actions.editTodo(1, 'Use Redux everywhere')).toEqual({
  //     type: types.EDIT_TODO,
  //     id: 1,
  //     text: 'Use Redux everywhere'
  //   })
  // })

  // xit('completeTodo should create COMPLETE_TODO action', () => {
  //   expect(actions.completeTodo(1)).toEqual({
  //     type: types.COMPLETE_TODO,
  //     id: 1
  //   })
  // })

  // xit('completeAll should create COMPLETE_ALL action', () => {
  //   expect(actions.completeAll()).toEqual({
  //     type: types.COMPLETE_ALL
  //   })
  // })

  // xit('clearCompleted should create CLEAR_COMPLETED action', () => {
  //   expect(actions.clearCompleted('Use Redux')).toEqual({
  //     type: types.CLEAR_COMPLETED
  //   })
  // })
})
