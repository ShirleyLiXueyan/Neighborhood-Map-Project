import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import MapContainer from './Map'
import {InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import $ from  'jquery'


class LocationList extends Component {

    state={
        query: '',
        showingMarker: this.props.locations,
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    renderMarker = () => {

    }

    render() {
        let showingLocations
        if(this.state.query) {
            const match = new RegExp(escapeRegExp(this.state.query), 'i')
            showingLocations = this.props.locations.filter((location) => match.test(location.title))
            this.state.showingMarker = showingLocations
        } else {
            showingLocations = this.props.locations
            this.state.showingMarker = showingLocations
        }

        showingLocations.sort(sortBy('title'))

        return (
            <div className="locations" >
              <div className="pannel">
                <h1 className="header">Chengdu Locations</h1>
                <div className="filter">
                    <input
                      aria-label="location-input"
                      id="filter-input"
                      type="textbox"
                      placeholder="filte a location"
                      value={this.state.query}
                      onChange={(event) => this.updateQuery(event.target.value)}
                    />
                </div>
                <div className="location-list">
                  <ul>
                    {showingLocations.map((location) => (
                        <li key={location.title} >
                            <button className="location" id={location.id} >{location.title}</button>
                        </li>
                    ))}
                  </ul>
                </div>
              </div>

              <MapContainer locations={this.state.showingMarker} showingmarker={this.state.showingMarker}/>
            </div>
        )
    }
}

export default LocationList