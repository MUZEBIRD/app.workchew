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

  componentDidMount() {} //componentDidMount

  render() {

    return (
      <MuiThemeProvider>
        <div className="wholeView w-100" style={ { backgroundColor: 'orange' } }>
          <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center scroll-y">
            <div className="w-100 d-flex justify-content-center">
              <div style={ { width: 300, backgroundColor: "white" } }>
                <br/>
                <span class="Brandon_bld"><strong>TRY WORKCHEW FOR</strong></span>
                <br/>
                <span class="Brandon_bld">ONE MONTH</span>
                <p style={ { fontSize: '90%', } } class="brandong">
                  Sign up now and start anytime
                </p>
                <button class="btn btn-info brandong">
                  GET A FREE MONTH
                </button>
                <br/>
                <br/>
              </div>
              <div style={ { width: 30 } }></div>
              <div style={ { width: 300, backgroundColor: "white" } }>
                <br/>
                <span class="Brandon_bld"><strong>BECOME A</strong></span>
                <br/>
                <span class="Brandon_bld">WORKCHEW MEMBER</span>
                <p style={ { fontSize: '90%', } } class="brandong">
                  Membership starts at $49.99 a month
                </p>
                <button class="btn btn-info brandong">
                  CHOOSE YOUR PLAN
                </button>
                <br/>
                <br/>
              </div>
            </div>
            <br/>
            <div className="w-100 d-flex  justify-content-center">
              <div className="day-pass-path-button" style={ { width: 300, backgroundColor: "transparent", color: 'white' } }>
                <br/>
                <span class="Brandon_bld"><strong>TRY OUR</strong></span>
                <p class="Brandon_bld">
                  DAY PASS
                </p>
                <p style={ { fontSize: '90%', } } class="brandong">
                  After your one month trial has expired you can
                  <br/> sign up for a Day Pass
                </p>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
      );
  }

}

export default MembershipPaths;