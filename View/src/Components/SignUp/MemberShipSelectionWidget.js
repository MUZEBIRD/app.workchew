import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import userService from '../../Services/userService.js'
import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'


import { placeButton } from '../../Utils/wc-pal-pal-client.js'

import { getQueryParams, getPathVariables } from '../../Utils/'


const pricingOptions = [

  {
    id: "ONE-DAY-PASS",
    title: "ONE-DAY  PASS",
    price: 14.99,
    paymentRecurrence: "ONE TIME CHARGER",
    mainFeature: "Access to one WorkChew location.",
    features: [
      {
        text: "Food/drink discounts"
      },
      {
        text: "Complimentary perks at chosen WorkChew location"
      },
      {
        text: "Access to events at chosen WorkChew locations"
      }
    ]
  },
  {
    id: "STARTER",
    title: "STARTER",
    price: 39.99,
    paymentRecurrence: "BILLED MONTHLY",
    mainFeature: "One-day access to all WorkChew locations.",
    features: [
      {
        text: "Food/drink discounts"
      },
      {
        text: "Complimentary perks at chosen WorkChew location"
      },
      {
        text: "Access to events at chosen WorkChew locations"
      }
    ]
  },
  {
    id: "PREMIUM",
    title: "PREMIUM",
    price: 69.99,
    paymentRecurrence: "BILLED MONTHLY",
    mainFeature: "One-day access to all WorkChew locations.",
    features: [
      {
        text: "$10 food credit Food/drink discounts."
      },
      {
        text: "Complimentary perks at chosen WorkChew location"
      },
      {
        text: "Access to events at chosen WorkChew locations"
      }
    ]
  },

  {
    id: "PRO",
    title: "PRO",
    price: 99.99,
    paymentRecurrence: "BILLED MONTHLY",
    mainFeature: "One-day access to all WorkChew locations.",
    features: [
      {
        text: "$50 food credit Food/drink discounts."
      },
      {
        text: "Complimentary perks at chosen WorkChew location"
      },
      {
        text: "Access to events at chosen WorkChew locations"
      }
    ]
  },

]

const MemberShipSelectionWidget = (props) => {


  return (

    <div className='row pricing-box d-flex align-items-start'>
      { props.pricings.map(
          (pricing, i) => (
            <div key={ i } className='col-sm-3 h-100 d-flex flex-column justify-content-around'>
              <p>
                { pricing.title }
              </p>
              <p>
                $
                { pricing.price }
              </p>
              <p>
                { pricing.paymentRecurrence }
              </p>
              <p>
                { pricing.mainFeature }
              </p>
              <div>
                { pricing.features.map(
                    (feature, j) => (<p key={ j }>
                                       { feature.text }
                                     </p>)
                  ) }
              </div>
              <br/>
              <div id={ `${pricing.id}-button` }>
              </div>
            </div>)
        ) }
    </div>

  )
}

export { MemberShipSelectionWidget, pricingOptions }