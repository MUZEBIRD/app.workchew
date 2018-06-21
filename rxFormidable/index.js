var formidable = require('formidable');

var Rx = require('rxjs');

var parseReqForm = function(req) {
  console.log('hit parseReqForm')

  return Rx.Observable.create(function(observer) {
    console.log('hit  create serv')

    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname;
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
      console.log('hit  form.parse', fields, files, err)

      if (err) {
        console.log('hit  form.err', err)

        observer.error(err)

      } else {

        var fileList = Object.keys(files).map((fileKey) => {

          var file = files[fileKey]
          return Object.assign(file, {
            fileKey
          })

        })

        observer.next({
          fields,
          files,
          fileList
        });
        observer.complete();

      }

    })

  });

} //parseForm

module.exports = parseReqForm