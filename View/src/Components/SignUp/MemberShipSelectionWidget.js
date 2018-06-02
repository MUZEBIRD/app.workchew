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
      },
      {
        text: "Fast Wifi"
      }
    ]
  },
  {
    id: "STARTER",
    title: "STARTER",
    price: 39.99,
    paymentRecurrence: "BILLED MONTHLY",
    mainFeature: "Access to one WorkChew location",
    features: [
      {
        text: "Food/drink discounts"
      },
      {
        text: "Complimentary perks at chosen WorkChew location"
      },
      {
        text: "Access to events at chosen WorkChew locations"
      },
      {
        text: "Fast Wifi"
      }
    ]
  },
  {
    id: "PREMIUM",
    title: "PREMIUM",
    price: 69.99,
    paymentRecurrence: "BILLED MONTHLY",
    mainFeature: " Unlimited access to all WorkChew locations ",
    features: [
      {
        text: "$10 food credit."
      },
      {
        text: "Food/drink discounts."
      },
      {
        text: "Exclusive perks, community benefits and access to events at all WorkChew locations."
      },
      {
        text: "Fast Wifi"
      }
    ]
  },

  {
    id: "PRO",
    title: "PRO",
    price: 49.99,
    paymentRecurrence: "BILLED MONTHLY",
    mainFeature: "Unlimited access to all WorkChew locations ",
    features: [
      {
        text: "$50 food credit Food/drink discounts."
      },
      {
        text: "Food/drink discounts."
      },
      {
        text: "Exclusive perks, community benefits and access to events at all WorkChew locations."
      },
      {
        text: "Fast Wifi"
      }
    ]
  },

]


const pricingOptions3 = [

  {
    id: "ONE-DAY-PASS",
    title: "DAY PASS",
    price: 69.99,
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
    price: 39.99,
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
    price: 69.99,
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

const MemberShipSelectionWidget = (props) => {

  return (

    <div className='row pricing-box w-100 d-flex flex-wrap justify-content-center'>
      { props.pricings.map(
          (pricing, i) => (
            <div key={ i } style={ { width: 300 } } className='h-100 d-flex flex-column justify-content-around'>
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

export { MemberShipSelectionWidget, pricingOptions, pricingOptions3 }