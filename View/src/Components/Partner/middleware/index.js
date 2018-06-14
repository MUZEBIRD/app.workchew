const API_ROOT = window.location.port == 3000 ? "http://localhost:8080" : ""
export const CALL_API = 'Call API'

const callApi = (endpoint, config = {}) => {

  const fullUrl = addQueryParams(`${API_ROOT}${endpoint}`, config.query)

  var responseType = "json"

  if (config && config.responseType) {

    responseType = config.responseType;

  }

  return fetch(fullUrl, config)

    .then(response => response[responseType]().then(json => {

      if (!response.ok) {
        return Promise.reject(json)
      }

      return Object.assign({}, json)

    }))
}

var addQueryParams = (url, config) => {

  var paramString = Object.keys(config).reduce((paramString, paramKey, i) => {
    var showAmp = (i > 0) ? '&' : ''

    return `${paramString}${showAmp}${paramKey}=${config[paramKey]}`

  }, '')

  return `${url}?${paramString}`

}

const partnersApiPath = `/partners`

export default store => next => action => {

  switch (action.type) {

    case "GET_PARTNER": {

      return callApi(partnersApiPath, action.config)
        .then(data => ({
          type: "GET_PARTNER_SUCCESS",
          data
        }))

    }
    case "GET_PARTNERS": {

      return callApi(partnersApiPath, action.config)
        .then(data => ({
          type: "GET_PARTNERS_SUCCESS",
          data
        }))
    }
    case "POST_PARTNER": {

      return callApi(partnersApiPath, action.config)
        .then(data => ({
          type: "POST_PARTNER_SUCCESS",
          data
        }))
    }
    case "PUT_PARTNER": {

      return callApi(partnersApiPath, action.config)
        .then(data => ({
          type: "PUT_PARTNER_SUCCESS",
          data
        }))
    }
    default:
      return next(action)
  }

}