'use strict';

import { reduce, map, extend, filter, reject, uniq } from 'lodash';
import * as types from '../constants/ActionTypes'

export function createAutoCompleteSuggestions(text, trucks){
  const payload = reduce(trucks, (tags, truck, index, arr) => {
    if (index === arr.length - 1){
      return map(tags, (tag) => tag);
    }
    return extend(tags, reduce(trucks.tags, (truckTags, tag) => {
      if (tag.indexOf(text) === -1){
        return truckTags;
      }
      truckTags[tag] = tag;
      return truckTags;
    }, {}));
  }, {})

  return {
    type: types.CREATE_AUTO_COMPLETE_SUGGESTIONS,
    payload
  }
}

export function filterTrucks(text){
  return (dispatch, getState) => {
    const trucks = getState().trucks;
    // filter the trucks by the text field
    // filtered are the trucks that do not match the search
    const filtered = reduce(trucks, (mem, truck) => {
      if (truck.foodItems.indexOf(text) === -1){
        return mem.concat([truck]);
      }
      return mem;
    }, []);

    dispatch(hideTrucks(filtered));
    // dispatch(createAutoCompleteSuggestions(text, filtered))

  };
}

export function revealTrucks(text){
  return (dispatch, getState) => {
    const trucks = getState().trucks;
    // filter the trucks by the text field
    // filtered are the trucks that match the search
    const filtered = filter(trucks, (truck) => {
      return truck.foodItems.indexOf(text) !== -1;
    });

    dispatch(showTrucks(filtered));
    // dispatch(createAutoCompleteSuggestions(text, filtered))
  };
}

export function hideTrucks(filtered){
  return {
    type: types.HIDE_TRUCKS,
    payload: {
      filtered
    }
  };
}

export function showTrucks(filtered){
  return {
    type: types.SHOW_TRUCKS,
    payload: {
      filtered
    }
  };
}
