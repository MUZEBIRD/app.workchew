const Rx = require('rxjs')

const express = require('express');

const router = express.Router();

const user = require('../Services/userService.js')

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