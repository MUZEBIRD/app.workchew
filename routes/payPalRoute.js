const express = require('express');

const router = express.Router();


router.post('/', ({body}, res) => {

  res.send(body)

}); //POST 


module.exports = router;