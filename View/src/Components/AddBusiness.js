import React, { Component } from 'react';
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

import { ListInputWidget } from './shared/';

const addBusinessSubject = new Subject();

class AddBusiness extends Component {

  constructor(props) {

    super(props);

    this.state = {
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

  discountItemProperties =[
    {
      name: 'name'
    },
    {
      name: 'description',
      type: 'textarea'
    }
  ]

  onRemoveListItem(i, listKey) {

    console.log('onRemoveListItem', i, listKey)

  }

  onAddListItem(listKey) {

    console.log('onAddListItem', listKey)

  }


  render() {


    var discountListWidgetProps = {

      items: this.state.business.discounts || [],
      itemTitle: "discount",
      title: "Discounts",
      itemPropList: this.discountItemProperties,
      removeItem: (i) => {

        console.log('onRemoveListItem', i)

        this.state.business.discounts.splice(i, 1)

        this.setState({
          business: this.state.business
        })

      },
      addItem: () => {

        this.state.business.discounts.push({})

        console.log('onAddListItem')

        this.setState({
          business: this.state.business
        })

      }

    }

    console.log(addBusinessSubject, 'addBusinessStream')

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
                </div>
              </div>
            </div>
            <br />
            <div className="row">
              <div className='col-sm-6'>
                <BusinessSeatWidget />
              </div>
              <div className='col-sm-3'>
                <BusinessTagsWidget />
              </div>
              <div className='col-sm-3'>
                <ListInputWidget {...discountListWidgetProps} />
              </div>
              <br/>
            </div>
          </div>
        </div>
      </div>

      );
  }

}

export default AddBusiness;