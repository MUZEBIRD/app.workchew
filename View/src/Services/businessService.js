import Rx from 'rxjs'

import restService from '../Services/restService.js';
import urlService from '../Services/urlService.js'

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

            .concat(params[key])

        }, '?')

      var getBusinessUrl = `${urlService.business}${qs}`

      return restService.get(getBusinessUrl)

    }

  },
  post: (businessInfo) => {

    return restService.post(urlService.business, businessInfo)

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




