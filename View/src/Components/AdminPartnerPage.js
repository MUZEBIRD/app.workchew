import React, { Component } from 'react';

import { connect } from 'react-redux'


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
import DiscountListWidget from './Business/DiscountListWidget.js'

import { ListInputWidget } from './shared/';
import ParnterInfoArea from './Partner/PartnerInfoArea'


import { getQueryParams, getPathVariables } from '../Utils'
import * as partnerActions from './Partner/actions'

var {getPartner} = partnerActions


const addBusinessSubject = new Subject();

class AdminPartnerPage extends Component {

  constructor(props) {

    super(props);

    this.state = {
      pictures: [],
      partner: {},
      business: {

        discounts: [
          {
            name: 'fun discount',
            description: "the best ever"
          },
          {
            name: 'crazy discount',
            description: "woo woo"
          }
        ]

      }
    };

    userService.checkLoginStatus()

  }

  onRemoveListItem = (i, listKey) => {

    console.log('onRemoveListItem', i, listKey)

  }

  onAddListItem = (listKey) => {

    console.log('onAddListItem', listKey)

  }

  onListUpdate = ({key, items}) => {

    this.state.business[key] = items;
    var nuTime = {
      ...this.state.business
    }

    nuTime[key] = items

    this.setState({
      business: nuTime
    }, () => {


      console.log('afted list update', this.state.business)
    })

  }




  render() {

    var partner = this.state.partner || this.props.partner

    console.log(addBusinessSubject, 'addBusinessStream   this.state', this.state)

    var props = {

      title: "Add/Edit Businesses",
      addBusinessSubject
    }

    return (

      <div className="wholeView flex-col">
        <div className="showView">
          <div className="scrollView">
            <Topbar { ...props } />
            <br/>
            <br/>
            <div className="row">
              <BusinessForm { ...props } />
              <div className='col-sm-6'>
                <BusinessMapForm { ...props } />
                <br/>
                <div id="businessGeoCoordinates">
                  <div className="row">
                    <div className='col-sm-2'>
                      Latitude
                    </div>
                    <div className='col-sm-10'>
                      <input id="business-geoPoint-latitude" className="form-control" />
                    </div>
                  </div>
                  <br/>
                  <div className="row">
                    <div className='col-sm-2'>
                      Longitude
                    </div>
                    <div className='col-sm-10'>
                      <input id="business-geoPoint-longitude" className="form-control" />
                    </div>
                  </div>
                  <br/>
                </div>
              </div>
            </div>
            <br/>
          </div>
        </div>
      </div>

      );
  }

}

const mapStateToProps = (state, ownProps) => ({
  partner: state.partners.current
})

const AdminPartnerPageComponent = connect(mapStateToProps, {
  getPartner
})(AdminPartnerPage)


export default AdminPartnerPageComponent;