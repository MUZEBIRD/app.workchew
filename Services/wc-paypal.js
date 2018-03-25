/*
mb-facilitator@workchew.com
twochains

mb-buyer@workchew.com
runner08
*/

const Rx = require('rxjs');

var paypal = require('paypal-rest-sdk');

const payPalSandBoxConfig = {
  'mode': 'sandbox', //sandbox or live
  'client_id': 'ARlX_FQiPMWYBBxHdmAuPnIh4lF0YChw3Ju8R6oPiFfPS7NW74VcNadMQmDuXUmOwlKO215-DIZ4rtVp',
  'client_secret': 'EIkza4HNFtXuq9LBIulUqlzmyHxuUbtm7fR5zo5FnobdLCVQgu7l6Zp6hrI0xbn4eG9oqRuXv7O2dgnD'
}

paypal.configure(payPalSandBoxConfig);

var getPayment = function(paymentId) {

  return Rx.Observable.create(function(observer) {

    paypal.payment.get(paymentId, function(error, payment) {
      if (error) {
        observer.error(error)
        throw error;
      } else {
        observer.next(payment)
      }
    }); //paypal.payment.get(

  })

} //getPayment

var paymentId = "PAY-1AB70526TK0449927LK37UJQ";

getPayment(paymentId)

  .subscribe((paymentStream) => {

    console.log(" paymentStream");
    console.log(JSON.stringify(paymentStream));

  }, (error) => {

    console.log(" paymentStream Error");
    console.log(JSON.stringify(error));
  })
