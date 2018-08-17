
import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import $ from  'jquery'




class MapContainer extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    animation: this.props.google.maps.Animation.DROP
  }

  getWiki = (marker,callback) => {
      var $wikiElem = $('#infowindow');
      var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + marker.title + "&format=json&callback=wikiCallback";

       $.ajax({
          url: wikiUrl,
          dataType:'jsonp',
          success: function( response ) {
              var content = response[0];
              var url = 'https://en.wikipedia.org/wiki/' + content;
              $wikiElem.append('<a class="info" href=' + url + '>' +content + '</a></p>');
          },
          error: function() {
              $wikiElem.append('<p class="error-info">Sorry, error!</p>');
          }
      })
  }

  componentWillReceiveProps(marker) {
    if( marker.showMarker !== this.props.showMarker) {
        const markers = this.refs
        const newMarker = markers[marker.showMarker.title].marker
        for( var m in markers ) {
          markers[m].marker.setAnimation(null)
        }
        newMarker.setAnimation(this.props.google.maps.Animation.BOUNCE)
        this.setState({
          activeMarker: newMarker,
          showingInfoWindow: true,
          selectedPlace: marker.showMarker
        })
        this.getWiki(newMarker)
    }
  }



  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
      const markers = this.refs
      for( var m in markers ) {
        markers[m].marker.setAnimation(null)
      }
    }
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true,
    })
    const markers = this.refs
    for( var m in markers ) {
        markers[m].marker.setAnimation(null)
    }
    this.getWiki(marker)
  }

  render() {
    const style = {
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    }
    return (
      <Map
          google={this.props.google}
          style={style}
          initialCenter={{
            lat: 30.664136,
            lng: 104.071957
          }}
          zoom={14}
          onClick={this.onMapClicked}>

          {this.props.locations.map((location) => (
              <Marker
                ref={location.title}
                animation={this.state.animation}
                key={location.title}
                onClick={this.onMarkerClick}
                title={location.title}
                position={location.location} />
          ))}

          <InfoWindow
            onOpen={this.windowHasOpened}
            onClose={this.windowHasClosed}
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div id="infowindow">
              </div>
          </InfoWindow>
      </Map>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: "AIzaSyDO8ll77d-l-y3_hbGihKAJutgNKTO6k6A"
})(MapContainer)