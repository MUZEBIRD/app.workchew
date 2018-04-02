const express = require('express');

const Rx = require('rxjs');

const router = express.Router();
const payPalWCNodeCLient = require('../Services/wc-paypal.js')
const userService = require('../Services/userService.js')

router.post('/', ({body}, res) => {

  var paypalTransactionData = body.paypalTransactionData

  var paymentID = paypalTransactionData.paymentID

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

      if (findUserbyTokenResponse && findUserbyTokenResponse.length) {
        var user = findUserbyTokenResponse[0]
        user.memberShipInfo.paymentAuth.lastPaymentId = paymentID

        return userService.update(user)
      } else {

        return Rx.Observable.of({
          error: "payment error"
        })
      }

    })

    .subscribe((getPaymentStream) => {

      console.log(" out at get payment stream ", getPaymentStream)

      delete getPaymentStream.password

      res.send({
        getPaymentStream
      })

    })

}); //POST 

module.exports = router;