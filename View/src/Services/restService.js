const Rx = require('rxjs');

var restStorageKey = 'workChew.rest'

var restService = {

  restStorageKey,

  get: (url) => {

    return Rx.Observable.fromPromise(fetch(url, {

      method: "GET",

    }).then((res) => res.json()))

  },
  delete: (url) => {

    return Rx.Observable.fromPromise(fetch(url, {

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
        ...headers
      },

      body: body

    })

      .then((res) => res.json()))

  },


  postImage: (url, body) => {



    return Rx.Observable.fromPromise(fetch(url, {

      method: "POST",


      body
    })

      .then((res) => res.json()))

  },
  put: (url, body) => {

    return Rx.Observable.fromPromise(fetch(url, {

      method: "PUT",

      headers: {
        "content-type": "application/json"
      },

      body: JSON.stringify(body)

    })

      .then((res) => res.json()))

  }
}

export default restService