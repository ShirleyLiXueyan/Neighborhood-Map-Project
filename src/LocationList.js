import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import Map from './Map'

class LocationList extends Component {



    state={
        query: '',
        showingMarker: this.props.locations
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
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
                        <li key={location.title} type="button"  className="location">
                            {location.title}
                        </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Map locations={this.state.showingMarker} showingmarker={this.state.showingMarker}/>
            </div>
        )
    }
}

export default LocationList