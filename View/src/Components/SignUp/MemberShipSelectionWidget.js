import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import userService from '../../Services/userService.js'
import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'


import { getQueryParams, getPathVariables } from '../../Utils'


const pricingOptions = [

  {
    title: "ONE-DAY  PASS",
    price: "$14.99",
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
    title: "STARTER",
    price: "$39.99",
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
    title: "PREMIUM",
    price: "$69.99",
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
    title: "PRO",
    price: "$99.99",
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

    <div className='row flex-row-center-vert'>
      <div className='col-sm-3'>
      </div>
      <div className='col-sm-3'>
      </div>
      <div className='col-sm-3'>
      </div>
      <div className='col-sm-3'>
      </div>
    </div>

  )
}

export { MemberShipSelectionWidget, pricingOptions }