const Rx = require('rxjs')

const express = require('express');

const router = express.Router();

const user = require('../Services/userService.js')

const authService = require('../Services/authService')

var Url = require('url');

var UserAuth = function(req, res, next) {

  var body = req.body;
  var query = req.query;
  var time = new Date().toUTCString();
  var headers = req.headers;
  var method = req.method;
  var params = req.params;
  var route = req.route;
  var files = req.files;
  var cookies = req.cookies;
  var signedCookies = req.signedCookies;
  var url = req.url;

  var accessToken = headers['x-api-access-token'];
  var pathname = Url.parse(url).pathname;

  if (method.toLowerCase() === "post" &&

    (body.userSignUpInfo || body.businessSignUpInfo)) {

    next()

  } else {

    if (method.toLowerCase() === "get"

      || method.toLowerCase() === "put"

      || method.toLowerCase() === "delete") {

      onUpdateMehtod(req, res, next)

    } else {

      next()

    }

  }

}

router.use(UserAuth)

router.post('/', ({body}, res) => {

  res.set('Content-Type', 'text/html');

  user

    .post(userFromBody(body))

    .subscribe((userPostResponse) => {

      var responseBody = {
        userResponse: userPostResponse
      }

      res.send(responseBody)

    })

}); //POST 

router.put('/', ({body}, res) => {

  res.set('Content-Type', 'text/html');

  user

    .update(userFromBody(body))

    .subscribe((userPutResponse) => {

      var responseBody = {
        userResponse: userPutResponse
      }

      res.send(responseBody)

    })

}); //PUT 

router.get('/', (req, res) => {

  return user

    .get(req.query)

    .subscribe((getUserResponse) => {

      res.send(getUserResponse)

    })

})

router.delete('/', (req, res) => {

  return user

    .delete(req.query)

    .subscribe((getUserResponse) => {

      res.send(getUserResponse)

    })

})

var onUpdateMehtod = function(req, res, next) {

  if (req.headers['x-api-access-token'] && req.headers['x-api-access-token'].length) {

    checkAccessToken(req, res, next)

  } else {

    res.status(401).send({
      error: 401,
      msg: "no access token"
    })

  }

} //onUpdateMehtod

var checkAccessToken = function(req, res, next) {

  var token = req.headers['x-api-access-token'];

  authService.getRole(token)

    .subscribe(authObject => {

      if (authObject.role === "admin") {

        next()

      } else {

        onlyIcanUpdateMe(req, res, next, authObject)

      }

    })

} //checkAccessToken

var onlyIcanUpdateMe = function(req, res, next, authObject) {

  var userUpdate = req.body;

  var userUpdateId = userUpdate._id

  var authedUserId = authObject.userId;

  if (userUpdateId
    && authedUserId
    && (authedUserId === userUpdateId)) {

    next()

  } else {

    res.status(401).send({
      error: 401
    })

  }

} //onlyIcanUpdateMe

var userFromBody = function(user) {



  return user

}

// var userFromBody = function({name, phone, email, address, password, _id}) {

//   return {
//     _id,
//     name,
//     phone,
//     email,
//     address,
//     password
//   }

// }

module.exports = router;