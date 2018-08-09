import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import userService from '../../Services/userService.js'
import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'

import { getQueryParams, getPathVariables } from '../../Utils'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './signUp.css';

import { Topbar } from '../TopBar.js'

class MembershipPaths extends Component {

  constructor(props) {

    super(props);

    var queryParams = getQueryParams()

    this.state = {

      queryParams,
      user: {}

    }

  }

  goToPayment = () => {
    var {id} = this.state.queryParams;

    if (id && id.length) {

      window.location.hash = "payment-page?id=" + id + "&chargeType=starter"

    }
  }

  goToMembershipSelection = () => {

    var {id} = this.state.queryParams;

    if (id && id.length) {

      window.location.hash = "M3mberships?id=" + id

    }

  }

  render() {

    return (
      <MuiThemeProvider>
        <div className="wholeView w-100" style={ { backgroundColor: 'orange' } }>
          <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center scroll-y">
            <div className="w-100 d-flex justify-content-center">
              <div style={ { width: 300, backgroundColor: "white" } }>
                <br/>
                <span className="Brandon_bld"><strong>TRY WORKCHEW FOR</strong></span>
                <br/>
                <span className="Brandon_bld">ONE MONTH</span>
                <p style={ { fontSize: '90%', } } className="brandong">
                  Sign up now and start anytime
                </p>
                <button onClick={ (event) => {
                                  
                                    this.goToPayment()
                                  
                                  } } className="btn btn-info brandong">
                  GET A FREE MONTH
                </button>
                <br/>
                <br/>
              </div>
              <div style={ { width: 30 } }></div>
              <div style={ { width: 300, backgroundColor: "white" } }>
                <br/>
                <span className="Brandon_bld"><strong>BECOME A</strong></span>
                <br/>
                <span className="Brandon_bld">WORKCHEW MEMBER</span>
                <p style={ { fontSize: '90%', } } className="brandong">
                  Membership starts at $49.99 a month
                </p>
                <button onClick={ (event) => {
                                  
                                    this.goToMembershipSelection()
                                  
                                  } } className="btn btn-info brandong">
                  CHOOSE YOUR PLAN
                </button>
                <br/>
                <br/>
              </div>
            </div>
            <br/>
            <div className="w-100 h-50 d-flex justify-content-center">
            </div>
          </div>
        </div>
      </MuiThemeProvider>
      );
  }

}

export default MembershipPaths