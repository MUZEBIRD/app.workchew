const express = require('express');

const router = express.Router();

const Login = require('./Login')

const User = require('./User')

const SignUp = require('./SignUp')

const Seats = require('./seatsRoute')

const Business = require('./Business')

const payPal = require('./payPalRoute')

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





router.get('/.well-known/acme-challenge/iTbGriE_3A-t_SPvN8Y60lS1aYoCmhW3_bzQFUooCI0', (req, res) => {

  res.set('Content-Type', 'text/html');

  res.send('iTbGriE_3A-t_SPvN8Y60lS1aYoCmhW3_bzQFUooCI0.MZ6I80nW0Grt-Pp4hrEoIYVw6K5_iohvHbW4GyHTm70');
});





router.post('/orderslogin', (req, res) => {

  res.set('Content-Type', 'application/json');

  authService.getRole(req.body.token)

    .subscribe(authObject => {

      if (authObject.role == "admin") {

        adminOrdersLogin(req, res)

      } else {

        chewCheck(req, res, authObject, req.body.bid)

      }


    })

});


var adminOrdersLogin = function(req, res) {

  businessService.get({})

    .subscribe(business => {

      res.send({
        user: {
          token: req.body.token,
          role: 'admin'
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

        partnerOrdersLogin(req, res, bid)

      } else if (users
        && users.length
      ) {

        coChewerLogin(req, res, bid)

      }

    })
}

var coChewerLogin = function(req, res, bid) {

  businessService.get({
    _id: bid
  })

    .subscribe(business => {

      res.send({
        user: {
          token: req.body.token,
          role: 'coChewer'
        },
        business
      })
    })
}


var partnerOrdersLogin = function(req, res, bid) {

  businessService.get({
    _id: bid
  })
    .subscribe(business => {

      res.send({
        user: {
          token: req.body.token,
          role: 'partner'
        },
        business
      })
    })
}



module.exports = router;