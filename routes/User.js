const Rx = require('rxjs')

const express = require('express');

const router = express.Router();

const user = require('../Services/userService.js')

router.post('/', ({body}, res) => {

  res.set('Content-Type', 'text/html');

  user

    .post(userFromBody(body))

    .subscribe((userGetResponse) => {

      var responseBody = {
        userResponse: userGetResponse
      }

      res.send(responseBody)

    })

}); //POST 

var userFromBody = function({email, password}) {

  return {

    email,
    password
  }

}

module.exports = router;