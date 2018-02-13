var formidable = require('formidable');

var Rx = require('rxjs');

var parseReqForm = function(req) {

  return Rx.Observable.create(function(observer) {

    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname;
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {

      if (err) {

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