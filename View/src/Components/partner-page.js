import React, { Component } from 'react';
import userService from '../Services/userService.js'

import { Route, Link } from 'react-router-dom'

import urlService from '../Services/urlService.js'

import BusinessService from '../Services/businessService.js';

class PartnerPage extends Component {

  constructor(props) {

    super(props);

    this.state = {};

  }

  componentWillMount() {}

  render() {

    return (

      <div className="wholeView flex-col">
        <div className="showView d-flex flex-column">
          <br />
          <div className='row h-25'>
            <div className='col-md-12'>
              <h2>Partner Page</h2>
            </div>
          </div>
          <div className='row flex-1'>
            <div className='border d-flex flex-column justify-content-center col-md-4'>
              <h2>Menu</h2>
            </div>
            <div className='border d-flex flex-column justify-content-center col-md-4'>
              <h2>Marketing</h2>
            </div>
            <div className='border d-flex flex-column justify-content-center col-md-4'>
              <h2>Settings</h2>
            </div>
          </div>
        </div>
      </div>

      );
  }

}
//<FlexTable items={ this.state.businesses } selectItem={ this.selectBusiness } getTableEntry={ this.getTableEntry } tableRows={ this.tableRows } />
export default PartnerPage;