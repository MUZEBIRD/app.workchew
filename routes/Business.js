const Rx = require('rxjs')

const express = require('express');

const router = express.Router();

const business = require('../Services/businessService.js')

router.post('/', (req, res) => {

  console.log('req.body @ busines post route', req.body)

  business

    .post(getBusinessFromBody(req.body))

    .subscribe((postBusinessResponse) => {

      res.send({
        postBusinessResponse
      })

    })

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

var getBusinessFromBody = function({_id, name, phone, email, seats, tags, discounts, address, wifi, featured}) {

  return {
    _id,
    name,
    phone,
    email,
    seats,
    tags,
    discounts,
    address,
    wifi,
    featured
  }

}

module.exports = router;