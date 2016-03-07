'use strict';

import { extend, map, reduce } from 'lodash';
//get constants to use for switch statement
import {
  SET_ACTIVE_TRUCK,
  RESET_ACTIVE_TRUCK,
} from '../constants/ActionTypes';

// set the initial state
const initialState = null;

// export the activetruck reducer function
  // which accepts state and payload
    // state should default to initial state
export default function activeTruck(state = initialState, action){
  // switch statement on action.type
  switch (action.type){
  // match on imported constants
    case SET_ACTIVE_TRUCK:
      return extend({}, action.payload);
    case RESET_ACTIVE_TRUCK:
      return initialState;
    default:
      return state;
  }
}
