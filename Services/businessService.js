const db = require('./dbService');
const Rx = require('rxjs');

const _ = require('lodash');

const businessCollectionName = 'businesss'


const list = [

  {
    keyName: 'seats',
    props: ['customer', 'section']
  },
  {
    keyName: 'discounts',
    props: ['name', 'description']

  },
  {
    keyName: 'tags',
    props: ['text']
  },
  {
    keyName: 'weekday_text',
    props: ['text']
  }

]


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

      list.forEach(listItem => {

        if (business[listItem.keyName]) {

          getResponse[0][listItem.keyName] = business[listItem.keyName]
        }

      })

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