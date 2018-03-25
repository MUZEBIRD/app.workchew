const express = require('express');

const router = express.Router();
const payPalWCNodeCLient = require('../services/wc-paypal.js')

router.post('/', ({body}, res) => {

  var {paypalTransactionData: {paymentID}} = body


  var paypalTransactionData = body.paypalTransactionData


  var paymentID = paypalTransactionData.paymentID

  console.log(paymentID, paypalTransactionData)
  payPalWCNodeCLient.getPayment(paymentID).subscribe((getPaymentStream) => {

    res.send({
      getPaymentStream
    })


  })

}); //POST 


module.exports = router;