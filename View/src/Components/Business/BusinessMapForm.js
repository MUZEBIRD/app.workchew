import React, { Component } from 'react';
import BusinessService from '../../Services/businessService.js';

import { Route, Link } from 'react-router-dom'

import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'


import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps"

const {SearchBox} = require("react-google-maps/lib/components/places/SearchBox");


const searchInpuStyle = {
  boxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `240px`,
  height: `32px`,
  marginTop: `8px`,
  padding: `0 12px`,
  borderRadius: `3px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
}

const MyMapComponent = withScriptjs(withGoogleMap(function(props) {

  return (

    <GoogleMap defaultZoom={ 12 } defaultCenter={ props.geo }>
      <SearchBox ref={ props.onSearchBoxMounted } bounds={ props.bounds } controlPosition={ 1 } onPlacesChanged={ props.onPlacesChanged }>
        <input type="text" placeholder="Customized your placeholder" style={ searchInpuStyle } />
      </SearchBox>
      { props.isMarkerShown && <Marker position={ props.geo } /> }
    </GoogleMap>
  )

}))

class BusinessMapForm extends Component {

  constructor(props) {

    super(props);

    this.state = {
      props
    };

    this.getGeo()
  }

  getGeo() {

    const mapForm = this;

    navigator.geolocation.getCurrentPosition((geo) => {

      console.log('geo', geo)

      this.setState({
        geo: {
          lat: geo.coords.latitude,
          lng: geo.coords.longitude
        }
      })

    })

  }

  onMapEvent(event) {

    this.props.subject.next(event)

  }

  render() {
    var props = this.state.props
    return (

      <div className='col-sm-6'>
        { this.state.geo ?
          <MyMapComponent geo={ this.state.geo } isMarkerShown googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBJa_W1JGWcoBM_nDKwneNzBnKuRcyDr6M&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={ <div style={ { height: `100%` } } /> } containerElement={ <div style={ { height: `400px` } } /> } mapElement={ <div style={ { height: `100%` } } /> } /> :
          <div>
            no coordinatess
          </div> }
      </div>

      );
  }

}

export default BusinessMapForm;