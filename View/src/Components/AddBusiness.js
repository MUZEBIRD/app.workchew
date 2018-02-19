import React, { Component } from 'react';
import userService from '../Services/userService.js'
import BusinessService from '../Services/businessService.js';

import { Route, Link } from 'react-router-dom'

import urlService from '../Services/urlService.js'
import restService from '../Services/restService.js'

import { Topbar } from './TopBar.js'
import BusinessForm from './Business/BusinessForm.js'

import { Subject } from 'rxjs'

import BusinessMapForm from './Business/BusinessMapForm.js'
class AddBusiness extends Component {

  constructor(props) {

    super(props);

    this.state = {};

    userService.checkLoginStatus()

  }

  render() {

    var props = {

      title: "Add/Edit Businesses"

    }

    return (

      <div className="wholeView flex-col">
        <div className="showView">
          <Topbar props={ { ...props } } />
          <br/>
          <br/>
          <div className="row">
            <BusinessForm props={ { ...props } } />
            <BusinessMapForm props={ { ...props } } />
          </div>
        </div>
      </div>

      );
  }

}

export default AddBusiness;