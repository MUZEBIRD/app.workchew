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
      id: business.id
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

  return db.get(businessCollectionName, query)

}

var businessService = {

  get,

  post,

  put
}

module.exports = businessService