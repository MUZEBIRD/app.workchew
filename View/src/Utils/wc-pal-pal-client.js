import restService from '../Services/restService.js'
import urlService from '../Services/urlService.js'
import userService from '../Services/userService.js'

var verifyPayPalTransaction = function(paypalTransactionData) {

  restService
    .post(urlService.payPal, {
      paypalTransactionData,

    }, {
      "x-api-access-token": paypalTransactionData.custom
    })

    .subscribe((verifyPayPalTransactionResponse) => {

      console.log('verifyPayPalTransactionResponse', verifyPayPalTransactionResponse)

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

      var memberShipInfo = signUpData.memberShipInfo

      var paymentAuth = memberShipInfo.paymentAuth

      var token = paymentAuth.token;

      return actions.payment.create({
        transactions: [{
          amount: {
            total: price,
            currency: 'USD'
          },
          custom: token,
          item_list: {
            items: [{
              name: membershipName,
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


      return actions.payment.execute().then(function() {
        verifyPayPalTransaction(data)

        window.alert('Payment Complete!');

      });
    }

  }, `#${elementKey}`);

}

export { placeButton, verifyPayPalTransaction }