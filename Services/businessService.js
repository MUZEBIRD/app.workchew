const db = require('./dbService');
const Rx = require('rxjs');

const _ = require('lodash');

const businessCollectionName = 'businesss'

var post = function(business) {

  return db

    .post(businessCollectionName, business)

}

var put = function(business) {

  return db

    .update(businessCollectionName, business, {
      _id: business._id
    })

}

var update = function(business) {

  var query = {
    _id: business._id
  }

  return db.get(businessCollectionName, query)

    .switchMap((getResponse) => {

      if (business.seats) {

        getResponse[0].seats = business.seats

      }

      if (business.discounts) {

        getResponse[0].discounts = business.discounts

      }

      if (business.tags) {

        getResponse[0].tags = business.tags

      }
      var businessUpdate = _.merge(getResponse[0], business)

      return db

        .update(businessCollectionName, businessUpdate, {
          _id: business._id
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

  return db.get(businessCollectionName, query)

}

var businessService = {

  get,

  post,

  update,

  put
}

module.exports = businessService