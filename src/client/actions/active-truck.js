'use strict';

import * as types from '../constants/ActionTypes'

// const rp = require('request-promise');

export function setActiveTruck(id) {
  // if the matches the id of the activeTruck, set to null
  // else set it to the truck with id
  return (dispatch, getState) => {
    const activeTruck = getState().activeTruck;
    console.log('The Active Truck', activeTruck);
    if (!activeTruck || id !== activeTruck.objectId){
      dispatch({
        type: types.SET_ACTIVE_TRUCK,
        payload: getState().trucks[id]
      });
    } else {
      dispatch(resetActiveTruck());
    }
  };
}

export function resetActiveTruck(){
  return {
    type: types.RESET_ACTIVE_TRUCK
  }
}

