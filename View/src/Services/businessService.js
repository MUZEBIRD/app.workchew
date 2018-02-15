const Rx = require('rxjs');

import restService from '../Services/restService.js';

var businessStorageKey = 'workchew.business'

var businessService = {

  businessStorageKey,

  get: ({params}) => {

    if (params._id === 1) {

      var localBusinessString = localStorage.getItem(businessStorageKey)

      if (localBusinessString && localBusinessString.length > 0) {

        return Rx.Observable.of(JSON.parse(localBusinessString))

      } else {

        return Rx.Observable.of({})

      }

    } else {

      var qs = Object.keys(params)

        .reduce((run, key, i) => {

          return run

            .concat(i ? '&' : '')

            .concat(key)

            .concat('=')

            .concat(query[key])

        }, '?')

      return Rx.Observable.of({})

    }

  },
  post: (businessInfo) => {
    return Rx.Observable.of({
      businessInfo
    })

  },

  put: (businessInfo) => {
    return Rx.Observable.of({
      businessInfo
    })

  },
  checkLoginStatus: () => {




  }

}

export default businessService




