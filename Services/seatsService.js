const db = require('./dbService');
const Rx = require('rxjs');

const _ = require('lodash');

const seatsCollectionName = 'seats'

const list = [
  {
    keyName: 'tags',
    props: ['text']
  }
]

var post = function(seats) {

  return db

    .post(seatsCollectionName, seats)

}

var put = function(seats) {

  return db

    .update(seatsCollectionName, seats, {
      _id: seats._id
    })

}

var update = function(seats) {

  var query = {
    _id: seats._id
  }

  return db.get(seatsCollectionName, query)

    .switchMap((getResponse) => {

      var seatsUpdate = _.extend(getResponse[0], seats)

      return db

        .update(seatsCollectionName, seatsUpdate, {
          _id: seats._id
        })

    })

}


var remove = function(query) {

  return db.delete(seatsCollectionName, query)

}

var get = function(query) {

  if (query.searchTerm) {

    query = {
      'name': {
        $regex: ".*" + query.searchTerm + ".*",
        $options: "i"
      }
    }

  }

  return db.get(seatsCollectionName, query)

}

var seatsService = {

  delete: remove,

  get,

  post,

  update,

  put
}

module.exports = seatsService