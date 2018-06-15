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
  checkOut: (checkOutInfo) => {

    var {uid, bid} = checkOutInfo;

    var checkOutUrl = `${urlService.business}/${bid}/checkout/${uid}`

    return restService.put(checkOutUrl, checkOutInfo)

  },

  checkIn: (checkInInfo) => {

    var {uid, bid} = checkInInfo;

    var checkInUrl = `${urlService.business}/${bid}/checkin/${uid}`

    return restService.put(checkInUrl, checkInInfo)

  },
  updateBanner: (bannerUpdateForm) => {

    return restService.postImage(urlService.business, bannerUpdateForm)

  },
  post: (businessInfo) => {

    return restService.post(urlService.business, businessInfo)

  },

  put: (businessInfo) => {
    return restService.put(urlService.business, businessInfo)

  },

  delete: (businessInfo) => {

    var deleteBusinessUrl = `${urlService.business}?_id=${businessInfo._id}`;

    return restService.delete(deleteBusinessUrl)

  },

  firstUpperCase: (word) => {

    var first = word[0];
    var upper = word[0].toUpperCase();

    return word.replace(first, upper)

  },
  setGeoCoordinates: (lat, lng) => {

    document.getElementById("business-geoPoint-latitude").value = lat
    document.getElementById("business-geoPoint-longitude").value = lng

  },
  getGeoCoordinates: () => {

    var lat = document.getElementById("business-geoPoint-latitude").value

    var lng = document.getElementById("business-geoPoint-longitude").value

    if (lat.length > 0 && lng.length > 0) {

      return {
        lat,
        lng,
        geoPoint: {
          "type": "Point",
          "coordinates": [lng, lat]
        }
      }

    } else {
      return {
        geoPoint: null
      }
    }

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

  }
}

export default businessService




