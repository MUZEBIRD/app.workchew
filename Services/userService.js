const db = require('./dbService');
const Rx = require('rxjs');

const userCollectionName = 'users'

var post = function(user) {

  return db

    .post(userCollectionName, user)

}

var put = function(user) {

  return db

    .update(userCollectionName, user, {
      _id: user._id
    })

}

var login = function(query) {

  return db.get(userCollectionName, {
    id: query.id,
    email: query.email,
    password: query.password
  })

}

var update = function(user) {

  var query = {
    _id: user._id
  }

  return db.get(userCollectionName, query)

    .switchMap((getResponse) => {

      var userUpdate = _.merge(getResponse[0], user)

      return db

        .update(userCollectionName, userUpdate, {
          _id: user._id
        })

    })

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

  return db.get(userCollectionName, query)
}

var userService = {

  get,

  post,

  put
}

module.exports = userService