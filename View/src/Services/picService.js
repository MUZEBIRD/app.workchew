import Rx from 'rxjs'

import urlService from '../Services/urlService.js';

import picSerivce from '../Services/picService.js';

var post = function(picForm) {

  return Rx.Observable.fromPromise(

    fetch(urlService.pic, {

      method: "POST",

      body: picForm

    })

      .then((res) => res.json())
  )

}

var get = function(query) {

  var qs = Object.keys(query)

    .reduce((run, key, i) => {

      return run

        .concat(i ? '&' : '')

        .concat(key)

        .concat('=')

        .concat(query[key])

    }, '?')

  var picQueryUrl = urlService.pic + qs

  return Rx.Observable.fromPromise(

    fetch(picQueryUrl, {

      method: "GET",
    })

      .then((res) => res.json())
  )
}

var picService = {

  get,

  post
}

export default picService