const API_ROOT = window.location.port == 3000 ? "http://localhost:8080" : ""

const callApi = (endpoint, config = {}) => {

  const fullUrl = addQueryParams(`${API_ROOT}${endpoint}`, config.query)

  var responseType = "json"

  config.headers = {
    "x-api-access-token": getAccessToken()
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

const usersApiPath = `/user`

export default store => next => action => {

  switch (action.type) {

    case "GET_USER": {

      return callApi(usersApiPath, action.config)
        .then(data => next({
          type: "GET_USER_SUCCESS",
          data: data[0]
        }))

    }
    case "GET_USERS": {

      return callApi(usersApiPath, action.config)
        .then(data => next({
          type: "GET_USERS_SUCCESS",
          data
        }))
    }
    case "POST_USER": {

      return callApi(usersApiPath, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        ...action.config,
        body: JSON.stringify(action.config.body)
      })
        .then(data => next({
          type: "POST_USER_SUCCESS",
          data
        }))
    }
    case "PUT_USER": {

      return callApi(usersApiPath, {
        method: "PUT",

        headers: {
          "Content-type": "application/json"
        },
        ...action.config,
        body: JSON.stringify(action.config.body)
      })
        .then(data => next({
          type: "PUT_USER_SUCCESS",
          data
        }))
    }
    default:
      return next(action)
  }

}