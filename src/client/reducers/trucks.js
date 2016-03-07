'use strict';

import { extend, map, reduce } from 'lodash';
//get constants to use for switch statement
import {
  FETCH_TRUCKS_SUCCESS,
  FETCH_TRUCKS,
  FETCH_TRUCKS_FAILURE,
  HIDE_TRUCKS,
  SHOW_TRUCKS,
  SHOW_ALL_TRUCKS
} from '../constants/ActionTypes';

// set the initial state
const initialState = {};
// test data
// const initialState = {
//   '334914':
//    { objectId: '334914',
//      applicant: 'Halal Cart',
//      facilityType: 'Push Cart',
//      locationDescription: 'MARKET ST: 05TH ST \\ CYRIL MAGNIN ST to MASON ST \\ TURK ST (901 - 941) -- SOUTH --',
//      foodItems: 'Kebab: Halal Gyros: Grilled Halal Meat: Beverages',
//      latitude: '37.7834700660829',
//      longitude: '-122.408040736138',
//      daysHours: 'Sa-Su:12AM-3AM;Mo-Su:10AM-8PM;Fr/Sa:9PM-12AM',
//      location:
//       { needs_recoding: false,
//         longitude: '-122.408040736128',
//         latitude: '37.7834700798603' },
//      tags: [ 'Kebab', 'Halal Gyros', 'Grilled Halal Meat', 'Beverages' ],
//      show: true },
//   '437214':
//    { objectId: '437214',
//      applicant: 'Natan\'s Catering',
//      facilityType: 'Truck',
//      locationDescription: 'HARRISON ST: MERLIN ST to OAK GROVE ST (924 - 950)',
//      foodItems: 'Burgers: melts: hot dogs: burritos:sandwiches: fries: onion rings: drinks',
//      latitude: '37.7783886157866',
//      longitude: '-122.403191783229',
//      daysHours: 'Mo-Fr:12PM-1PM',
//      location:
//       { needs_recoding: false,
//         longitude: '-122.403191783219',
//         latitude: '37.7783886295689' },
//      tags:
//       [ 'Burgers',
//         'Melts',
//         'Hot dogs',
//         'Burritos',
//         'Sandwiches',
//         'Fries',
//         'Onion rings',
//         'Drinks' ],
//      show: true
//    }
//  }
let filtered;

// export the truck reducer function
  // which accepts state and payload
    // state should default to initial state
export default function truck(state = initialState, action){
  // switch statement on action.type
  switch (action.type){
  // match on imported constants
    case FETCH_TRUCKS_SUCCESS:
      return extend({}, action.payload);
    // given a set of trucks that should be hidden
    // a new state will be returned that has their visibility to false
    case HIDE_TRUCKS:
      filtered = action.payload.filtered;
      if (filtered.length){
        return reduce(filtered, (collection, truck, index, input) => {
          collection[truck.objectId] = extend({}, state[truck.objectId], {show: false});

          if (index === input.length - 1){
            return extend({}, state, collection);
          }
           return collection;
        }, {});
      } else {
        return state;
      }
    // given a set of trucks that should be visible
    // return a new state where they will appear
    case SHOW_TRUCKS:
      filtered = action.payload.filtered;
      if (filtered.length){
        return reduce(filtered, (collection, truck, index, input) => {
          collection[truck.objectId] = extend({}, state[truck.objectId], {show: true});

          if (index === input.length - 1){
            return extend({}, state, collection);
          }
           return collection;
        }, {});
      } else {
        return state;
      }
    // when search boxes and filters are clear
    // all trucks should appear
    case SHOW_ALL_TRUCKS:
      return reduce(state, (collection, truck) => {
        collection[truck.objectId] = extend({}, truck, { show: true})
        return collection;
      }, {})
    default:
      return state;
  }
}
