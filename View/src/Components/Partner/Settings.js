import React, { Component } from 'react';
import userService from '../../Services/userService.js'
import { connect } from 'react-redux'

import { Route, Link } from 'react-router-dom'

import urlService from '../../Services/urlService.js'

import BusinessService from '../../Services/businessService.js';
import { getQueryParams, getPathVariables } from '../../Utils'
import * as partnerActions from './actions'


import ParnterInfoArea from './PartnerInfoArea'
import ParnterInfoInput from './PartnerInfoInput'

var {getPartner, putPartner} = partnerActions
class PartnerSettingsPage extends Component {

  constructor(props) {
    var queryParams = getQueryParams()

    super(props);

    this.state = {

      queryParams,
      bannerPreviewData: null

    };

  }
  updatePartner = () => {

    var partner = {
      ...this.props.partner,
      ...this.state.partner
    }

    this.props.putPartner({

      body: partner

    })


  }
  updateCurrentPartnerState(update, key) {

    var partner = {
      ...this.props.partner,
      ...this.state.partner
    }

    partner[key] = update;

    this.setState({
      partner
    })

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
  render() {

    var partner = this.state.partner || this.props.partner
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
                <ParnterInfoInput onChange={ (event) => this.updateCurrentPartnerState(event.target.value, 'contactName') } value={ partner.contactName } />
              </div>
            </div>
            <br/>
            <div className='row'>
              <div className='col-md-3'>
                Partner Business Name
              </div>
              <div className='col-md-6'>
                <ParnterInfoInput onChange={ (event) => this.updateCurrentPartnerState(event.target.value, 'name') } value={ partner.name } />
              </div>
            </div>
            <br/>
            <div className='row'>
              <div className='col-md-3'>
                Contact Email
              </div>
              <div className='col-md-6'>
                <ParnterInfoInput onChange={ (event) => this.updateCurrentPartnerState(event.target.value, 'email') } value={ partner.email } />
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
              <button onClick={ (event) => {
                                
                                
                                  this.updatePartner()
                                } } className="btn btn-primary" type="button">
                update
              </button>
            </div>
          </div>
        </div>
      </div>

      );
  }

}


const mapStateToProps = (state, ownProps) => ({
  partner: state.partners.current
})

const PartnerSettingsPageComponent = connect(mapStateToProps, {
  getPartner,
  putPartner
})(PartnerSettingsPage)

export default PartnerSettingsPageComponent ;