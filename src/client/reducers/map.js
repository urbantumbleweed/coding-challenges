'use strict';

import { extend, map, reduce } from 'lodash';
//get constants to use for switch statement
import {
  SET_MAP,
  SET_USER_MARKER,
  SET_MAP_BOUNDS
} from '../constants/ActionTypes';

// set the initial state
const initialState = {
  gmap: null,
  userMarker: null,
  bounds: null
};

// export the activetruck reducer function
  // which accepts state and payload
    // state should default to initial state
export default function gmap(state = initialState, action){
  // switch statement on action.type
  switch (action.type){
  // match on imported constants
    case SET_MAP:
      return Object.assign({}, state, {gmap: action.payload.map});
    case SET_USER_MARKER:
      return Object.assign({}, state, {userMarker: action.payload.userMarker});
    case SET_MAP_BOUNDS:
      return Object.assign({}, state, {bounds: action.payload.bounds});
    default:
      return state;
  }
}
