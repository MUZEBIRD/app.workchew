const express = require('express');

const router = express.Router();

const Login = require('./Login')

const User = require('./User')

const SignUp = require('./SignUp')

const Seats = require('./SeatsRoute')

const Business = require('./Business')
fs = require('fs')

router.use('/Business', Business)

router.use('/Login', Login)

router.use('/User', User)

router.use('/SignUp', SignUp)

router.use('/Seats', Seats)


const payPal = require('./payPalRoute')

router.use('/pay-pal', payPal)



// GET home page
router.get('/', (req, res) => {

  res.set('Content-Type', 'text/html');

  res.send(fs.readFileSync('./View/build/index.html'));
});


router.get('/checkout', (req, res) => {

  res.set('Content-Type', 'text/html');

  res.send(fs.readFileSync('./View/checkout/index.html'));
});

module.exports = router;