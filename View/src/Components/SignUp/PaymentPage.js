import React, { Component } from 'react';

import { Elements } from 'react-stripe-elements';
import CheckoutForm from './checkoutForm'

class PaymentPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <Elements>
          <CheckoutForm />
        </Elements>
      </div>
      );
  }
}

export default PaymentPage;