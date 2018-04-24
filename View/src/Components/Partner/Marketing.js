import React, { Component } from 'react';
import userService from '../../Services/userService.js'

import { Route, Link } from 'react-router-dom'

import urlService from '../../Services/urlService.js'

import BusinessService from '../../Services/businessService.js';

class PartnerMarketingPage extends Component {

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
              <h2>Partner Marketing Page</h2>
            </div>
          </div>
          <div className='flex-1 scroll-y'>
            <div className='row'>
              <div className='col-md-6'>
                Days
              </div>
              <div className='col-md-6'>
                <textarea className="form-control input-lg" />
              </div>
            </div>
            <br/>
            <div className='row'>
              <div className='col-md-6'>
                WorkChew Hours:
              </div>
              <div className='col-md-6'>
                <input className="form-control input-lg" />
              </div>
            </div>
            <br/>
            <div className='row'>
              <div className='col-md-6'>
                # of Allotted Seats:
              </div>
              <div className='col-md-6'>
                <input className="form-control input-lg" />
              </div>
            </div>
            <br/>
            <div className='row'>
              <div className='col-md-6'>
                # of Allotted Seats: WorkChew Hours:
              </div>
              <div className='col-md-6'>
                <input className="form-control input-lg" />
              </div>
            </div>
            <br/>
            <div className='row'>
              <div className='col-md-6'>
                Additional Specials:
              </div>
              <div className='col-md-6'>
                <textarea className="form-control input-lg" />
              </div>
            </div>
            <br/>
            <div className='row'>
              <div className='col-md-6'>
                WorkChew Hours:
              </div>
              <div className='col-md-6'>
                <textarea className="form-control input-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      );
  }

}
//<FlexTable items={ this.state.businesses } selectItem={ this.selectBusiness } getTableEntry={ this.getTableEntry } tableRows={ this.tableRows } />
export default PartnerMarketingPage;