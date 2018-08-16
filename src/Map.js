
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
            var content = response[0];
            var url = 'https://en.wikipedia.org/wiki/' + content;
            $wikiElem.append('<a class="info" href=' + url + '>' +content + '</a></p>');
        },
        error: function() {
            $wikiElem.append('<p class="error-info">Sorry, error!</p>');
        }
    })

});

class MapContainer extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  }

  componentWillReceiveProps(marker) {
    console.log(marker.locations)
    console.log(marker.showMarker)
    for(var i= 0; i < marker.locations.length; i++) {
      if( marker.showMarker === marker.locations[i]) {
          let showMarker = marker.locations[i]
          this.setState({
            activeMarker: showMarker,
            showingInfoWindow: true
          })
      }
    }
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
      activeMarker: marker,
      showingInfoWindow: true,
      selectedPlace: marker,
    })
    getWiki(marker)
  }


  render() {
    const style = {
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    }
    return (
      <Map
          ref="map"
          google={this.props.google}
          style={style}
          initialCenter={{
            lat: 30.664136,
            lng: 104.071957
          }}
          zoom={14}
          onClick={this.onMapClicked}
      >
          {this.props.locations.map((location) => (
              <Marker
                ref="marker"
                animation={this.props.google.maps.Animation.DROP}
                key={location.id}
                onClick={this.onMarkerClick}
                title={location.title}
                position={location.location} />
          ))}

          <InfoWindow
            ref="window"
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