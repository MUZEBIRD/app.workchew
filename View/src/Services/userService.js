import urlService from '../Services/urlService.js'
import restService from '../Services/restService.js';

const Rx = require('rxjs');

var userStorageKey = 'workchew.user'
var userSignUpStorageKey = 'workchew.userSignUp'

var userService = {

  userStorageKey,

  get: ({params}) => {

    var {_id} = params;

    if (_id === 1) {

      var localUserString = localStorage.getItem(userStorageKey)

      if (localUserString && localUserString.length > 0) {

        return Rx.Observable.of(JSON.parse(localUserString))

      } else {

        return Rx.Observable.of({})

      }

    }

    var qs = Object.keys(params)

      .reduce((run, key, i) => {

        return run

          .concat(i ? '&' : '')

          .concat(key)

          .concat('=')

          .concat(params[key])

      }, '?')

    var getUserUrl = `${urlService.user}${qs}`

    console.log('getUserUrl', qs)

    return restService.get(getUserUrl)

  },
  updateProfilePic: (updateProfilePicForm) => {

    return restService.putImage(urlService.user, updateProfilePicForm)

  },
  updateProfile: () => {


  },
  delete: (userInfo) => {

    var deleteBusinessUrl = `${urlService.user}?_id=${userInfo._id}`;

    return restService.delete(deleteBusinessUrl)

  },
  post: (userInfo) => {
    return restService.post(urlService.user, userInfo)
  },

  put: (userInfo) => {

    return restService.put(urlService.user, userInfo)

  },
  logOut: () => {

    localStorage.clear();

    window.location.reload(true);

  },
  getSignUpData: () => {


    return JSON.parse(localStorage

        .getItem(userSignUpStorageKey) || '{}')

  },
  storeSignUpInfo: (user) => {

    localStorage

      .setItem(
        userSignUpStorageKey, JSON.stringify(user)
    )

  },
  store: (user) => {

    localStorage

      .setItem(userStorageKey, JSON.stringify(user))

  },
  logOut() {

    localStorage.clear();

    window.location.href = "/"

  },

  createStripeStarterMembership: (membershipPaymentData) => {

    return restService

      .post(urlService.stripeStarterMembership + "/create-pro-membership", {
        membershipPaymentData,
        type: "STARTER"
      })

  },
  createStripeProMembership: (membershipPaymentData) => {

    return restService

      .post(urlService.stripeStarterMembership + "/create-pro-membership", {
        membershipPaymentData,
        type: "PRO"
      })

  },
  signUpBusinessUser: (businessSignUpInfo) => {

    return userService

      .post({
        businessSignUpInfo
      })

  },
  createProMembership: ({_id, userEmail}) => {

    return restService

      .post(urlService.memberships + "/create-pro-membership", {
        _id,
        userEmail
      })

  },
  createStaterMembership: ({_id, userEmail}) => {

    return restService

      .post(urlService.memberships + "/create-stater-membership", {
        _id,
        userEmail
      })

  },
  executeMembership: ({token, _id}) => {

    return restService

      .post(urlService.memberships + "/execute-membership-agreement", {
        token,
        _id
      })

  },
  signUpCoChewer: (userSignUpInfo) => {

    return userService

      .post({
        userSignUpInfo
      })

  },
  checkLoginStatus: () => {

    userService

      .get({
        params: {
          _id: 1
        }
      })

      .filter((getCurrentUserResponse) => {

        return !getCurrentUserResponse._id

      })

      .subscribe((noUserSubscribe) => {

        urlService.goTo(urlService.loginPage)

      })

  }

}

export default userService