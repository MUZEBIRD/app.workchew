const Rx = require('rxjs');

var restStorageKey = 'workChew.rest'

var restService = {

  restStorageKey,

  get: (url) => {

    return Rx.Observable.fromPromise(fetch(url, {

      method: "GET",

      headers: {
        "Content-type": "application/json"
      }

    }).then((res) => res.json()))

  },
  post: (url, body) => {

    return Rx.Observable.fromPromise(fetch(urlService.login, {

      method: "POST",

      headers: {
        "Content-type": "application/json"
      },

      body: JSON.stringify(LoginCredentials)

    }).then((res) => res.json()))

  }

}

export default restService