const Rx = require('rxjs')

const express = require('express');

const router = express.Router();

const user = require('../Services/userService.js')

router.post('/', ({body}, res) => {

  res.set('Content-Type', 'text/html');

  user

    .get(loginQueryFromCredentials(body))

    .subscribe((mongoGetResponse) => {

      var responseBody = {
        msg: {
          text: 'server login error',
          class: 'danger'
        }
      }

      if (mongoGetResponse && mongoGetResponse.length > 0) {

        responseBody.user = mongoGetResponse[0]
        responseBody.msg = {
          text: "user found logining in",
          class: 'success'
        }
      }

      res.send(responseBody)

    })

}); //POST 

var loginQueryFromCredentials = function({email, password}) {

  return {

    email,
    password
  }

}

module.exports = router;