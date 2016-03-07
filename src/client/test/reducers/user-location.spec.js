import expect from 'expect'
import userLocation from '../../reducers/user-location'
import * as types from '../../constants/ActionTypes'
import { map, countBy } from 'lodash';

let initialState = {};
let newLocation = {};

describe('userLocation reducer', () => {
  beforeEach(() =>{
    initialState = {
      latitude: 37.7804739,
      longitude: -122.40616800000001
    };
    newLocation = {
      latitude: 37.78047,
      longitude: -122.406168000000
    };
  });

  it('should handle initial state', () => {
    expect(userLocation(undefined, {})).toEqual(initialState);
  });

  describe('case: UPDATE_CURRENT_POSITION', () => {
    it('should set state to payload', () => {
      expect(
        userLocation(initialState, {
          type: types.UPDATE_CURRENT_POSITION,
          payload: newLocation
        })
      ).toEqual(newLocation);
    });
  });
});
