import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import MapContainer from './Map'


class LocationList extends Component {
    state={
        query: '',
        showingMarker: this.props.locations,
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    renderMarker = () => {
      this.refs.showMarker.onMarkerClick()
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
                            <button className="location" onClick={this.renderMarker} >{location.title}</button>
                        </li>
                    ))}
                  </ul>
                </div>
              </div>
              <MapContainer locations={this.state.showingMarker} ref="showMarker" />
            </div>
        )
    }
}

export default LocationList