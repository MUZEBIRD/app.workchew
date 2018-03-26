const express = require('express');

const router = express.Router();
const payPalWCNodeCLient = require('../services/wc-paypal.js')
const userService = require('../Services/userService.js')

router.post('/', ({body}, res) => {

  var paypalTransactionData = body.paypalTransactionData

  var paymentID = paypalTransactionData.paymentID

  console.log(paymentID, paypalTransactionData)

  payPalWCNodeCLient

    .getPayment(paymentID)

    .switchMap((getPaymentStream) => {

      var transactions = getPaymentStream.transactions;

      var state = getPaymentStream.state;
      //  getPaymentStream.state should be 'approved'

      var transaction = transactions[0];

      var description = transaction.description

      var amount = transaction.amount;

      var custom = transaction.custom;

      return userService.get({
        'memberShipInfo.paymentAuth.token': custom
      })

    })

    .switchMap(findUserbyTokenResponse => {

      var user = findUserbyTokenResponse[0]
      user.memberShipInfo.paymentAuth.lastPaymentId = paymentID

      return userService.update(user)

    })

    .subscribe((getPaymentStream) => {

      res.send({
        getPaymentStream
      })



    })

}); //POST 

module.exports = router;