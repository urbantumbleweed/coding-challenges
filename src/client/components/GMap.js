'use strict';
import React, { Component, PropTypes } from 'react';
import { map, size, filter, isMatch } from 'lodash'
import {Gmaps, Marker, InfoWindow} from 'react-gmaps';

/*//This component is not working as expected.
//Suspect to be issue with gMaps-react library
import TruckInfoWindow from './TruckInfoWindow' */

class GMap extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      trucks: filter(this.props.trucks, (truck) => truck.show)
    }
  }

  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
    // This is marker that represents the user
    // dragging it will resposition the map
    // and fetch new data for the view
    const marker = new google.maps.Marker({
      position: {lat: this.props.userLocation.latitude, lng: this.props.userLocation.longitude},
      map: map,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 7
      },
      draggable: true,
    });

    // attach listener to marker representing user location
    // recenter map when user position changes
    // reset the user location when the marker is dragged
    // fetch new data to fill the view
    marker.addListener('dragend', (e) => {
      const loc = {lat: e.latLng.lat(), lng: e.latLng.lng()};
      map.setCenter(loc);

      this.props.actions.setMapBounds(map); // sets map bounds on app state
      this.props.actions.setUserLocation(loc); // sets the user location, repositions map
      this.props.actions.fetchTrucksByBounds(); // gets trucks for the map
    });
    this.props.actions.setUserMarker(marker);
    this.props.actions.setMap(map);
  }

  onMapDragEnd(e) {
    // if the map is dragged
    const loc = {
      lat: this.props.gmap.gmap.getCenter().lat(),
      lng: this.props.gmap.gmap.getCenter().lng()

    };
    this.props.gmap.gmap.setCenter(loc);
    // fetch the trucks for those bounds
    this.props.actions.fetchTrucksByBounds();
  }

  componentWillReceiveProps(nProps){
    // This will check if bounds have changed on new props
    // if they have then it will fetch for trucks with new bounds
    if (!isMatch(this.props.gmap.bounds, nProps.gmap.bounds)){
      nProps.actions.fetchTrucksByBounds();
    }
    // set the new state on the component
    this.setState({
      trucks: filter(nProps.trucks, (truck) => truck.show)
    })
  }

  componentWillUnmount() {
    // remove the event listeners added on the user marker
    google.maps.event.clearInstanceListeners(this.props.gmap.userMarker);
  }

  render() {
    const {userLocation, trucks, actions, activeTruck, gmap} = this.props;
    const { setActiveTruck } = actions;

    // The markers that appear on the map
    // This can be moved to another component
    const truckMarkers = this.state.trucks.length ?
      map(this.state.trucks, (val) => {
        return <Marker
          lat={val.latitude}
          lng={val.longitude}
          key={val.objectId}
          onClick={(e) => {setActiveTruck(val.objectId)}}
          draggable={false}/>
      }) : null;

    // Using the infoWindow as external component is not working
    // Will put infoWindow inline for now
/*    const infoWindow = activeTruck ?
      <TruckInfoWindow activeTruck={activeTruck} /> : null*/


    // The info window that appears for the clicked truck
    const infoWindow = activeTruck ?
      <InfoWindow
        lat={activeTruck.latitude}
        lng={activeTruck.longitude}
        maxWidth={150}
        content={`<div class="active-truck__container">
          <h2 class="active-truck__name">${activeTruck.applicant}</h2>
          <p class="active-truck__item">
            <span class="active-truck__itemLabel">Location:</span>
            <span class="active-truck__location">${activeTruck.locationDescription}</span>
          </p>
          <p class="active-truck__item">
            <span class="active-truck__itemLabel">Hours:</span>
            <span class="active-truck__hours">${activeTruck.daysHours}</span>
          </p>
          <span class="active-truck__itemLabel">Items:</span>
          <ul class="active-truck__taglist">${map(activeTruck.tags, (tag, index) => {
            return (
              `<li class="active-truck__taglist__item" key=${index}>${tag}</li>`
            );
          }).join('')}</ul>
          </div>`} /> : null;

    // Use a conditional return
    // If the filter does not have trucks
    // then display message
    // ** workaround for issue that map will not render without markers **
    return ( this.state.trucks.length ?
      <Gmaps
        className='map'
        width={'100vw'}
        height={'100vh'}
        lat={userLocation.latitude}
        lng={userLocation.longitude}
        zoom={16}
        params={{v: '3.exp'}}
        props={this.props}
        onDragEnd={this.onMapDragEnd}
        onMapCreated={this.onMapCreated}>
        {truckMarkers}
        {infoWindow}
      </Gmaps> : <div className='no-results'>Hmm, we couldn't find anything.</div>
    );
  }
}

GMap.propTypes = {
  userLocation: PropTypes.object.isRequired,
  activeTruck: PropTypes.object,
  trucks: PropTypes.object.isRequired,
  gmap: PropTypes.object,
  actions: PropTypes.object.isRequired
}

export default GMap;


