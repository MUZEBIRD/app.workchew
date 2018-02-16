const Rx = require('rxjs')

const express = require('express');

const router = express.Router();

const business = require('../Services/businessService.js')

const parseReqForm = require('../rxFormidable/')

router.post('/', (req, res) => {


    var { name, phone, email, seats, address } = req.body

    console.log('passed in info ', { name, phone, email, seats, address })

    business

        .post({
            name,
            phone,
            email,
            seats,
            address
        })

        .subscribe((postBusinessResponse) => {

            res.send({
                postBusinessResponse
            })

        })



}); //POST 

router.put('/', (req, res) => {


    parseReqForm(req)

        .subscribe(({ fields, files, fileList }) => {

            console.log('fields, files, fileList}', {
                fields,
                files,
                fileList
            })

            var { name, phone, email, seats, address } = fields

            console.log('passed in info ', { name, phone, email, seats, address })

            business

                .put({
                    name,
                    phone,
                    email,
                    seats,
                    address
                })

                .subscribe((postBusinessResponse) => {

                    res.send({
                        postBusinessResponse
                    })

                })

        })

})


router.get('/', (req, res) => {

    return business

        .get(req.query)

        .subscribe((getBusinessResponse) => {

            res.send(getBusinessResponse)


        })

})

module.exports = router;