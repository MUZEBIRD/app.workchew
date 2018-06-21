import React, { Component } from 'react';
import userService from '../../Services/userService.js'

import { Route, Link } from 'react-router-dom'

import urlService from '../../Services/urlService.js'

import BusinessService from '../../Services/businessService.js';

class PartnerSettingsPage extends Component {

  constructor(props) {

    super(props);

    this.state = {};

  }

  componentWillMount() {}

  render() {

    return (

      <div className="wholeView flex-col">
        <div className="showView d-flex flex-column">
          <div className='row'>
            <div className='col-md-3'>
              <br/>
              <img style={ { width: 100 } } src={ "/static/images/logo.png" } />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <h2>Partner Settings</h2>
              <br/>
              <span><u><b>Account</b></u></span>
            </div>
          </div>
          <br/>
          <br/>
          <div className='flex-1 scroll-y'>
            <div className='row'>
              <div className='col-md-3'>
                Contact Name
              </div>
              <div className='col-md-6'>
                <input className="form-control input-lg" />
              </div>
            </div>
            <br/>
            <div className='row'>
              <div className='col-md-3'>
                Partner Business Name
              </div>
              <div className='col-md-6'>
                <input className="form-control input-lg" />
              </div>
            </div>
            <br/>
            <div className='row'>
              <div className='col-md-3'>
                Contact Email
              </div>
              <div className='col-md-6'>
                <input className="form-control input-lg" />
              </div>
            </div>
            <br/>
            <div className='row'>
              <div className='col-md-3'>
                <button className="btn btn-primary" type="button">
                  Change Password
                </button>
              </div>
            </div>
            <br />
            <div className='d-flex justify-content-center'>
              <button className="btn btn-primary" type="button">
                update
              </button>
            </div>
          </div>
        </div>
      </div>

      );
  }

}
export default PartnerSettingsPage;