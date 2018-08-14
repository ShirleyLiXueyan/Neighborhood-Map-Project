
import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import $ from  'jquery'


var getWiki = ((marker,callback) => {
    var $wikiElem = $('#infowindow');
    var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + marker.title + "&format=json&callback=wikiCallback";

     $.ajax({
        url: wikiUrl,
        dataType:'jsonp',
        success: function( response ) {
            var content = response[1];
            var url = 'https://en.wikipedia.org/wiki/' + content;
            $wikiElem.append('<h1 className="info">' + url + '</h1>');
        }
    })

});

class MapContainer extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  }


  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      selectedPlace: marker,
    })
    getWiki(marker)
  }


  render() {
    const style = {
      width: '80vw',
      height: '100vh'
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
          onClick={this.onMapClicked}
      >
          {this.props.showingmarker.map((location) => (
              <Marker
                key={location.id}
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