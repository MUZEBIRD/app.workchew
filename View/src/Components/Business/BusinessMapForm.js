import React, { Component } from 'react';
import BusinessService from '../../Services/businessService.js';

import { Route, Link } from 'react-router-dom'

import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'

import { withGoogleMap, withScriptjs, GoogleMap, Marker } from "react-google-maps"
import { MySearchBox } from '../MySearchBox.js'

const MapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBJa_W1JGWcoBM_nDKwneNzBnKuRcyDr6M&v=3.exp&libraries=geometry,drawing,places"

const MyMapComponent = withScriptjs(withGoogleMap(function(props) {

  return (
    <div>
      <GoogleMap onBoundsChanged={ props.onBoundsChanged } ref={ props.onMapMounted } defaultZoom={ 12 } defaultCenter={ props.geo }>
        <MySearchBox {...props} />
        { props.isMarkerShown && <Marker position={ props.geo } /> }
      </GoogleMap>
    </div>

  )

}))

const refs = {}

class BusinessMapForm extends Component {

  constructor(props) {

    super(props);

    this.state = {
      props
    };

    this.getGeo()
  }
  onBoundsChanged() {


    this.setState({
      bounds: refs.map.getBounds(),
      center: refs.map.getCenter(),
    })
  }

  onMapMounted(map) {

    refs.map = map

  }

  onSearchBoxMounted(ref) {
    refs.searchBox = ref;
  }

  onPlacesChanged() {
    const places = refs.searchBox.getPlaces();

    places.forEach(place => {

      console.log('onPlacesChanged', place)


      //   if (place.geometry.viewport) {
      //     bounds.union(place.geometry.viewport)
      //   } else {
      //     bounds.extend(place.geometry.location)
      //   }
      // });
      // const nextMarkers = places.map(place => ({
      //   position: place.geometry.location,
      // }));
      // const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

    // this.setState({
    //   center: nextCenter,
    //   markers: nextMarkers,
    });


    var place = places[0]
    this.props.addBusinessSubject.next({
      place
    })

  // refs.map.fitBounds(bounds);
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
          <MyMapComponent
                          bounds={ this.state.bounds }
                          onSearchBoxMounted={ (event) => {
                                                 this.onSearchBoxMounted(event)
                                               } }
                          onMapMounted={ (event) => {
                                           this.onMapMounted(event)
                                         } }
                          geo={ this.state.geo }
                          onBoundsChanged={ (event) => {
                                              this.onBoundsChanged(event)
                                            } }
                          onPlacesChanged={ (event) => {
                                              this.onPlacesChanged(event)
                                            } }
                          geo={ this.state.geo }
                          isMarkerShown
                          googleMapURL={ MapsUrl }
                          loadingElement={ <div style={ { height: `100%` } } /> }
                          containerElement={ <div style={ { height: `400px` } } /> }
                          mapElement={ <div style={ { height: `100%` } } /> } /> :
          <div>
            no coordinatess
          </div> }
      </div>

      );
  }

}

export default BusinessMapForm;