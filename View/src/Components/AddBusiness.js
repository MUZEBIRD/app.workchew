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

import BusinessSeatWidget from './Business/BusinessSeatWidget.js'

import BusinessTagsWidget from './Business/BusinessTagsWidget.js'

import BusinessDiscountWidget from './Business/BusinessDiscountWidget.js'


const addBusinessSubject = new Subject();

class AddBusiness extends Component {

  constructor(props) {

    super(props);

    this.state = {};

    userService.checkLoginStatus()

  }

  render() {
    console.log(addBusinessSubject, 'addBusinessStream')
    var props = {

      title: "Add/Edit Businesses",
      addBusinessSubject
    }

    return (

      <div className="wholeView flex-col">
        <div className="showView">
          <div className="scrollView">
            <Topbar props={ { ...props } } />
            <br/>
            <br/>
            <div className="row">
              <BusinessForm { ...props } />
              <BusinessMapForm { ...props } />
            </div>

            <br />
            <div className="row">
              <div className='col-sm-6'>
                <BusinessSeatWidget />
              </div>

              <div className='col-sm-3'>
                <BusinessTagsWidget />
              </div>

              <div className='col-sm-3'>
                <BusinessDiscountWidget />
              </div>
              <br/>
            </div>
          </div>
        </div>
      </div>

      );
  }

}

export default AddBusiness;