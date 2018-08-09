const Rx = require('rxjs')

const express = require('express');

const router = express.Router();

const stripeService = require('../Services/stripePamentsService.js')

router.post('/create-membership', (req, res) => {


  var {body} = res.send({

  })

}); //POST 

router.put('/', (req, res) => {

  res.send({

  })

}) //PUT

router.get('/', (req, res) => {

  res.send({

  })
}) // GET

router.delete('/', (req, res) => {

  res.send({

  })

}) // DELETE


module.exports = router;