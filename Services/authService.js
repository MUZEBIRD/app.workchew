const db = require('./dbService');
const Rx = require('rxjs');
const uuidv4 = require('uuid/v4');

const _ = require('lodash');

const authCollectionName = 'authRegistry'


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

var update = function(auth, witch) {

  var query = {
    _id: auth._id
  }


  if (witch) {


    query = witch
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

var assignAccessToken = function(userData) {

  var token = uuidv4();

  return get({
    userId: userData._id
  })

    .map(getAuth => {

      if (getAuth.length) {
        // can have multiple open authable accesstokesn
        // can clear out accessTOken by date, and or user

        if (!getAuth[0].role) {

          getAuth[0].role = 'coChewer'

        }

        return getAuth[0];

      } else {

        return {
          role: 'coChewer'
        }

      }

    })

    .switchMap(authStream => {

      authStream.token = token

      if (authStream._id) {

        return update(authStream)

      } else {

        authStream.userId = userData._id

        return post(authStream)

      }

    })


}

var getRole = function(accessToken) {

  return get({
    token: accessToken
  })

    .map(getAuth => {

      if (getAuth.length) {
        // can have multiple open authable accesstokesn
        // can clear out accessTOken by date, and or user

        if (!getAuth[0].role) {

          getAuth[0].role = 'coChewer'

        }

        return getAuth[0];

      } else {

        return false;

      }

    })

}

var authService = {
  getRole,

  delete: remove,

  assignAccessToken,


  get,

  post,

  update,

  put
}

module.exports = authService;
