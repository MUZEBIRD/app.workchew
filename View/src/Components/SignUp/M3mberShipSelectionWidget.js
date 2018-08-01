import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import userService from '../../Services/userService.js'
import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'

import { placeButton } from '../../Utils/wc-pal-pal-client.js'

import { getQueryParams, getPathVariables } from '../../Utils/'
import WorkLoader, { loaderStream } from '../shared/workLoader';

const pricingOptions3 = [

  {
    id: "ONE-DAY-PASS",
    title: "DAY PASS",
    price: 14.99,
    paymentRecurrence: "ONE TIME CHARGER",
    features: [
      {
        text: "Access to one WorkChew location"
      },
      {
        text: " Access to networking and social events occurring on that day"
      }
    ]
  },
  {
    id: "STARTER",
    title: "STARTER",
    option: "createStaterMembership",
    price: 49.99,
    paymentRecurrence: "BILLED MONTHLY",
    mainFeature: "Access to one WorkChew location",
    features: [
      {
        text: "Access to all WorkChew location"
      },
      {
        text: "$10 food credit"
      },
      {
        text: "Access to all networking & social events"
      }
    ]
  },
  {
    id: "Pro",
    title: "PRO",
    option: "createProMembership",
    price: 99.99,
    paymentRecurrence: "BILLED MONTHLY",
    features: [

      {
        text: "Access to all WorkChew location"
      },

      {
        text: "$40 food credit."
      },
      {
        text: "Priority access to all networking & social events"
      },
      {
        text: "Priority access to private dining & meeting spaces"
      },
      {
        text: "Ability to create custom events"
      }
    ]
  }

]


var selectedMemberShip = function(memberShipInfo) {

  console.log('memberShipInfo', memberShipInfo)
  loaderStream.next(true)
  userService.get({
    params: {
      _id: 1
    }
  })

    .switchMap(({_id, email}) => {

      return userService[memberShipInfo.option]({
        _id,
        userEmail: email
      })

    })

    .subscribe((starterResponse) => {

      console.log('starterResponse', starterResponse)

      var {approvalUrl} = starterResponse;

      window.location.href = approvalUrl.href

    })


}

const M3mberShipSelectionWidget = (props) => {

  return (

    <div className='row'>
      <div className='col-sm-12'>
        <div className='row w-100 d-flex flex-wrap justify-content-around'>
          { pricingOptions3.map(
              (pricing, i) => (
                <div key={ i } style={ { width: 300 } } className='d-flex flex-column'>
                  <p>
                    { pricing.title }
                  </p>
                  <h2>${ pricing.price }</h2>
                  <p>
                    { pricing.paymentRecurrence }
                  </p>
                </div>)
            ) }
        </div>
        <div className="d-flex flex-column align-items-center w-100" style={ { border: '1px solid black' } }>
          <br/>
          <h3>A M E N I T I E S</h3>
          <br/>
          <div id="priceLet-container" className="d-flex w-100 ae-3 done">
            <div className="flex-1 flex-column align-items-center">
              <img width="80" height="50" src={ "/static/images/Wifi.png" } />
              <br/>
              <strong>Fast <br/> WiFi</strong>
              <br/>
              <br/>
            </div>
            <div className="flex-1 d-flex justify-content-between">
              <div className="flex-1 flex-column align-items-center">
                <img width="80" height="50" src={ "/static/images/Weekly_Social_Events.png" } />
                <br/>
                <strong>Weekly Networking + <br/> Social Events</strong>
                <br/>
                <br/>
              </div>
              <div className="flex-1 flex-column align-items-center">
                <img width="80" height="50" src={ "/static/images/Portbale_Charger.png" } />
                <br/>
                <strong>Portable <br/> Chargers</strong>
                <br/>
                <br/>
              </div>
            </div>
            <div className="flex-1 flex-column align-items-center">
              <img width="80" height="50" src={ "/static/images/Food_Drink_Discounts.png" } />
              <br/>
              <strong>Food & Drink <br/> Discounts</strong>
              <br/>
              <br/>
            </div>
          </div>
        </div>
        <br/>
        <div className='row w-100 d-flex flex-wrap justify-content-around'>
          { pricingOptions3.map(
              (pricing, i) => (
                <div key={ i } style={ { width: 300 } } className='d-flex flex-column'>
                  { pricing.features.map(
                      (feature, j) => (<p key={ j }>
                                         <img className="chewCheck" style={ { height: 20 } } src={ "static/images/chewCheck.png" } />
                                         { feature.text }
                                       </p>)
                    ) }
                </div>)
            ) }
        </div>
        <div className='row w-100 d-flex flex-wrap justify-content-around'>
          { pricingOptions3.map(
              (pricing, i) => (
                <div key={ i } style={ { width: 300 } } className='d-flex justify-content-center'>
                  { (i == 0) && <div id={ `${pricing.id}-button` }>
                                </div> }
                  { (i != 0) && <img onClick={ (event) => {
                                   
                                     selectedMemberShip(pricing)
                                   
                                   } } style={ { height: 75, width: 250 } } src={ "static/images/fay-pal.png" } /> }
                </div>)
            ) }
        </div>
      </div>
    </div>

  )
}

export { M3mberShipSelectionWidget, pricingOptions3 }