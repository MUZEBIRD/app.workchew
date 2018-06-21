const Rx = require('rxjs')

const express = require('express');

const router = express.Router();

const authService = require('../Services/authService')

const business = require('../Services/businessService.js')
var Url = require('url');

var businessPartnerAuth = function(req, res, next) {

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

  var accessToken = headers['x-api-access-token']
  var pathname = Url.parse(url).pathname;

  if (method.toLowerCase() === "post"
    || method.toLowerCase() === "put"
    || method.toLowerCase() === "delete") {

    onUpdateMehtod(req, res, next)

  } else {

    next()

  }

}

router.use(businessPartnerAuth)

router.post('/', (req, res) => {

  console.log('req.body @ busines post route', req.body)
  console.log('req.headers @ busines post route', req.headers)

  if (req.body && Object.keys(req.body).length) {

    business

      .post(getBusinessFromBody(req.body))

      .subscribe((postBusinessResponse) => {

        res.send({
          postBusinessResponse
        })

      })

  } else {

    business

      .updateBanner(req)

      .subscribe((updateBannerResponse) => {

        res.send(updateBannerResponse)

      })

  }

}); //POST 

router.put('/', (req, res) => {

  console.log('req.body @ busines put route', req.body)

  business

    .update(getBusinessFromBody(req.body))

    .subscribe((putBusinessResponse) => {

      res.send({
        putBusinessResponse
      })

    })

}) //PUT

router.get('/', (req, res) => {

  return business

    .get(req.query)

    .subscribe((getBusinessResponse) => {

      res.send(getBusinessResponse)

    })

})

router.delete('/', (req, res) => {

  return business

    .delete(req.query)

    .subscribe((getBusinessResponse) => {

      res.send(getBusinessResponse)

    })

})

var getBusinessFromBody = function(business) {

  return business

}

var onUpdateMehtod = function(req, res, next) {

  if (req.headers['x-api-access-token'] && req.headers['x-api-access-token'].length) {

    checkAccessToken(req, res, next)

  } else {

    res.status(401).send({
      error: 401,
      msg: "no access token"
    })

  }

}

var checkAccessToken = function(req, res, next) {

  var token = req.headers['x-api-access-token'];

  authService.getRole(token)

    .subscribe(authObject => {

      if (authObject.role === "admin") {

        next()

      } else {

        checkUserPermissions(req, res, next)

      }

    })

}


var checkUserPermissions = function(req, res, next) {

  authService.getRole(token)

    .switchMap(authObject => {


      return userService.get({
        _id: authObject.userId
      })


    })


    .subscribe(users => {



      //may have to parse req




    })



}

// var getBusinessFromBody = function({_id, name, phone, email, seats, tags, discounts, address, wifi, featured, weekday_text, geoPoint, description}) {

//   return {
//     _id,
//     name,
//     phone,
//     email,
//     seats,
//     tags,
//     discounts,
//     address,
//     wifi,
//     featured,
//     weekday_text,
//     geoPoint,
//     description
//   }

// }

module.exports = router;