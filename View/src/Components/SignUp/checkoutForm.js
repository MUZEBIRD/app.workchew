import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import userService from '../../Services/userService.js'
import urlService from '../../Services/urlService.js'
import { getQueryParams, getPathVariables } from '../../Utils'


import { Observable } from 'rxjs'

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit = (ev) => {

    userService.get({
      params: {
        _id: 1
      }
    })

      .switchMap((localUser) => {

        if (localUser && localUser._id) {

          return this.createToken(localUser.email)

            .switchMap(({token}) => {

              return this.processPayment(token, localUser._id)

            })

        } else {

          return Observable.of(null)

        }

      })

      .subscribe((processPaymentResponse) => {

        console.log('processPaymentResponse', processPaymentResponse)

        if (processPaymentResponse) {

        } else {


        }

      })

  }

  createToken = (email) => Observable.fromPromise(this.props.stripe.createToken({
    name: `${email}_token`
  }))

  processPayment = (token, _id) => {

    var {chargeType} = getQueryParams()

    switch (chargeType) {
      case "starter": {

        return userService.createStripeStarterMembership({
          _id,
          token
        })

      }
      case "pro": {
        return userService.createStripeStarterMembership({
          _id,
          token
        })
      }
      case "day": {
        return userService.chargeForDayPass({
          _id,
          token
        })

      }
      default:
        // code...
        break;
    }

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