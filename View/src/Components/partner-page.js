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
    var partner = this.props.partner || {}
    return (

      <div className="wholeView flex-col">
        <div className="showView d-flex flex-column">
          <br />
          <div style={ { position: 'relative' } } className='row h-25'>
            { partner
              && partner.bannerImgId
              &&
              
              <div style={ { opacity: .4, position: 'absolute', zIndex: 1 } } className='h-100 w-100 z-10 d-flex align-items-center w-100 justify-content-center'>
                <img className='h-100 w-50 z-1' src={ this.state.bannerPreviewData || `${urlService.pic}/${partner.bannerImgId}` } />
              </div> }
            <div style={ { zIndex: 10 } } className='h-100 z-10 d-flex align-items-center w-100 justify-content-center'>
              <h2 style={ { fontWeight: 'bold' } } className="Brandon_bld">WorkChew Partner</h2>
            </div>
          </div>
          { this.props.partner
            && <div className='row flex-1'>
                 <div onClick={ (event) => this.gotToPartnerMenu() } className='d-flex flex-column justify-content-center align-items-center col-md-4'>
                   <img style={ { width: 100, height: 100 } } src={ `/static/images/partner-menu-icon.png` } />
                   <h2 style={ { fontWeight: 'bold' } } className="Brandon_bld">Menu</h2>
                   <p className="Brandon_bld">
                     Create and edit menu items and prices
                   </p>
                 </div>
                 <div onClick={ (event) => window.location.hash = "partner-marketing-page?id=" + this.props.partner._id } className='d-flex flex-column justify-content-center align-items-center col-md-4'>
                   <img style={ { width: 100, height: 100 } } src={ `/static/images/partner-marketing-icon.png` } />
                   <h2 style={ { fontWeight: 'bold' } } className="Brandon_bld">Marketing</h2>
                   <p className="Brandon_bld">
                     Manage days, hours, seats allotted, discounts, specials and events
                   </p>
                 </div>
                 <div onClick={ (event) => window.location.hash = "partner-settings-page?id=" + this.props.partner._id } className='d-flex flex-column justify-content-center align-items-center col-md-4'>
                   <img style={ { width: 100, height: 100 } } src={ `/static/images/partner-settings-icon.png` } />
                   <h2 style={ { fontWeight: 'bold' } } className="Brandon_bld">Settings</h2>
                   <p className="Brandon_bld">
                     Edit account info (user name, password, etc.)
                   </p>
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