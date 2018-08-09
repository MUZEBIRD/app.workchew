import React, { Component } from 'react';

import { Elements } from 'react-stripe-elements';
import CheckoutForm from './checkoutForm'
import { getQueryParams, getPathVariables } from '../../Utils'

const StarterDisplay = () => (<div>
                                <h1 className="Brandon_bld">Starter Membership</h1>
                                <br/>
                                <h3 className="brandong">$49.99</h3>
                                <br/>
                                <h5 className="brandong">BILLED MONTHLY</h5>
                              </div>)

const ProDisplay = () => (<div>
                            <h1 className="Brandon_bld">Pro Membership</h1>
                            <br/>
                            <h3 className="brandong">$99.99</h3>
                            <br/>
                            <h5 className="brandong">BILLED MONTHLY</h5>
                          </div>)

const DayDisplay = () => (<div>
                            <h1 className="Brandon_bld">One Day pass</h1>
                            <br/>
                            <h3 className="brandong">$14.99</h3>
                            <br/>
                            <h5 className="brandong">ONE TIME CHARGE</h5>
                          </div>)

class PaymentPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    var {chargeType} = getQueryParams()

    return (
      <div className="h-100 d-flex flex-column  align-items-center">
        <br/>
        { chargeType === "starter" && <StarterDisplay/> }
        { chargeType === "pro" && <ProDisplay/> }
        { chargeType === "day" && <DayDisplay/> }
        <br/>
        <div>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
      );
  }
}

export default PaymentPage;