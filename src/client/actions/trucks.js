'use strict';

import { reduce, extend, isMatch } from 'lodash';
const qs = require('query-string');
require('es6-promise').polyfill();
require('isomorphic-fetch');
import * as types from '../constants/ActionTypes'


export function fetchTrucksByLocation(limit, radius) {
  return (dispatch, getState) => {
    const location = {};
    location.latitude = getState().userLocation.latitude;
    location.longitude = getState().userLocation.longitude;
    location.limit = limit;
    location.radius = radius;

    const reqOpts = {
      uri: `${process.env.HOSTNAME ||
        'http://localhost:8080'||
        'http://09a9792d.ngrok.io'}`,
      path: '/trucks',
      qs: `?${qs.stringify(location)}`,
      json: true
    };

    const apiEndpoint = `${reqOpts.uri}${reqOpts.path}${reqOpts.qs}`;

    dispatch({ type: types.FETCH_TRUCKS, location });
    return fetch(apiEndpoint)
      .then(res => res.json())
      .then(data => {
        dispatch(fetchTrucksSuccess(data));
        dispatch({
          type: types.CREATE_AUTO_COMPLETE_SUGGESTIONS,
          payload: data.tags
        });
      })
      .catch(err => dispatch(fetchTrucksFailure(err)))
  }
}

export function fetchTrucksByBounds(limit) {

  return (dispatch, getState) => {
    const mapBounds = getState().map.gmap.getBounds();
    const bounds = {
      type: "bounds",
      nwLat: mapBounds.R.j,
      nwLng: mapBounds.j.j,
      swLat: mapBounds.R.R,
      swLng: mapBounds.j.R,
      limit: limit
    }

    const reqOpts = {
      uri: `${process.env.HOSTNAME ||
        'http://localhost:8080'||
        'http://09a9792d.ngrok.io'}`,
      path: '/trucks',
      qs: `?${qs.stringify(bounds)}`,
      json: true
    };

    const apiEndpoint = `${reqOpts.uri}${reqOpts.path}${reqOpts.qs}`;

    // const loc = {};
    // loc.latitude = getState().map.gmap.lat;
    // loc.longitude = getState().map.gmap.lng;
    // dispatch({
    //   type: types.FETCH_TRUCKS,
    //   payload: {
    //     latitude: loc.latitude,
    //     longitude: loc.longitude
    //   }
    // });
    return fetch(apiEndpoint)
      .then(res => res.json())
      .then(data => {
        console.log('NEW FETCH', data)
        dispatch(fetchTrucksSuccess(data));
        // dispatch({
        //   type: types.CREATE_AUTO_COMPLETE_SUGGESTIONS,
        //   payload: data.tags
        // });
      })
      .catch(err => dispatch(fetchTrucksFailure(err)))
  }
}

export function fetchTrucksSuccess(payload){
  return {
    type: types.FETCH_TRUCKS_SUCCESS,
    payload: reduce(payload.trucks, (collection, truck) => {
       collection[truck.objectId] = extend({}, truck, {show: true});
       return collection;
    }, {})
  };
}



export function fetchTrucksFailure(err){
  // maybe here we do a getState and check previous attempts and retry
  // like if (getState().retryCount < someNum) then dispatch(retryFetch)
  return {
    type: types.FETCH_TRUCKS_FAILURE,
    payload: err,
    error: true
   };
}
