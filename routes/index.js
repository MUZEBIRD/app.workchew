const express = require('express');

const router = express.Router();

const Login = require('./Login')

const User = require('./User')

const SignUp = require('./SignUp')

const Pic = require('./Pic')


router.use('/Login', Login)

router.use('/User', User)

router.use('/SignUp', SignUp)

router.use('/Pic', Pic)


// GET home page
router.get('/', (req, res) => {

  res.set('Content-Type', 'text/html');

  res.send(fs.readFileSync('./View/build/index.html'));
});

module.exports = router;