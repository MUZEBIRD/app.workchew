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
    id: "ONE_DAY_PASS",
    title: "DAY PASS",
    price: 14.99,
    paymentRecurrence: "ONE TIME CHARGER",
    features: [
      {
        text: "Access to one WorkChew location of your choosing"
      },
      {
        text: "Access to high speed wi-fi and portable chargers for the day"
      },
      {
        text: "Access to special discounts on menu items for the day"
      },
      {
        text: "Access to one event happening that day"
      },
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
        text: "Access to high speed wi-fi and portable chargers"
      },
      {
        text: "Access to one event happening that day"
      },
      {
        text: "Access to special discounts on menu items"
      },
      {
        text: "Access to all WorkChew professional and social events"
      },
    ]
  },
  {
    id: "PRO",
    title: "PRO",
    option: "createProMembership",
    price: 99.99,
    paymentRecurrence: "BILLED MONTHLY",
    features: [

      {
        text: "Access to all WorkChew location"
      },
      {
        text: "Access to high speed wi-fi and portable chargers"
      },
      {
        text: "Access to all WorkChew Events"
      },
      {
        text: "Ability to create custom events promoted on WorkChew platform"
      },
      {
        text: "Access to WorkChew Pro only events"
      },
      {
        text: "Priority access to WorkChew Pro+ which includes 9am-5pm locations"
      },
    ]
  }

]

var selectedMemberShip = function(memberShipInfo) {


  console.log("hit", memberShipInfo)

  userService.get({
    params: {
      _id: 1
    }
  })

    .subscribe((localUser) => {
      console.log('memberShipInfo', memberShipInfo)

      if (localUser && localUser._id) {

        switch (memberShipInfo.id) {
          case "ONE_DAY_PASS": {
            window.location.hash = `payment-page?id=${localUser._id}&chargeType=day`;
            break;
          }
          case "STARTER": {
            window.location.hash = `payment-page?id=${localUser._id}&chargeType=starter`;
            break;


          }
          case "PRO": {
            window.location.hash = `payment-page?id=${localUser._id}&chargeType=pro`;
            break;

          }
          default:
            // code...
            break;
        }

      }

    });

}

const M3mberShipSelectionWidget = (props) => {

  return (

    <div>
      <div className='row w-100 d-flex flex-wrap justify-content-around'>
        { pricingOptions3.map(
            (pricing, i) => (
              <div key={ i } style={ { width: 300 } } className='d-flex brandong flex-column'>
                <p className="Brandon_bld">
                  { pricing.title }
                </p>
                <h2 className="brandong">${ pricing.price }</h2>
                <p>
                  { pricing.paymentRecurrence }
                </p>
              </div>)
          ) }
      </div>
      <div className="d-flex flex-column brandong align-items-center w-100" style={ { border: '1px solid black' } }>
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
                    (feature, j) => (<p className="brandong" key={ j }>
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
              <div key={ i } style={ { width: 300 } }>
                <button onClick={ (event) => {
                                  
                                    selectedMemberShip(pricing)
                                  
                                  } } className="btn btn-info brandong">
                  Sign Me Up !
                </button>
              </div>)
          ) }
      </div>
    </div>

  )
}

export { M3mberShipSelectionWidget, pricingOptions3 }