import React, { Component } from 'react';
import './App.css';
import LocationList from './LocationList';


class App extends Component {
  state = {
    locations: [
      {title: 'Tianfu Square', location: {lat: 30.657439, lng: 104.065924}, id: 1},
      {title: 'Chunxi Road', location: {lat: 30.658526, lng: 104.077283}, id: 2},
      {title: 'Renmin Park', location: {lat: 30.657144, lng: 104.057255}, id: 3},
      {title: 'Kuan Alley and Zhai Alley', location: {lat: 30.663024, lng: 104.056146}, id:4},
      {title: 'Wenshu Monastery', location: {lat: 30.675009, lng: 104.072638}, id:5}
    ]
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
