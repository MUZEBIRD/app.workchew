import React, { Component } from 'react';
import BusinessService from '../../Services/businessService.js';

import { Route, Link } from 'react-router-dom'

import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'

import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from "react-google-maps"

import MainMapMarker from './MainMarker.js'


import _ from 'lodash'

const MapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBiXIdQkeDx3E0Dy5xKjGPINHBx5T3Jl7o&v=3.exp&libraries=geometry,drawing,places"

const BunchOMarkers = (props) => props.markers

  .map((marker, i) => (<MainMapMarker key={ i } marker={ marker } />))

const MyMapComponent = withScriptjs(withGoogleMap(function(props) {

  return (

    <GoogleMap onBoundsChanged={ props.onBoundsChanged } ref={ props.onMapMounted } defaultZoom={ 12 } defaultCenter={ props.geo }>
      { props.isMarkerShown && <Marker position={ props.geo } /> }
      { props.markers.length > 0 && <BunchOMarkers toggleMarkerInfo={ props.toggleMarkerInfo } markers={ props.markers } /> }
    </GoogleMap>
  )

}))

const refs = {}

class MainMapForm extends Component {

  constructor(props) {

    super(props);

    this.state = {
      props,
      places: [],
      markers: []
    };


  }

  componentDidMount() {

    this.getGeo()

    var time = setInterval(() => {

      if (window['google'] && refs.map) {

        this.onGeoAndMap()

        console.log('DONE', window['google'], refs.map)
        clearInterval(time);
      }

    }, 1000)

  }

  onBoundsChanged() {

    console.log("map bounds", refs.map)

    this.setState({
      bounds: refs.map.getBounds(),
      center: refs.map.getCenter(),
    })

  }

  onGeoAndMap() {

    this.getBusinessStream({})

      .subscribe((getBusinessStream) => {

        this.setBusinessToMarkers(getBusinessStream)

      })

  }

  getBusinessStream(params) {

    return BusinessService.get({
      params
    })

  }

  onMapMounted(map) {
    console.log("map mmounted", map)
    refs.map = map

  }

  onSearchBoxMounted(ref) {
    refs.searchBox = ref;
  }

  businessPointToGoogleLatLng(geoPoint) {
    var google = window['google']
    return new google.maps.LatLng(geoPoint.coordinates[1], geoPoint.coordinates[0])

  }

  setBusinessToMarkers(businesses) {

    var google = window['google']
    const bounds = new google.maps.LatLngBounds();

    console.log("fsdafsdafsadfsadfsdaf", bounds, this.state)

    if (bounds && this.state.geo) {

      bounds.extend(new google.maps.LatLng(this.state.geo.lat, this.state.geo.lng))

      businesses.forEach(business => {

        console.log(' set business markers  ', business)

        if (business.geoPoint && business.geoPoint.coordinates) {

          bounds.extend(this.businessPointToGoogleLatLng(business.geoPoint))

        }

      });

      var nextMarkers = businesses

        .filter(business => business.geoPoint && business.geoPoint.coordinates)

        .map(business => ({
          position: this.businessPointToGoogleLatLng(business.geoPoint),
          business,
          show: true
        }));

      const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

      this.setState({
        center: nextCenter,
        markers: nextMarkers,
      });

      refs.map.fitBounds(bounds);

    }

  } //setBusinessToMarkers

  showDataOptions(place) {

    var {types, opening_hours, geometry} = place
    var business = {

      name: place.name,
      address: place.formatted_address,
      phone: place.formatted_phone_number,

    }

    if (opening_hours && opening_hours.weekday_text) {

      business.weekday_text = opening_hours.weekday_text

    }

    if (geometry && geometry.location) {

      business.geoPoint = {
        "type": "Point",
        "coordinates": [geometry.location.lng(), geometry.location.lat()]
      }

      BusinessService.setGeoCoordinates(geometry.location.lat(), geometry.location.lng())
    }

    var updateMsg = {
      business,
      types
    }

    console.log('place', updateMsg)

    BusinessService.subject.next({
      mapUpdate: true,
      ...updateMsg
    })

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

  showInfoWindow(marker, i) {
    marker.show = !marker.show

    console.log("marker")

    this.state.markers[i].show = !this.state.markers[i].show

    this.setState({
      markers: this.state.markers
    })
    return marker
  }

  render() {
    var props = this.state.props
    return (

      <div className='mapFormContaner'>
        { this.state.geo ?
          <MyMapComponent
                          toggleMarkerInfo={ (marker, i) => this.showInfoWindow(marker, i) }
                          markers={ this.state.markers }
                          bounds={ this.state.bounds }
                          onMapMounted={ (event) => {
                                           this.onMapMounted(event)
                                         } }
                          geo={ this.state.geo }
                          onBoundsChanged={ (event) => {
                                              this.onBoundsChanged(event)
                                            } }
                          geo={ this.state.geo }
                          isMarkerShown
                          googleMapURL={ MapsUrl }
                          loadingElement={ <div style={ { height: `100%` } } /> }
                          containerElement={ <div style={ { height: `100%` } } /> }
                          mapElement={ <div style={ { height: `100%` } } /> } /> :
          <div>
            no coordinatess
          </div> }
      </div>

      );
  }

}

export default MainMapForm;