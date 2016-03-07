'use strict';
import React, { PropTypes, Component } from 'react';
import SearchTextInput from './SearchTextInput';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1 className="header__title">SF Food Trucks</h1>
        <SearchTextInput
         filterTrucks={this.props.filterTrucks}
         revealTrucks={this.props.revealTrucks}
         placeholder="Enter the food you want?" />
      </header>
    )
  }
}

Header.propTypes = {
  filterTrucks: PropTypes.func.isRequired,
  revealTrucks: PropTypes.func.isRequired
}

export default Header
