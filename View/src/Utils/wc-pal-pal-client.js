import restService from '../Services/restService.js'
import urlService from '../Services/urlService.js'
import userService from '../Services/userService.js'

import { loaderStream } from '../Components/shared/workLoader'

import { signUpDialogSubject } from '../Components/SignUp/M3mberships'


var verifyPayPalTransaction = function(paypalTransactionData, signUpData) {
  loaderStream.next(true)

  restService
    .post(urlService.payPal, {

      signUpData,

      paypalTransactionData,

    }, {
      "x-api-access-token": paypalTransactionData.token
    })

    .subscribe((verifyPayPalTransactionResponse) => {

      loaderStream.next(false)

      var signUpMessage = "Sign up error try again"

      var {getPaymentStream} = verifyPayPalTransactionResponse

      if (getPaymentStream && getPaymentStream._id) {

        var {memberShipInfo} = getPaymentStream;

        if (memberShipInfo) {

          var {paymentAuth} = memberShipInfo

          if (paymentAuth && paymentAuth.lastPaymentId) {

            signUpMessage = " Sign up success ! , check your email for next steps"

          }

        }

      }

      signUpDialogSubject.next({
        dialogMsg: signUpMessage,
        showDialog: true,
        signUpComplete: true
      })

    })

}

var placeButton = function(config) {

  var {price, elementKey, membershipName} = config;

  var paypal = window['paypal'];

  paypal.Button.render({

    // Set your environment

    env: 'sandbox', // sandbox | production

    // Specify the style of the button

    style: {
      label: 'buynow',
      // fundingicons: true, // optional
      fundingicons: true,
      branding: true, // optional
      size: 'medium', // small | medium | large | responsive
      shape: 'rect', // pill | rect
      color: 'blue' // gold | blue | silve | black
    },

    // PayPal Client IDs - replace with your own
    // Create a PayPal app: https://developer.paypal.com/developer/applications/create

    client: {
      sandbox: 'ARlX_FQiPMWYBBxHdmAuPnIh4lF0YChw3Ju8R6oPiFfPS7NW74VcNadMQmDuXUmOwlKO215-DIZ4rtVp',
    //production: '<insert production client id>'
    },

    // Wait for the PayPal button to be clicked

    payment: function(data, actions) {

      var signUpData = userService.getSignUpData();

      return actions.payment.create({
        transactions: [{
          description: `${membershipName} for: ${signUpData.email}`,
          amount: {
            total: price,
            currency: 'USD'
          },
          item_list: {
            items: [{
              name: `${membershipName}`,
              description: `${membershipName} for: ${signUpData.email}`,
              price: price,
              quantity: 1,
              currency: "USD"
            }]
          }
        }]
      });

    },

    // Wait for the payment to be authorized by the customer

    onAuthorize: function(data, actions) {

      var signUpData = userService.getSignUpData();

      var memberShipInfo = signUpData.memberShipInfo

      return actions.payment.execute().then(function() {

        console.log("actions", actions, data)

        verifyPayPalTransaction(data, signUpData)

      });
    }

  }, `#${elementKey}`);

}

export { placeButton, verifyPayPalTransaction }