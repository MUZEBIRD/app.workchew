const express = require('express');

const router = express.Router();

const Login = require('./Login')

const User = require('./User')

const SignUp = require('./SignUp')

const Seats = require('./seatsRoute')

const Business = require('./Business')

const payPal = require('./payPalRoute')
const payPalWCNodeCLient = require('../Services/wc-paypal.js')

const authService = require('../Services/authService')
const businessService = require('../Services/businessService')
const userService = require('../Services/userService')

const pic = require('./Pic')


fs = require('fs')

router.use('/Partners', Business)

router.use('/Business', Business)

router.use('/Login', Login)

router.use('/User', User)

router.use('/SignUp', SignUp)

router.use('/Seats', Seats)

router.use('/pay-pal', payPal)


router.use('/pic', pic)

// GET home page
router.get('/', (req, res) => {

  res.set('Content-Type', 'text/html');

  res.send(fs.readFileSync('./View/build/index.html'));
});

router.post('/memberships/create-stater-membership', (req, res) => {

  res.set('Content-Type', 'application/json');

  payPalWCNodeCLient.createStaterAgreement({
    userEmail: req.body.userEmail,
    _id: req.body._id,
  })

    .subscribe((payPalResponse) => {

      res.send(payPalResponse)

    })

});


router.post('/memberships/create-pro-membership', (req, res) => {

  res.set('Content-Type', 'application/json');

  payPalWCNodeCLient.createProAgreement({
    userEmail: req.body.userEmail,
    _id: req.body._id,
  })

    .subscribe((payPalResponse) => {

      res.send(payPalResponse)

    })

});





router.post('/memberships/execute-membership-agreement', (req, res) => {

  payPalWCNodeCLient.executeAgreement({
    agreementToken: req.body.token,
    _id: req.body._id

  })

    .subscribe((payPalResponse) => {

      res.send(payPalResponse)

    })

});

router.post('/orderslogin', (req, res) => {

  res.set('Content-Type', 'application/json');

  authService.getRole(req.body.token)

    .subscribe(authObject => {

      if (authObject.role == "admin") {

        adminOrdersLogin(req, res, authObject)

      } else {

        chewCheck(req, res, authObject, req.body.bid)

      }


    })

});


var adminOrdersLogin = function(req, res, authObject) {

  businessService.get({})

    .subscribe(business => {

      res.send({
        user: {
          token: req.body.token,
          role: 'admin',
          _id: authObject.userId
        },
        business
      })
    })
}


var chewCheck = function(req, res, authObject, bid) {

  userService.get({
    _id: authObject.userId
  })

    .subscribe(users => {

      if (users
        && users.length
        && users[0].bid
        && users[0].bid.length
        && (users[0].bid == bid)) {

        partnerOrdersLogin(req, res, bid, authObject)

      } else if (users
        && users.length
      ) {

        coChewerLogin(req, res, bid, authObject)

      }

    })
}

var coChewerLogin = function(req, res, bid, authObject) {

  businessService.get({
    _id: bid
  })

    .subscribe(business => {

      res.send({
        user: {
          token: req.body.token,
          role: 'coChewer',
          _id: authObject.userId
        },
        business
      })
    })
}


var partnerOrdersLogin = function(req, res, bid, authObject) {

  businessService.get({
    _id: bid
  })
    .subscribe(business => {

      res.send({
        user: {
          token: req.body.token,
          role: 'partner',
          _id: authObject.userId
        },
        business
      })
    })
}



module.exports = router;