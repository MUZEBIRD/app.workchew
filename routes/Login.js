const Rx = require('rxjs')

const express = require('express');

const router = express.Router();

const user = require('../Services/userService.js')

const authService = require('../Services/authService')

const uuidv4 = require('uuid/v4');

const bcryptStream = require('../Services/bcryptStreams')


router.post('/', ({body}, res) => {

  res.set('Content-Type', 'text/html');

  user

    .get(loginQueryFromCredentials(body))

    .switchMap((findUserStream) => {

      if (findUserStream && findUserStream.length) {

        var foundUser = findUserStream[0];

        return bcryptStream.compare(body.password, foundUser.password)

          .map((testResponse) => {

            if (testResponse) {

              return foundUser

            } else {

              return false

            }

          })

      } else {

        return Rx.Observable.of(false)

      }

    })

    .switchMap(foundUser => {

      return user.updateUserWithAccessToken(foundUser)

    })

    .subscribe((foundUser) => {

      var responseBody = {
        msg: {
          text: 'server login error',
          class: 'danger'
        }
      }

      if (foundUser && foundUser._id) {

        delete foundUser.password

        responseBody.user = foundUser
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

    email
  }

}

module.exports = router;