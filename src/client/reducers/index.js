'use strict';

import { combineReducers } from 'redux';

import trucks from './trucks';
import userLocation from './user-location';
import activeTruck from './active-truck';
import autoComplete from './auto-complete';
import map from './map';

const rootReducer = combineReducers({
  trucks,
  userLocation,
  activeTruck,
  autoComplete,
  map
});

export default rootReducer;
