import Rx from 'rxjs'

import urlService from '../Services/urlService.js';

import userService from '../Services/userService.js';

var post = function(signUpCredentials) {

  return Rx.Observable.fromPromise(fetch(urlService.signUp, {

    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(signUpCredentials)

  }).then((res) => res.json()))

}

var singUpService = {


  post
}

export default singUpService