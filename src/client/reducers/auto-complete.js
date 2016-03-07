'use strict';

import { extend, map, reduce } from 'lodash';
//get constants to use for switch statement
import {
  CREATE_AUTO_COMPLETE_SUGGESTIONS,
  RESET_AUTO_COMPLETE_SUGGESTIONS
} from '../constants/ActionTypes';

// set the initial state
const initialState = [];

// export the activetruck reducer function
  // which accepts state and payload
    // state should default to initial state
export default function autoComplete(state = initialState, action){
  // switch statement on action.type
  switch (action.type){
  // match on imported constants
    case CREATE_AUTO_COMPLETE_SUGGESTIONS:
      return action.payload;
    case RESET_AUTO_COMPLETE_SUGGESTIONS:
      return initialState;
    default:
      return state;
  }
}
