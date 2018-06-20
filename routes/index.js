const express = require('express');

const router = express.Router();

const Login = require('./Login')

const User = require('./User')

const SignUp = require('./SignUp')

const Seats = require('./seatsRoute')

const Business = require('./Business')

const payPal = require('./payPalRoute')


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


router.get('/.well-known/acme-challenge/1WZzEdUoADgIQpLVzNFoscb-WDicZqJAGCtpVlgjzHs', (req, res) => {

  res.set('Content-Type', 'text/html');

  res.send('1WZzEdUoADgIQpLVzNFoscb-WDicZqJAGCtpVlgjzHs.MZ6I80nW0Grt-Pp4hrEoIYVw6K5_iohvHbW4GyHTm70');
});

module.exports = router;