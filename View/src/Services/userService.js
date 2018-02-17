import urlService from '../Services/urlService.js'

const Rx = require('rxjs');

var userStorageKey = 'workchew.user'

var userService = {

  userStorageKey,

  get: ({_id}) => {

    if (_id === 1) {

      var localUserString = localStorage.getItem(userStorageKey)

      if (localUserString && localUserString.length > 0) {

        return Rx.Observable.of(JSON.parse(localUserString))

      } else {

        return Rx.Observable.of({})

      }

    }

    return Rx.Observable.of({})

  },
  post: (userInfo) => {

  },
  store: (user) => {

    localStorage

      .setItem(
        userStorageKey, JSON.stringify({
          email: user.email,
          _id: user._id,
          name: user.name
        })
    )

  },

  pop: () => {


    alert('pop')

  },
  checkLoginStatus: () => {

    userService

      .get({
        _id: 1
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