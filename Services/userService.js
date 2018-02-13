const db = require('./dbService');
const Rx = require('rxjs');

const userCollectionName = 'users'

var post = function({email, password}) {

  return db

    .post(userCollectionName, {
      email,
      password
    })

}

var get = function(query) {

  return db.get(userCollectionName, {
    id: query.id,
    email: query.email,
    password: query.password
  })

}

var userService = {

  get,

  post
}

module.exports = userService