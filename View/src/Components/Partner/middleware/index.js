const API_ROOT = window.location.port == 3000 ? "http://localhost:8080" : ""

const callApi = (endpoint, config = {}) => {

  const fullUrl = `${API_ROOT}${endpoint}`

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

const partnersApiUrl = `${API_ROOT}/partners`

export default store => next => action => {

  switch (action.type) {

    case "GET_PARTNER": {

      return callApi(partnersApiUrl)
    }
    case "GET_PARTNERS": {

      return callApi(partnersApiUrl)
    }
    default:
      return next(action)
  }

}