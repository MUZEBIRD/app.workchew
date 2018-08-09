import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {

    let {token} = await this.props.stripe.createToken({
      name: "Name"
    });

  }

  render() {
    return (
      <div style={ { minWidth: 300 } } className="checkout">
        <CardElement />
        <br />
        <button className="btn btn-info brandong" onClick={ this.submit }>
          Sign Me Up !
        </button>
      </div>
      );
  }
}

export default injectStripe(CheckoutForm);