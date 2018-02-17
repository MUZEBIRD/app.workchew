const Rx = require('rxjs')

const express = require('express');

const router = express.Router();

const business = require('../Services/businessService.js')

const parseReqForm = require('../rxFormidable/')

router.post('/', (req, res) => {

  var {name, phone, email, seats, address, wifi} = req.body

  console.log('passed in info ', {
    name,
    phone,
    email,
    seats,
    address,
    wifi
  })

  business

    .post({
      name,
      phone,
      email,
      seats,
      address,
      wifi
    })

    .subscribe((postBusinessResponse) => {

      res.send({
        postBusinessResponse
      })

    })

}); //POST 

router.put('/', (req, res) => {

  var {name, phone, email, seats, address, wifi, _id} = req.body

  console.log('passed in info ', {
    name,
    phone,
    email,
    seats,
    address,
    wifi,
    _id
  })

  business

    .put({
      _id,
      name,
      phone,
      email,
      seats,
      address,
      wifi
    })

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

module.exports = router;