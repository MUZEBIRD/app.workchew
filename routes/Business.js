const Rx = require('rxjs')

const express = require('express');

const router = express.Router();

const business = require('../Services/businessService.js')

router.post('/', (req, res) => {

  console.log('req.body @ busines post route', req.body)
  console.log('req.headers @ busines post route', req.headers)


  if (req.body) {

    business

      .updateBanner(req)

      .subscribe((updateBannerResponse) => {

        res.send(updateBannerResponse)

      })

  } else {
    business

      .post(getBusinessFromBody(req.body))

      .subscribe((postBusinessResponse) => {

        res.send({
          postBusinessResponse
        })

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

router.put('/:bid/:action/:uid', (req, res, next) => {

  console.log('req.body @ busines check in route', req.params);

  if (req.params.action == 'checkin') {

    business

      .checkin(getBusinessFromBody(req.body))

      .subscribe((putBusinessResponse) => {

        res.send({
          putBusinessResponse
        })

      })

  } else if (req.params.action == "checkout") {

    business

      .checkout(getBusinessFromBody(req.body))

      .subscribe((putBusinessResponse) => {

        res.send({
          putBusinessResponse
        })

      })

  } else {

    next();

  }


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