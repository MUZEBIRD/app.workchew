const db = require('./dbService');
const Rx = require('rxjs');

const businessCollectionName = 'businesss'

var post = function(business) {

  return db

    .post(businessCollectionName, business)

}

var put = function(business) {

  return db

    .update(businessCollectionName, business, {
      id: user.id
    })

}

var login = function(query) {

  return db.get(businessCollectionName, {
    id: query.id,
    email: query.email,
    password: query.password
  })

}

var get = function(query) {

  return db.get(businessCollectionName, query)

}

var businessService = {

  get,

  post,

  put
}

module.exports = businessService