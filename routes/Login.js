const Rx = require('rxjs')

const express = require('express');

const router = express.Router();

const user = require('../Services/userService.js')

const authService = require('../Services/authService')

const uuidv4 = require('uuid/v4');

router.post('/', ({body}, res) => {

  res.set('Content-Type', 'text/html');

  user

    .get(loginQueryFromCredentials(body))

    .switchMap((userLoginResponse) => {

      var foundUser = {}

      if (userLoginResponse && userLoginResponse.length) {

        foundUser = userLoginResponse[0];

        return authService.assignAccessToken(foundUser)

          .map((authObject) => {

            return {

              foundUser,
              authObject
            }
          })

      } else {

        return Rx.Observable.of({

        })

      }

    })

    .switchMap(({foundUser, authObject}) => {

      if (foundUser && authObject) {
        foundUser.auth = {

          role: authObject.role,

          accessToken: authObject.token,

          date: new Date()

        }

        return user

          .update(foundUser)

      } else {

        return Rx.Observable.of({

        })

      }

    })

    .subscribe((foundUser) => {

      var responseBody = {
        msg: {
          text: 'server login error',
          class: 'danger'
        }
      }

      if (foundUser && foundUser._id) {

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

    email,
    password
  }

}

module.exports = router;