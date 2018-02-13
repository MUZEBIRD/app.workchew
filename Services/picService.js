const db = require('./dbService');
const Rx = require('rxjs');
const fs = require('fs');

var post = function({file, metadata}) {

  return db

    .postImage({

      file,
      metadata
    })

}

var getById = function(query) {

  return db

    .retrieveImage({

      _id: query._id

    })

}

var get = function(query) {

  return db

    .get('fs.files', query)

    .map((getPicsResponse) => {

      return getPicsResponse

        .map(({_id, metadata}) => {

          return {
            _id,
            metadata
          }

        })

    })

}

var userService = {

  getById,

  post,

  get
}

module.exports = userService