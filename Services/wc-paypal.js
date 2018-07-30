/*
mb-facilitator@workchew.com
twochains

mb-buyer@workchew.com
runner08
*/

var basePayPalUrl = "https://api.sandbox.paypal.com";

const Rx = require('rxjs');

var paypal = require('paypal-rest-sdk');


var request = require('request')

var client_id = 'ARlX_FQiPMWYBBxHdmAuPnIh4lF0YChw3Ju8R6oPiFfPS7NW74VcNadMQmDuXUmOwlKO215-DIZ4rtVp';
var client_secret = 'EIkza4HNFtXuq9LBIulUqlzmyHxuUbtm7fR5zo5FnobdLCVQgu7l6Zp6hrI0xbn4eG9oqRuXv7O2dgnD';

const payPalSandBoxConfig = {
  'mode': 'sandbox', //sandbox or live
  'client_id': 'ARlX_FQiPMWYBBxHdmAuPnIh4lF0YChw3Ju8R6oPiFfPS7NW74VcNadMQmDuXUmOwlKO215-DIZ4rtVp',
  'client_secret': 'EIkza4HNFtXuq9LBIulUqlzmyHxuUbtm7fR5zo5FnobdLCVQgu7l6Zp6hrI0xbn4eG9oqRuXv7O2dgnD'
}

paypal.configure(payPalSandBoxConfig);

var getPayment = function(paymentId) {

  console.log("paymentIdpaymentIdpaymentId", paymentId)

  return Rx.Observable.create(function(observer) {

    paypal.payment.get(paymentId, function(error, payment) {
      if (error) {
        observer.error(error)
        observer.complete()

        throw error;
      } else {
        observer.next(payment)
        observer.complete()

      }
    }); //paypal.payment.get(

  })

} //getPayment

var getAccessToken = function() {

  return Rx.Observable.create(function(observer) {

    request.post({
      url: basePayPalUrl + '/v1/oauth2/token?grant_type=client_credentials',

      headers: {

        "Content-Type": "x-www-form-urlencoded",
        "Authorization": "Basic " + Buffer.from(client_id + ":" + client_secret).toString('base64')

      }

    }, function(err, httpResponse, body) {

      observer.next(JSON.parse(body))
      observer.complete()

    })

  })

}

var createStaterAgreement = function(data) {

  return Rx.Observable.create(function(observer) {

    var d = new Date();
    var start_date = d.toISOString();


    request.post({
      url: basePayPalUrl + '/v1/payments/billing-agreements',

      headers: {

        "Content-Type": "application/json",
        "Authorization": "Basic " + Buffer.from(client_id + ":" + client_secret).toString('base64')

      },
      body: JSON.stringify({
        "name": "Stater Agreement",
        "description": "stater agreement for " + data.userEmail,
        "start_date": start_date,
        "payer": {
          "payment_method": "paypal",
          "payer_info": {
            "email": data.userEmail
          }
        },
        "plan": {
          "id": data.planID
        }
      })

    }, function(err, httpResponse, body) {

      observer.next(JSON.parse(body))
      observer.complete()

    })

  })

}

var excuteAgreement = function(data) {

  return Rx.Observable.create(function(observer) {

    request.post({
      url: basePayPalUrl + '/v1/payments/billing-agreements/' + data.agreementToken + '/agreement-execute',

      headers: {

        "Content-Type": "application/json",
        "Authorization": "Basic " + Buffer.from(client_id + ":" + client_secret).toString('base64')

      }

    }, function(err, httpResponse, body) {

      observer.next(JSON.parse(body))
      observer.complete()

    })

  })

}

var getAgreementDetials = function(data) {

  return Rx.Observable.create(function(observer) {

    request.get({
      url: basePayPalUrl + '/v1/payments/billing-agreements/' + data.agreementID,

      headers: {

        "Content-Type": "application/json",
        "Authorization": "Basic " + Buffer.from(client_id + ":" + client_secret).toString('base64')

      }

    }, function(err, httpResponse, body) {

      observer.next(JSON.parse(body))
      observer.complete()

    })

  })

}


getAgreementDetials({
  agreementID: "I-YS2554FTVFYU"
})

  .subscribe((done) => {

    var {id, agreement_details} = JSON.parse(done)

    console.log(agreement_details)

  })

module.exports = {
  getPayment
}
// var paymentId = "PAY-1AB70526TK0449927LK37UJQ";

// getPayment(paymentId)

//   .subscribe((paymentStream) => {

//     console.log(" paymentStream");
//     console.log(JSON.stringify(paymentStream));

//   }, (error) => {

//     console.log(" paymentStream Error");
//     console.log(JSON.stringify(error));
//   })
