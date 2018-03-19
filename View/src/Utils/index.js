var getPathVariables = () => {

  var [path, id] = window.location.pathname.split('/');


  return {
    path,
    id
  }

}

var getQueryParams = function() {

  var url = window.location.href;
  console.log('url', url)

  var queryString = url.substring(url.indexOf('?') + 1)

  if (url.indexOf('?') > -1) {

    var splits = queryString.split('&')

    var queryParams = splits

      .map(split => split.split('='))

      .map(([name, value]) => {

        return {

          [name]: value
        }

      })

      .reduce((params, splitItem) => {

        return {
          ...params,
          ...splitItem
        }

      }, {})

    console.log('queryParams', queryParams)

    return queryParams

  }

}

export { getQueryParams, getPathVariables }