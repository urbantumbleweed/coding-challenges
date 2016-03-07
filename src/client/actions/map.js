'use strict';

import * as types from '../constants/ActionTypes'

export function setMap(map) {
  return {
    type: types.SET_MAP,
    payload: {
      map
    }
  };
}

export function setUserMarker(userMarker){
  return {
    type: types.SET_USER_MARKER,
    payload: { userMarker }
  };
}

export function setMapBounds(map){
  return (dispatch, getState) => {
    const mb = map ? map.getBounds() : getState().map.gmap.getBounds();
    const bounds = {
      nwLat: mb.R.j,
      nwLng: mb.j.j,
      swLat: mb.R.R,
      swLng: mb.j.R,
    };

    dispatch({
      type: types.SET_MAP_BOUNDS,
      payload: {
        bounds
      }
    });
  }
}
