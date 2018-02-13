const Rx = require('rxjs')

const express = require('express');

const router = express.Router();

const user = require('../Services/userService.js')

router.post('/', ({body}, res) => {

  res.set('Content-Type', 'text/html');

  user

    .post(userMaskFromBody(body))

    .subscribe((postUserResponse) => {

      var responseBody = {
        msg: {
          text: "sign up error",
          class: "danger"

        }
      }

      if (postUserResponse && postUserResponse._id) {

        responseBody.user = postUserResponse

        responseBody.msg = {

          text: "sign up successful",

          class: "success"

        }

      }

      res.send(responseBody)

    })

}); //POST 

var userMaskFromBody = function({email, password}) {

  return {

    email,
    password
  }

}

module.exports = router;