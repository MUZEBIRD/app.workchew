const Rx = require('rxjs')

const express = require('express');

const router = express.Router();

const user = require('../Services/userService.js')

const authService = require('../Services/authService')
const bcryptStream = require('../Services/bcryptStreams')
const parseReqForm = require('../rxFormidable')

const payPalWCNodeCLient = require('../Services/wc-paypal.js')


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


router.get('/check-membership', (req, res) => {

  var {_id} = req.query

  return user

    .get({
      _id
    })

    .switchMap((users) => {

      console.log("found users", users)


      var {executedAgreementInfo} = users[0]
      var {lastPaymentId} = users[0].memberShipInfo.paymentAuth
      console.log("lastPaymentId lastPaymentId", lastPaymentId)


      if (!lastPaymentId && !executedAgreementInfo && !executedAgreementInfo.id) {


        return Rx.Observable.of({})
      }


      if (!lastPaymentId && executedAgreementInfo && executedAgreementInfo.id) {


        return payPalWCNodeCLient

          .getAgreementDetails({
            agreementID: executedAgreementInfo.id
          })

      }

      return payPalWCNodeCLient

        .getPayment(lastPaymentId)

    })

    .subscribe((payPalResponse) => {

      console.log("pay pal respoonse", payPalResponse)

      var {transactions, create_time, state, agreement_details} = payPalResponse;


      if (payPalResponse && transactions && create_time) {

        var transaction = transactions[0];

        var {item_list} = transaction;

        var {items} = item_list;

        var item = items[0];

        var {name, description, currency} = item;

        res.send({
          item,
          create_time
        })

      } else if (agreement_details && state) {

        res.send({
          state,
          agreement_details
        })

      } else {

        res.status(401).send({
          error: 401,
          msg: " wrong user"
        })

      }



    })

}) //check membership

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

  var userUpdateId = userUpdate._id || req.query._id

  var authedUserId = authObject.userId;


  if (userUpdateId
    && authedUserId
    && (authedUserId === userUpdateId)) {

    next()

  } else {

    res.status(401).send({
      error: 401,
      msg: "not valid user"
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