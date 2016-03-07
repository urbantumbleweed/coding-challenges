'use strict';
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

class SearchTextInput extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      text: this.props.text || ''
    }
  }

  handleChange(e) {
    const prev = this.state.text;
    const text = e.target.value.trim()
    this.setState({ text: e.target.value });
    if (prev.length > text.length){ //user removed letters
      // reveal more trucks
      this.props.revealTrucks(text);
    } else {
      // filter out more trucks
      this.props.filterTrucks(text);
    }
  }

  render() {
    return (
      <input className='search-box'
        type="text"
        placeholder={this.props.placeholder}
        autoFocus="true"
        value={this.state.text}
        onChange={this.handleChange.bind(this)} />
    )
  }
}

SearchTextInput.propTypes = {
  filterTrucks: PropTypes.func.isRequired,
  revealTrucks: PropTypes.func.isRequired,
  text: PropTypes.string,
  placeholder: PropTypes.string,
}

export default SearchTextInput
