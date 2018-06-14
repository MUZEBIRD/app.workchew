import React, { Component } from 'react';

import { connect } from 'react-redux'

import userService from '../../Services/userService.js'

import { Route, Link } from 'react-router-dom'

import urlService from '../../Services/urlService.js'

import BusinessService from '../../Services/businessService.js';

import * as partnerActions from './actions'
import { getQueryParams, getPathVariables } from '../../Utils'

var {getPartner} = partnerActions


const ParnterInfoArea = (props) => (<textarea value={ props.value } onChange={ props.onChange } rows="7" className="form-control input-lg" />)

class PartnerMarketingPage extends Component {

  constructor(props) {
    var queryParams = getQueryParams()

    super(props);

    this.state = {
      queryParams,

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

  updateCurrentPartnerState(update, key) {

    console.log('updateCurrentPartnerState', update, key)

    var partner = this.state.partner || this.props.partner

    partner.hours = update;
    this.setState({
      partner
    })

  }

  updatePartner() {

    console.log('updatePartner', this.state.partner)

  }

  render() {

    var partner = this.state.partner || this.props.partner

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
                WorkChew Hours:
              </div>
              <div className='col-md-6'>
                <ParnterInfoArea onChange={ (event) => this.updateCurrentPartnerState(event.target.value, 'hours') } value={ partner.hours } />
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
                Additional Specials:
              </div>
              <div className='col-md-6'>
                <ParnterInfoArea onChange={ (event) => this.updateCurrentPartnerState(event.target.value, 'specials') } value={ partner.specials } />
              </div>
            </div>
            <br />
            <div className='row'>
              <div className='col-md-6'>
                Events
              </div>
              <div className='col-md-6'>
                <ParnterInfoArea onChange={ (event) => this.updateCurrentPartnerState(event.target.value, 'events') } value={ partner.events } />
              </div>
            </div>
            <br/>
            <div className='row'>
              <div className='col-md-6'>
                Discounts
              </div>
              <div className='col-md-6'>
                <ParnterInfoArea onChange={ (event) => this.updateCurrentPartnerState(event.target.value, 'discounts') } value={ partner.discounts } />
              </div>
            </div>
            <br/>
            <div className='d-flex justify-content-center'>
              <button onClick={ (event) => this.updatePartner() } className="btn btn-primary" type="button" aria-expanded="false">
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

const PartnerMarketingPageComponent = connect(mapStateToProps, {
  getPartner
})(PartnerMarketingPage)

//<FlexTable items={ this.state.businesses } selectItem={ this.selectBusiness } getTableEntry={ this.getTableEntry } tableRows={ this.tableRows } />
export default PartnerMarketingPageComponent;