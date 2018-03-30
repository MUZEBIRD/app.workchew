const db = require('./dbService');
const Rx = require('rxjs');

const _ = require('lodash');

const authCollectionName = 'auth'

var post = function(auth) {

  return db

    .post(authCollectionName, auth)

}

var put = function(auth) {

  return db

    .update(authCollectionName, auth, {
      _id: auth._id
    })

}

var update = function(auth) {

  var query = {
    _id: auth._id
  }

  return db.get(authCollectionName, query)

    .switchMap((getResponse) => {

      var authUpdate = _.extend(getResponse[0], auth)

      return db

        .update(authCollectionName, authUpdate, {
          _id: auth._id
        })

    })

}

var remove = function(query) {

  return db.delete(authCollectionName, query)

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

  return db.get(authCollectionName, query)

}


var getRole = function(accessToken) {


  return Rx.Observable.of({})


}

var authService = {

  delete: remove,

  get,

  post,

  update,

  put
}

module.exports = authService