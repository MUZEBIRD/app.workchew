const Rx = require('rxjs')

const express = require('express');

const router = express.Router();

const seats = require('../services/seatsService.js')

router.post('/', (req, res) => {

  console.log('req.body @ seats post route', req.body)

  seats

    .post(req.body)

    .subscribe((postSeatsResponse) => {

      res.send({
        postSeatsResponse
      })

    })

}); //POST 

router.put('/', (req, res) => {

  console.log('req.body @ seats put route', req.body)

  seats

    .update(req.body)

    .subscribe((putSeatsResponse) => {

      res.send({
        putSeatsResponse
      })

    })

}) //PUT

router.get('/', (req, res) => {

  return seats

    .get(req.query)

    .subscribe((getSeatsResponse) => {

      res.send(getSeatsResponse)

    })

}) // GET

router.delete('/', (req, res) => {

  return seats

    .delete(req.query)

    .subscribe((getSeatsResponse) => {

      res.send(getSeatsResponse)

    })

}) // DELETE


module.exports = router;