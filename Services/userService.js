const db = require('./dbService');
const Rx = require('rxjs');
const _ = require('lodash');
const emailService = require('./emailService')
const userCollectionName = 'users'

var post = function(user) {

  var {userSignUpInfo, businessSignUpInfo} = user
  var data = {};

  console.log("user service.post top ", user)

  if (userSignUpInfo) {

    return db

      .post(userCollectionName, userSignUpInfo)

      .switchMap(userDbPosStream => {

        data.userDbPosStream = userDbPosStream;
        console.log("user service.post  data.userDbPosStream   ", userDbPosStream, data)

        return emailService.sendUserVerificationEmail({
          userSignUpInfo
        })


      })

      .switchMap(verificationEmailResponse => {

        data.verificationEmailResponse = verificationEmailResponse;
        console.log("user service.post  data.verificationEmailResponse   ", verificationEmailResponse, data)

        return emailService.sendAdminSignUpEmail({
          userSignUpInfo
        })


      })

      .map(sendAdminSignUpEmailResponse => {

        data.sendAdminSignUpEmailResponse = sendAdminSignUpEmailResponse;
        console.log("user service.post  data.sendAdminSignUpEmailResponse   ", sendAdminSignUpEmailResponse, data)

        return data

      })
  }


  if (businessSignUpInfo) {

    return emailService

      .sendThankForSignUpEmail({
        businessSignUpInfo
      })

      .switchMap(thanksEmailResponse => {

        data.thanksEmailResponse = thanksEmailResponse;
        console.log("user service.post  data.thanksEmailResponse   ", thanksEmailResponse, data)

        return emailService.sendAdminSignUpEmail({
          businessSignUpInfo
        })

      })

      .map(sendAdminSignUpEmailResponse => {

        data.sendAdminSignUpEmailResponse = sendAdminSignUpEmailResponse;
        console.log("user service.post  data.sendAdminSignUpEmailResponse   ", sendAdminSignUpEmailResponse, data)

        return data

      })
  }
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

      var userUpdate = _.extend(getResponse[0], user)

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

var remove = function(query) {

  return db.delete(userCollectionName, query)

}

var userService = {

  get,

  post,

  put,

  update,

  delete: remove,

}

module.exports = userService