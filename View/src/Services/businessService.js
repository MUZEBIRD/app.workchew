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

  getSeats: (seats = []) => {

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

  },

  getDiscounts: (discounts = []) => {

    return discounts

      .map((discount, i) => {

        var nameId = `${i}discountName`;

        var descriptionId = `${i}discountDescription`;

        if (!document.getElementById(nameId)) {

          return discount

        }

        var name = document.getElementById(nameId).value;

        var description = document.getElementById(descriptionId).value;

        return {
          name,
          description
        }

      })

  },

  firstUpperCase: (word) => {

    var first = word[0];
    var upper = word[0].toUpperCase();

    return word.replace(first, upper)

  },

  getlistDataByKeyName: (keyName, stateList = [], props = []) => {

    console.log({
      props
    })

    return stateList

      .map((stateListItem, i) => {

        return props.reduce((listItemData, prop) => {

          var propInputId = `${i}${keyName}${businessService.firstUpperCase(prop)}`
          console.log({
            propInputId
          })
          var propInput = document.getElementById(propInputId)

          if (propInput) {

            listItemData[prop] = propInput.value

          }

          return listItemData

        }, {})

      })

  },
  getTags: (tags = []) => {

    return tags

      .map((tag, i) => {

        var textId = `${i}tagText`;

        if (!document.getElementById(textId)) {

          return tag

        }

        var text = document.getElementById(textId).value;

        return {
          text
        }

      })

  },

  getWeekday_text: (weekday_texts = []) => {

    return weekday_texts

      .map((weekday_text, i) => {

        var textId = `${i}weekday_textText`;

        if (!document.getElementById(textId)) {

          return weekday_text

        }

        var text = document.getElementById(textId).value;

        return {
          text
        }

      })

  }
}

export default businessService




