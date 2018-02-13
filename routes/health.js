const express = require('express');

const router = express.Router();

// GET home page
router.get('/', (req, res) => {


    console.log("touch")
    res.send("we good times 3");


});

module.exports = router;