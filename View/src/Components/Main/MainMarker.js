import React, { Component } from 'react';
import BusinessService from '../../Services/businessService.js';

import { Route, Link } from 'react-router-dom'

import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'

import { Marker, InfoWindow } from "react-google-maps"

class MainMapMarker extends Component {

  constructor(props) {

    super(props);

    this.state = this.props

  }

  toggleMarkerInfo() {

    this.setState({
      show: !this.state.show
    })

  }

  goToBusiness() {
    var {marker: {business}} = this.state;

    urlService.goTo(`${urlService.businessPage}?id=${business._id}`)

  }

  render() {

    return (

      <Marker onClick={ (info) => {
                  
                    this.toggleMarkerInfo()
                  
                  } } position={ this.state.marker.position }>
        { this.state.show && <InfoWindow onCloseClick={ (info) => {
                                     
                                       this.toggleMarkerInfo()
                                     
                                     } }>
                               <div onClick={ (event) => this.goToBusiness() }>
                                 { this.state.marker.business.name }
                               </div>
                             </InfoWindow> }
      </Marker>

      );
  }

}

export default MainMapMarker;