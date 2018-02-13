import Rx from 'rxjs'

import urlService from '../Services/urlService.js';

import userService from '../Services/userService.js';

var post = function(LoginCredentials) {

  return Rx.Observable.fromPromise(fetch(urlService.login, {

    method: "POST",

    headers: {
      "Content-type": "application/json"
    },

    body: JSON.stringify(LoginCredentials)

  }).then((res) => res.json()))

}

var loginService = {

  post
}

export default loginService