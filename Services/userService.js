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

    return onUserSignUpInfo(userSignUpInfo)

      .switchMap(userSignUpData => {

        return checkForUser(userSignUpData)

          .switchMap((userSearchStream) => {

            if (userSearchStream.length) {

              return Rx.Observable.of({
                msg: 'user with that email exsist',
                user: userSearchStream[0]
              })

            } else {

              return db

                .post(userCollectionName, userSignUpData)

                .switchMap(userSignUp => {

                  return accessAndUpdate(userSignUp)

                })

            } //userSearchStream.length >0

          })

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

var accessAndUpdate = function(userSignUp) {

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

    .switchMap(userSignUp => {

      return update(userSignUp).map((user) => {

        console.log("user response after sign up ", user)
        delete user.password
        return user
      })

    })

}

var onUserSignUpInfo = function(userSignUpInfo) {

  if (userSignUpInfo.linkedInId) {

    return Rx.Observable.of(userSignUpInfo)

  }

  if (userSignUpInfo.facebookUserId) {

    return Rx.Observable.of(userSignUpInfo)

  }

  if (userSignUpInfo.googleId) {

    return Rx.Observable.of(userSignUpInfo)

  }

  if (userSignUpInfo.password && userSignUpInfo.password.length) {

    var {email, password, info} = userSignUpInfo


    return bcryptStream.hashUserPassword(password)

      .map((hashedPassword) => {

        return {
          email,
          password: hashedPassword,
          info,
          created: new Date().getTime()
        }

      })

  }

}

var getLinkedInData = function(userSignUpInfo) {

  return Rx.Observable.of(userSignUpInfo)

  Rx.Observable.create((observer) => {
    request

      .post('https://www.linkedin.com/oauth/v2/accessToken', {

        form: {

          grant_type: 'authorization_code',

          code: userSignUpInfo.linkedInAccessToken,

          redirect_uri: 'http://localhost:3000/',

          client_id: '77vwlh2pgcg359',

          client_secret: 'm9KfecH44NCgowBw'

        }

      })
      .on('response', function(response) {

        console.log('response', response) // 200

        observer.next(response)

      })
  })

}

var sendEmail = function() {


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

var checkForUser = function(userData) {

  var matchList = ['email', 'linkedInId', 'facebookUserId', 'googleId']

  var orQueryList = Object.keys(userData).reduce((orQueryList, data) => {

    if (matchList.includes(data)) {
      console.log('fount user q prop match ', {
        [data]: userData[data]
      })

      return [...orQueryList, {
        [data]: userData[data]
      }]
    }

    return [...orQueryList]

  }, [])

  var query = {

    $or: orQueryList

  }

  return get(query)

} //checkForUser

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