'use strict';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GMap from '../components/GMap';
import Header from '../components/Header';
import * as TruckActions from '../actions/trucks';
import * as ActiveTruckActions from '../actions/active-truck';
import * as UserLocationActions from '../actions/user-location';
import * as AutoCompleteActions from '../actions/search';
import * as MapActions from '../actions/map';

let currentLocation = {};

class App extends Component {
  componentDidMount() {
    this.props.actions.getUserLocation();
    this.props.actions.fetchTrucksByLocation()
  }

  render() {
    const { todos, actions, trucks, userLocation, activeTruck, map } = this.props
    return (
      <div>
        <GMap
          userLocation={userLocation}
          actions={actions}
          activeTruck={activeTruck}
          trucks={trucks}
          gmap={map}
          />
        <Header
          filterTrucks={actions.filterTrucks}
          revealTrucks={actions.revealTrucks}
        />
      </div>
    )
  }
}

App.propTypes = {
  userLocation: PropTypes.object.isRequired,
  activeTruck: PropTypes.object,
  trucks: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    trucks: state.trucks,
    userLocation: state.userLocation,
    activeTruck: state.activeTruck,
    autoComplete: state.autoComplete,
    map: state.map
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign({},
        TruckActions,
        UserLocationActions,
        ActiveTruckActions,
        MapActions,
        AutoCompleteActions),
        dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
