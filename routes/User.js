const Rx = require('rxjs')

const express = require('express');

const router = express.Router();

const user = require('../Services/userService.js')

const authService = require('../Services/authService')
const bcryptStream = require('../Services/bcryptStreams')
const parseReqForm = require('../rxFormidable')

const payPalWCNodeCLient = require('../Services/wc-paypal.js')

const stripeService = require('../Services/stripePamentsService.js')

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

router.put('/charge-for-day', (req, res) => {

  var {token, type} = body

  var {body, headers} = req;

  if (req.workchewUser) {

    var user = req.workchewUser

    stripeService.createCustomer({
      email: user.email,
      source: token,
      userId: user._id
    })

      .switchMap((stripeUserResponse) => {

        return stripeService

          .chargeCustomerForOneDayPass(token)

      })

      .subscribe((membershipResponse) => {

        res.send(membershipResponse)

      })

  } else {

    res.status(401).send({
      error: 401,
      msg: "not valid user"
    })

  }

}); //create-stripe-membership PUT 

router.put('/create-stripe-membership', (req, res) => {

  var {token, type} = req.body

  var {body, headers} = req;


  if (req.workchewUser) {

    var user = req.workchewUser

    stripeService.createCustomer({
      email: user.email,
      source: token,
      userId: user._id
    })

      .switchMap((stripeUserResponse) => {

        return stripeService

          .initUserMemberShip(stripeUserResponse, type)

      })

      .subscribe((membershipResponse) => {

        res.send(membershipResponse)

      }, (e) => {


        console.log("sub err", e)

      }

    )

  } else {

    res.status(401).send({
      error: 401,
      msg: "not valid authorized user"
    })

  }

}); //create-stripe-membership PUT 

router.post('/', (req, res) => {

  res.set('Content-Type', 'text/html');

  user

    .post(userFromBody(req.body), req)

    .subscribe((userPostResponse) => {


      delete userPostResponse.password

      var responseBody = {
        userResponse: userPostResponse
      }

      res.send(responseBody)

    })

}); //POST 

router.put('/', (req, res) => {

  var {body} = req;

  res.set('Content-Type', 'text/html');

  if (body && body._id && body.newPassword && body.oldPassword) {

    bcryptStream.hashUserPassword(body.newPassword)

      .subscribe((hashedPassword) => {

        var passwordUpdate = {
          _id: body._id,
          password: hashedPassword,

          updated: new Date().getTime()
        }

        user

          .update(userFromBody(passwordUpdate))

          .subscribe((userPutResponse) => {

            var responseBody = {
              userResponse: userPutResponse
            }

            res.send(responseBody)

          })

      })

  } else if (!body || !body._id) {

    parseReqForm(req)

      .switchMap(formData => {

        var token = req.headers['x-api-access-token'];

        return authService.getRole(token)

          .map(authObject => {

            return {
              authObject,
              formData
            }
          })

      })

      .switchMap(({authObject, formData}) => {

        if (authObject.role == "admin") {

          return user

            .updateProfilePic(formData)


        } else {

          return userService.get({
            _id: authObject.userId
          })

            .switchMap(users => {

              if (users && users.length && users[0]) {

                return user

                  .updateProfilePic(formData)

              } else {

                return Rx.Observable.of(1)

              }

            })

        }

      })

      .subscribe((updateProfilePicResponse) => {

        if (updateProfilePicResponse == 1) {

          res.status(401).send({
            error: 401,
            msg: " wrong user"
          })

        } else {

          res.send(updateProfilePicResponse)

        }

      })

  } else {

    user

      .update(userFromBody(body))

      .subscribe((userPutResponse) => {

        var responseBody = {
          userResponse: userPutResponse
        }

        res.send(responseBody)

      })

  }

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

  user.get({
    _id: authObject.userId
  })

    .subscribe((foundUsers) => {

      if (foundUsers && foundUsers.length) {

        req.workchewUser = foundUsers[0];

        var userUpdateId = userUpdate._id || req.query._id;

        var authedUserId = authObject.userId

        var authorized = userUpdateId && authedUserId && (authedUserId === userUpdateId)

        if (authorized) {

          next()

        }

      } else {

        res.status(401).send({
          error: 401,
          msg: "not valid user"
        })

      }

    })

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