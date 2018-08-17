
import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import $ from  'jquery'




class MapContainer extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: null,
    link: null,
    animation: this.props.google.maps.Animation.DROP
  }

  getWiki = (marker,callback) => {
      let wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + marker.title + "&format=json&callback=wikiCallback";
      let _this = this;
      console.log(this.state.selectedPlace)
       $.ajax({
          url: wikiUrl,
          dataType:'jsonp',
          success: function( response ) {
              var content = response[0];
              var url = 'https://en.wikipedia.org/wiki/' + content;
              _this.setState({selectedPlace: content});
              _this.setState({link: url})
              console.log(_this.state.selectedPlace)
          },
          error: function() {
              _this.setState({selectedPlace: "Error"})
          }
      })
  }

  componentWillReceiveProps(marker) {
    if( marker.showMarker !== this.props.showMarker) {
        const markers = this.refs
        const newMarker = markers[marker.showMarker.title].marker
        this.getWiki(newMarker)
        for( var m in markers ) {
          markers[m].marker.setAnimation(null)
        }
        newMarker.setAnimation(this.props.google.maps.Animation.BOUNCE)
        this.setState({
          activeMarker: newMarker,
          showingInfoWindow: true,
        })

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
            visible={this.state.showingInfoWindow}
            content={this.state.selectedPlace}
            link={this.state.link}>
              <div id="infowindow">
                <a href={this.props.link} className="info">{this.props.content}</a>
              </div>
          </InfoWindow>
      </Map>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: "AIzaSyDO8ll77d-l-y3_hbGihKAJutgNKTO6k6A"
})(MapContainer)