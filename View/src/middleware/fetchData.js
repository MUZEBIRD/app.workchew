const API_ROOT = window.location.port == 3000 ? "http://localhost:8080" : ""

const callApi = (config = {}) => {

  const fullUrl = `${API_ROOT}${config.url}`

  var responseType = "json"

  config.headers = {
    "x-api-access-token": getAccessToken(),
    ...config.headers
  }

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

var getAccessToken = function() {

  var localUserString = localStorage.getItem('workchew.user')

  if (localUserString && localUserString.length > 0) {

    var user = JSON.parse(localUserString);

    if (user.auth && (user.auth.accessToken || user.auth.token)) {

      return user.auth.accessToken || user.auth.token

    } else {

      return null

    }

  } else {

    return null

  }

}

var addQueryParams = (url, config) => {

  var paramString = Object.keys(config).reduce((paramString, paramKey, i) => {
    var showAmp = (i > 0) ? '&' : ''

    return `${paramString}${showAmp}${paramKey}=${config[paramKey]}`

  }, '')

  return `${url}?${paramString}`

}

export default store => next => action => {

  switch (action.type) {

    case "FETCH_DATA": {

      return callApi(action.config)
        .then(data => next({
          type: `${action.requestName}_SUCCESS`,
          data
        }))
    }
    default:
      return next(action)
  }

}
