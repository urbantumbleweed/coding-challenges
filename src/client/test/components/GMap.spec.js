import expect from 'expect'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import GMap from '../../components/GMap'
import TruckInfoWindow from '../../components/TruckInfoWindow'


function setup(propOverrides) {
  const props = Object.assign({
    trucks: {
      '334914':{
        objectId: '334914',
        applicant: 'Halal Cart',
        facilityType: 'Push Cart',
        locationDescription: 'MARKET ST: 05TH ST \\ CYRIL MAGNIN ST to MASON ST \\ TURK ST (901 - 941) -- SOUTH --',
        foodItems: 'Kebab: Halal Gyros: Grilled Halal Meat: Beverages',
        latitude: '37.7834700660829',
        longitude: '-122.408040736138',
        daysHours: 'Sa-Su:12AM-3AM;Mo-Su:10AM-8PM;Fr/Sa:9PM-12AM',
        location:{
          needs_recoding: false,
          longitude: '-122.408040736128',
          latitude: '37.7834700798603'
        },
        tags: [ 'Kebab', 'Halal Gyros', 'Grilled Halal Meat', 'Beverages' ],
        show: true
      },
      '437214': {
        objectId: '437214',
        applicant: 'Natan\'s Catering',
        facilityType: 'Truck',
        locationDescription: 'HARRISON ST: MERLIN ST to OAK GROVE ST (924 - 950)',
        foodItems: 'Burgers: melts: hot dogs: burritos:sandwiches: fries: onion rings: drinks',
        latitude: '37.7783886157866',
        longitude: '-122.403191783229',
        daysHours: 'Mo-Fr:12PM-1PM',
        location:
          { needs_recoding: false,
            longitude: '-122.403191783219',
            latitude: '37.7783886295689' },
        tags:[
          'Burgers',
          'Melts',
          'Hot dogs',
          'Burritos',
          'Sandwiches',
          'Fries',
          'Onion rings',
          'Drinks'
        ],
        show: true
      }
    },
    activeTruck: null,
    userLocation: {
      latitude: 37.7804739,
      longitude: -122.40616800000001
    },
    gmap: {
      bounds: {
        nwLat: 1,
        nwLng: 2,
        swLat: 3,
        swLng: 4
      },
      userMarker: {

      },
      gmap: {

      }
    },
    actions: {
      setActiveTruck: expect.createSpy(),
      fetchTrucksByBounds: expect.createSpy(),
      setMap: expect.createSpy(),
      setUserMarker: expect.createSpy(),
      setUserLocation: expect.createSpy(),
      setMapBounds: expect.createSpy()
    }
  }, propOverrides)

  const renderer = TestUtils.createRenderer()
  renderer.render(<GMap {...props} />)
  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
    renderer: renderer
  }
}

describe('components', () => {
  describe('GMap', () => {
    it('should render container', () => {
      const { output } = setup()
      expect(output.type).toBe('function')
      expect(output.props.className).toBe('map')
    })

    describe('truck markers', () => {
      it('should render match the number of trucks', () => {
        const { output } = setup()
        const [ trucks ] = output.props.children
        expect(trucks.type).toBe('div')
        expect(trucks.props.type).toBe('checkbox')
        expect(trucks.props.checked).toBe(false)
      })

      xit('should be checked if all todos completed', () => {
        const { output } = setup({ todos: [
          {
            text: 'Use Redux',
            completed: true,
            id: 0
          }
        ]
        })
        const [ toggle ] = output.props.children
        expect(toggle.props.checked).toBe(true)
      })

      xit('should call completeAll on change', () => {
        const { output, props } = setup()
        const [ toggle ] = output.props.children
        toggle.props.onChange({})
        expect(props.actions.completeAll).toHaveBeenCalled()
      })
    })

    describe('Truck Info Window', () => {
      xit('should render', () => {
        const { output, props } = setup()
        const [ , list ] = output.props.children
        expect(list.type).toBe('ul')
        expect(list.props.children.length).toBe(2)
        list.props.children.forEach((item, i) => {
          expect(item.type).toBe(TruckInfoWindow)
          expect(item.props.todo).toBe(props.todos[i])
        })
      })

      xit('should filter items', () => {
        const { output, renderer, props } = setup()
        const [ , , footer ] = output.props.children
        footer.props.onShow(SHOW_COMPLETED)
        const updated = renderer.getRenderOutput()
        const [ , updatedList ] = updated.props.children
        expect(updatedList.props.children.length).toBe(1)
        expect(updatedList.props.children[0].props.todo).toBe(props.todos[1])
      })
    })
  })
})
