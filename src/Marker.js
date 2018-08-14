import React, { Component } from 'react';
import {InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';



class Marker extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })

  render() {
    return (

    );
  }
}

export default Marker