const db = require('./dbService');
const Rx = require('rxjs');
const parseReqForm = require('../rxFormidable')
const _ = require('lodash');

const businessCollectionName = 'businesss'

var post = function(business) {

  return db

    .post(businessCollectionName, business)

}

var updateBanner = function(req) {

  return parseReqForm(req)

    .switchMap((formData) => {

      return db

        .postImage({
          file,
          metadata: {
            pic: "123"
          }
        })
    })

}

var put = function(business) {

  return db

    .update(businessCollectionName, business, {
      _id: business._id
    })

}


var checkout = function(checkoutInfo) {

  var {bid, uid} = checkoutInfo;

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

    .map((checkOutStream) => {

      if (seatsWithUser(checkOutStream.business.seats, {
          _id: checkOutStream.uid
        }).length) {

        return checkOutStream

      } else {

        return null
      }

    })

    .switchMap(checkOutStream => {

      if (checkOutStream && checkOutStream.business) {

        query = {
          _id: checkOutStream.business._id
        }

        var {seats} = checkOutStream.business;

        var nuSeats = seats.map((seat) => {

          if (seat.customer == checkOutStream.uid) {

            seat.customer = ""

          }

          return seat

        })

        checkOutStream.business.seats = [...nuSeats]

        return db
          .update(businessCollectionName, checkOutStream.business, {
            _id: checkOutStream.business._id
          })

      } else {

        return Rx.Observable.of({
          msg: "not checked in"
        })

      }

    })

}

var seatsWithUser = function(seats, user) {

  console.log({
    seats,
    user
  })

  return seats.filter(seat => seat.customer == user._id)

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

      if (availiableSeats(checkInStream.business.seats, checkInStream.uid).length) {

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

var availiableSeats = function(seats, uid) {

  if ((seats && seats.filter(seat => !seat.customer).length) && seatsWithUser(seats, {
      _id: uid
    }).length == 0) {

    return seats.filter(seat => (!seat.customer || seat.customer.length == ""))

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


      var businessUpdate = _.extend(getResponse[0], business)

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

  checkout,

  checkin,

  update,

  put,
  updateBanner
}

module.exports = businessService