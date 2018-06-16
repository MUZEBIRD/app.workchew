const Rx = require('rxjs')

const express = require('express');

const router = express.Router();

const pic = require('../Services/picService.js')

const parseReqForm = require('../rxFormidable/')





router.post('/', (req, res) => {

  return parseReqForm(req)

    .subscribe(({fields, files, fileList}) => {

      console.log('fields, files, fileList}', {
        fields,
        files,
        fileList
      })

      pic

        .post({

          file: fileList[0],

          metadata: {

            userId: fields.userId,

            mode: fields.mode,

            selectorId: fields.selectorId,

            originPicId: fields.originPicId

          }

        })

        .subscribe((postPicResponse) => {

          res.send({
            postPicResponse
          })

        })

    })

}); //POST 

router.get('/:id', (req, res) => {

  return pic

    .getById({
      _id: req.params.id
    })

    .subscribe((gfs) => {

      res.writeHead(200, {
        'Content-Type': 'image/png'
      });

      gfs.pipe(res);

    })

})

router.get('/', (req, res) => {

  return pic

    .get(req.query)

    .subscribe((getPicResponse) => {

      res.send(getPicResponse)


    })

})

module.exports = router;