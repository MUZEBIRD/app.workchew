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

var checkin = function(checkInInfo) {

  var {bid, uid} = checkInInfo;

  var query = {
    _id: bid
  }

  return db.get(businessCollectionName, query)

    .map((getBusinessStream) => {

      return {
        business: getBusinessStream[0],
        uid
      }

    })

    .map((checkInStream) => {

      if (availiableSeats(checkInStream.business.seats).length) {

        return checkInStream
      } else {

        return null
      }

    })

    .switchMap(checkInStream => {

      if (checkInStream && checkInStream.business) {

        query = {
          _id: checkInStream.business._id
        }

        var {seats} = checkInStream.business;

        var notFound = true;

        var nuSeats = seats.map((seat) => {

          if (notFound && (!seat.customer || seat.customer.length == 0)) {

            seat.customer = checkInStream.uid

            notFound = false;
          }

          return seat

        })

        checkInStream.business.seats = [...nuSeats]

        return db
          .update(businessCollectionName, checkInStream.business, {
            _id: checkInStream.business._id
          })

      } else {

        return Rx.Observable.of({
          msg: "no seats availiable"
        })

      }

    })

}

var availiableSeats = function(seats) {

  if (seats && seats.filter(seat => !seat.customer).length) {

    return seats.filter(seat => !seat.customer || seat.customer.length == "")

  } else {

    return []

  }

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

var remove = function(query) {

  return db.delete(businessCollectionName, query)

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

  delete: remove,

  get,

  post,

  checkin,

  update,

  put
}

module.exports = businessService