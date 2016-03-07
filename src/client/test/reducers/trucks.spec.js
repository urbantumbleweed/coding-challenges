import expect from 'expect'
import trucks from '../../reducers/trucks'
import * as types from '../../constants/ActionTypes'
import { map, countBy } from 'lodash';

let blankState = {};
let threeTruckState = {};
let truck1 = {};
let truck2 = {};
let truck3 = {};

describe('trucks reducer', () => {
  beforeEach(() =>{
    blankState = {};
    truck1 = {'123': { objectId: '123', applicant: 'Bacon', show: true}};
    truck2 = {'456': { objectId: '456', applicant: 'Egg', show: true}};
    truck3 = {'789': { objectId: '789', applicant: 'Milk', show: true}};
    threeTruckState = Object.assign({}, truck1, truck2, truck3);
  });

  it('should handle initial state', () => {
    expect(trucks(undefined, {})).toEqual({});
  });

  describe('case: FETCH_TRUCKS_SUCCESS', () => {
    it('should set state to payload', () => {
      expect(
        trucks(blankState, {
          type: types.FETCH_TRUCKS_SUCCESS,
          payload: truck1
        })
      ).toEqual(truck1);

      expect(
        trucks(truck1, {
          type: types.FETCH_TRUCKS_SUCCESS,
          payload: truck2
        })
      ).toEqual({
        '456': { objectId: '456', applicant: 'Egg', show: true}
      });

      expect(
        trucks({}, {
          type: types.FETCH_TRUCKS_SUCCESS,
          payload: Object.assign({}, truck1, truck2)
        })
      ).toEqual({
        '123': { objectId: '123', applicant: 'Bacon', show: true},
        '456': { objectId: '456', applicant: 'Egg', show: true}
      });
    });
  });


  describe('case HIDE_TRUCKS', () => {
    it('should hide trucks that match a passed id', () => {
      expect(
        trucks(threeTruckState, {
          type: types.HIDE_TRUCKS,
          payload: {filtered: [
            { objectId: '123', applicant: 'Bacon', show: true},
            { objectId: '456', applicant: 'Egg', show: true}
          ]}
        })
      ).toEqual({
        '123': { objectId: '123', applicant: 'Bacon', show: false},
        '456': { objectId: '456', applicant: 'Egg', show: false},
        '789': { objectId: '789', applicant: 'Milk', show: true}
      });
    });

    it('should return current state if there is no items to hide', () => {
      expect(
        trucks(threeTruckState, {
          type: types.HIDE_TRUCKS,
          payload: {filtered: []}
        })
      ).toEqual({
        '123': { objectId: '123', applicant: 'Bacon', show: true},
        '456': { objectId: '456', applicant: 'Egg', show: true},
        '789': { objectId: '789', applicant: 'Milk', show: true}
      });
    });
  });

  describe('case SHOW_TRUCKS', () => {
    beforeEach(() => {
      truck1[123].show = false;
      truck2[456].show = false;
      threeTruckState = Object.assign({}, truck1, truck2, truck3);
    });

    it('should show trucks that match a passed id', () => {
      expect(
        trucks(threeTruckState, {
          type: types.SHOW_TRUCKS,
          payload: {filtered: [
            { objectId: '123', applicant: 'Bacon', show: true},
            { objectId: '456', applicant: 'Egg', show: true}
          ]}
        })
      ).toEqual({
        '123': { objectId: '123', applicant: 'Bacon', show: true},
        '456': { objectId: '456', applicant: 'Egg', show: true},
        '789': { objectId: '789', applicant: 'Milk', show: true}
      });
    });

    it('should return the current state when there is no passed ids', () => {
      expect(
        trucks(threeTruckState, {
          type: types.SHOW_TRUCKS,
          payload: {filtered: []}
        })
      ).toEqual({
        '123': { objectId: '123', applicant: 'Bacon', show: false},
        '456': { objectId: '456', applicant: 'Egg', show: false},
        '789': { objectId: '789', applicant: 'Milk', show: true}
      });
    });
  });

  describe('case SHOW_TRUCKS', () => {
    beforeEach(() => {
      truck1[123].show = false;
      truck2[456].show = false;
      threeTruckState = Object.assign({}, truck1, truck2, truck3);
    });

    it('should return trucks have `show` property set to true', () => {
      const startCount = countBy(map(threeTruckState, (truck) => truck.show), Boolean).false;
      expect(startCount).toBe(2);
      expect(
        trucks(threeTruckState, {
          type: types.SHOW_ALL_TRUCKS
        })
      ).toEqual({
        '123': { objectId: '123', applicant: 'Bacon', show: true},
        '456': { objectId: '456', applicant: 'Egg', show: true},
        '789': { objectId: '789', applicant: 'Milk', show: true}
      });
    });
  });

  describe('case default', () => {
    it('should return the current state when type is not matched', () => {
      expect(
        trucks(threeTruckState, {
          type: 'A_RANDOM_TYPE'
        })
      ).toEqual({
        '123': { objectId: '123', applicant: 'Bacon', show: true},
        '456': { objectId: '456', applicant: 'Egg', show: true},
        '789': { objectId: '789', applicant: 'Milk', show: true}
      });
    });
  });
});
