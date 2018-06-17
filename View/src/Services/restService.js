const Rx = require('rxjs');

var restStorageKey = 'workChew.rest'

var restService = {

  restStorageKey,

  get: (url) => {

    return Rx.Observable.fromPromise(fetch(url, {

      method: "GET",

      headers: {
        "x-api-access-token": getAccessToken()
      },
    }).then((res) => res.json()))

  },
  delete: (url) => {

    return Rx.Observable.fromPromise(fetch(url, {

      headers: {
        "content-type": "application/json",

        "x-api-access-token": getAccessToken()
      },
      method: "DELETE",

    }).then((res) => res.json()))

  },
  post: (url, body, headers?) => {

    if (headers && headers["content-type"]) {

    } else {

      body = JSON.stringify(body)
    }

    return Rx.Observable.fromPromise(fetch(url, {

      method: "POST",

      headers: {
        "content-type": "application/json",
        ...headers,
        "x-api-access-token": getAccessToken()
      },

      body: body

    })

      .then((res) => res.json()))

  },

  postImage: (url, body) => {

    return Rx.Observable.fromPromise(fetch(url, {

      method: "POST",

      headers: {

        "x-api-access-token": getAccessToken()
      },
      body
    })

      .then((res) => res.json()))

  },
  put: (url, body) => {

    return Rx.Observable.fromPromise(fetch(url, {

      method: "PUT",

      headers: {
        "content-type": "application/json",
        "x-api-access-token": getAccessToken()

      },

      body: JSON.stringify(body)

    })

      .then((res) => res.json()))

  }
}

var getAccessToken = function() {

  var localUserString = localStorage.getItem('workchew.user')

  if (localUserString && localUserString.length > 0) {

    var user = JSON.parse(localUserString);

    if (user.auth && (user.auth.accessToken || user.auth.token)) {

      return user.auth.accessToken || user.auth.token

    } else {

      return null

    }

  } else {

    return null

  }

}

export default restService