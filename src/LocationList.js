import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import MapContainer from './Map'
import $ from  'jquery'



class LocationList extends Component {
    state={
        query: '',
        showingMarker: [],
        clickList: {},
    }


    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }


    clickList = (list) => {
      this.setState({ clickList: list })
    }



    w3_open = () => {
      $("#w3-sidenav").css("display", "");
      $("#nav").css("display", "none");
    }

    w3_close = () => {
      $("#w3-sidenav").css("display", "none");
      $("#nav").css("display", "block");
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
              <nav className="pannel" id="w3-sidenav">
                <a href="#" onClick={() => this.w3_close()} className="close">Close &times;</a>
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
                            <button className="location" onClick={() => this.clickList(location)}>{location.title}</button>
                        </li>
                    ))}
                  </ul>
                </div>
              </nav>
              <span onClick={() => this.w3_open()} className="nav" id="nav">&#9776;</span>
              <MapContainer locations={this.state.showingMarker} showMarker={this.state.clickList} />
            </div>
        )
    }
}

export default LocationList