import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import userService from '../../Services/userService.js'
import urlService from '../../Services/urlService.js'


class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {

    let {token} = await this.props.stripe.createToken({
      name: "Name"
    });

    console.log(token)




  }

  render() {
    return (
      <div style={ { minWidth: 300 } } className="checkout">
        <CardElement />
        <br />
        <br />
        <button className="btn btn-info brandong" onClick={ this.submit }>
          Sign Me Up !
        </button>
      </div>
      );
  }
}

export default injectStripe(CheckoutForm);