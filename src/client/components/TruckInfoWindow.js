'use strict';
import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';
import {InfoWindow} from 'react-gmaps';

class TruckInfoWindow extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
    }
  }

  render() {
    const {activeTruck} = this.props;

    const tagList = activeTruck.tags.length ? `
      <span class="active-truck__itemLabel">Items:</span>
      <ul class="active-truck__taglist">
        ${map(activeTruck.tags, (tag, index) => {
            return (
              `<li class="active-truck__taglist__item" key=${index}>${tag}</li>`
            );
          }).join('')}
      </ul>` : '';

    return (
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
          ${tagList}
          </div>`} />
    );
  }
}

export default TruckInfoWindow;
