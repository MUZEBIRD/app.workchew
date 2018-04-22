const db = require('./dbService');
const Rx = require('rxjs');
const _ = require('lodash');
const emailService = require('./emailService')
const userCollectionName = 'users'
const uuidv4 = require('uuid/v4');

const authService = require('./authService')

const bcryptStream = require('./bcryptStreams')

var post = function(user) {

  var {userSignUpInfo, businessSignUpInfo} = user

  var data = {};

  console.log("user service.post top ", user)

  if (userSignUpInfo) {

    return get({
      email: userSignUpInfo.email
    })

      .switchMap((userSearchStream) => {

        if (userSearchStream.length) {

          return Rx.Observable.of({
            msg: 'user with that email exsist'
          })

        } else {

          var {email, password, userName, info} = userSignUpInfo

          return bcryptStream.hashUserPassword(password)

            .switchMap((hashedPassword) => {

              return db

                .post(userCollectionName, {
                  email,
                  password: hashedPassword,
                  userName,
                  info,
                  created: new Date().getTime()
                })

            })

// .switchMap(userDbPosStream => {

//   data.userDbPosStream = userDbPosStream;

//   console.log("user service.post  data.userDbPosStream   ", userDbPosStream, data)

//   return emailService.sendUserVerificationEmail({
//     userSignUpInfo
//   })

//     .map((verificationEmailResponse) => {
//       data.verificationEmailResponse = verificationEmailResponse;

//       return userDbPosStream

//     })

// })

// .switchMap(userSignUp => {

//   return emailService.sendAdminSignUpEmail({
//     userSignUpInfo
//   })

//     .map((sendAdminSignUpEmailResponse) => {

//       data.sendAdminSignUpEmailResponse = sendAdminSignUpEmailResponse;
//       console.log("user service.post  data.sendAdminSignUpEmailResponse   ", sendAdminSignUpEmailResponse, data)

//       return userSignUp
//     })

// })

            .switchMap(userSignUp => {

              return authService.assignAccessToken(userSignUp)

                .map(authObject => {

                  userSignUp.memberShipInfo = {

                    paymentAuth: {
                      token: authObject.token,
                      created: new Date().getTime()
                    }

                  }

                  return userSignUp

                })

            })

            .switchMap(userSignUp => {

              return update(userSignUp).map((user) => {

                console.log("user response after sign up ", user)
                delete user.password
                return user
              })

            })

        } //userSearchStream.length >0

      })

  } //userSignUpInfo

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