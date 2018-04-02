import React, { Component } from 'react';
import BusinessService from '../../Services/businessService.js';

import { Route, Link } from 'react-router-dom'

import { Subject } from 'rxjs'
import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'

import './loader.css'


const loaderStream = new Subject()


export { loaderStream }
var spaceStyle = {

  position: "absolute",
  top: "0",
  left: "0",
  height: '100%',
  width: '100%',
  zIndex: "500",
}


var fadeStyle = {

  position: "absolute",
  top: "0",
  left: "0",
  height: '100%',
  width: '100%',
  opacity: ".5",
  zIndex: "1",
  backgroundColor: "black"

}


var hoverStyte = {

  position: "relative",

  zIndex: "10",

}

class WorkLoader extends Component {

  constructor(props) {

    super(props);

    this.state = this.props

  }



  render() {

    return (<div style={ spaceStyle } className="loader-space d-flex justify-content-center align-items-center">
              <div style={ fadeStyle } className="loader-fade">
              </div>
              <div style={ hoverStyte } className="loader-hover">
                <span className="work-words">work</span>
                <span className="chew-words">chew</span>
              </div>
            </div>);
  }

}

export default WorkLoader;