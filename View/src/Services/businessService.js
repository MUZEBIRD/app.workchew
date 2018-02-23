import Rx , { Subject } from 'rxjs'

import restService from '../Services/restService.js';
import urlService from '../Services/urlService.js'

var businessStorageKey = 'workchew.business'

var businessService = {
  subject: new Subject(),

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
    return restService.put(urlService.business, businessInfo)

  },

  getSeats: (seats) => {

    return seats

      .map((seat, i) => {

        var customerId = `${i}seatCustomer`;

        var sectionId = `${i}seatSection`;
        if (!document.getElementById(customerId)) {

          return seat

        }
        var customer = document.getElementById(customerId).value;

        var section = document.getElementById(sectionId).value;

        return {
          customer,
          section
        }

      })

  }

}

export default businessService




