import React, { Component } from 'react';
import userService from '../Services/userService.js'

import { connect } from 'react-redux'


import { Route, Link } from 'react-router-dom'

import urlService from '../Services/urlService.js'

import BusinessService from '../Services/businessService.js';

import * as partnerActions from './Partner/actions'

import { getQueryParams, getPathVariables } from '../Utils'


var {getPartner, putPartner} = partnerActions

class PartnerPage extends Component {

  constructor(props) {
    var queryParams = getQueryParams()

    super(props);

    this.state = {
      partner: {},
      queryParams
    };

  }

  componentDidMount() {

    if (this.state.queryParams && this.state.queryParams.id) {

      this.props.getPartner({
        query: {
          _id: this.state.queryParams.id
        }
      })
    }
  }


  gotToPartnerMenu = () => {

    userService.get({
      params: {
        _id: 1
      }
    })


      .subscribe((user) => {

        var token = user.auth.token || user.auth.accessToken
        if (token) {

          window.location.href = "http://orders.workchew.com/#/?bid=" + this.props.partner._id + "&token=" + token


        }

      })


  }

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
          { this.props.partner
            && <div className='row flex-1'>
                 <div onClick={ (event) => this.gotToPartnerMenu() } className='border d-flex flex-column justify-content-center col-md-4'>
                   <h2>Menu</h2>
                 </div>
                 <div onClick={ (event) => window.location.hash = "partner-marketing-page?id=" + this.props.partner._id } className='border d-flex flex-column justify-content-center col-md-4'>
                   <h2>Marketing</h2>
                 </div>
                 <div onClick={ (event) => window.location.hash = "partner-settings-page?id=" + this.props.partner._id } className='border d-flex flex-column justify-content-center col-md-4'>
                   <h2>Settings</h2>
                 </div>
               </div> }
        </div>
      </div>

      );
  }

}


const mapStateToProps = (state, ownProps) => ({
  partner: state.partners.current
})

const PartnerPageComponent = connect(mapStateToProps, {
  getPartner,
  putPartner
})(PartnerPage)



export default PartnerPageComponent ;