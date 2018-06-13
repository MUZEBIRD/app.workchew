const express = require('express');

const router = express.Router();

const Login = require('./Login')

const User = require('./User')

const SignUp = require('./SignUp')

const Seats = require('./seatsRoute')

const Business = require('./Business')

const payPal = require('./payPalRoute')

fs = require('fs')

router.use('/Partners', Business)

router.use('/Business', Business)

router.use('/Login', Login)

router.use('/User', User)

router.use('/SignUp', SignUp)

router.use('/Seats', Seats)

router.use('/pay-pal', payPal)

// GET home page
router.get('/', (req, res) => {

  res.set('Content-Type', 'text/html');

  res.send(fs.readFileSync('./View/build/index.html'));
});

module.exports = router;