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

      var foundUser = userLoginResponse[0];
      console.log("found user resp", foundUser)

      return authService.assignAccessToken(foundUser)

        .map((authObject) => {

          return {

            foundUser,
            authObject
          }
        })

    })

    .switchMap(({foundUser, authObject}) => {

      foundUser.auth = {

        role: authObject.role,

        accessToken: authObject.token,

        date: new Date()

      }

      return user

        .update(foundUser)

    })

    .subscribe((userLoginUpdate) => {

      // var responseBody = {
      //   msg: {
      //     text: 'server login error',
      //     class: 'danger'
      //   }
      // }

      // if (mongoGetResponse && mongoGetResponse.length > 0) {

      //   responseBody.user = mongoGetResponse[0]
      //   responseBody.msg = {
      //     text: "user found logining in",
      //     class: 'success'
      //   }
      // }

      res.send(userLoginUpdate)

    })

}); //POST 

var loginQueryFromCredentials = function({email, password}) {

  return {

    email,
    password
  }

}

module.exports = router;