import React, { Component } from 'react';
import './App.css';
import LocationList from './LocationList';
import * as locations from './Locations'

class App extends Component {
  state = {
    locations: []
  }

  componentWillMount() {
    this.setState({locations: locations.locations})
  }

  render() {
    return (
      <div className="app">
        <LocationList
          locations={this.state.locations}
        />
      </div>
    );
  }
}

export default App;
