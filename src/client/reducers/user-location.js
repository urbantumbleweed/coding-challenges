'use strict';

// import the the constants that will be used
import {
  UPDATE_CURRENT_POSITION
} from '../constants/ActionTypes'


// set initial state
const initialState = {
  latitude: 37.7804739,
  longitude: -122.40616800000001
}

// create the userLocation reducer
export default function userLocation(state = initialState, action){
  switch (action.type){
    // returns new state with updated latitude and longitude
    case UPDATE_CURRENT_POSITION:
      return Object.assign({}, state, {
        latitude: action.payload.latitude,
        longitude: action.payload.longitude
      });
    default:
      return state;
  }
}
