var Url = require('url');

const auth = require('../Services/authService.js')

var checkAccessToken = function({pathname, body, accessToken, method, userRole, query}) {

  console.log("at check access token", userRole)

  var pathKey = pathname.substring(1).toLowerCase();

  console.log('pathkey at auth', pathKey)

  var pathAuth = userRole[pathKey] || {}
  var requestedObject = {}

  if ( (method == "POST" || method == "PUT") ) {

    requestedObject = body;

  }

  if (pathKey == "pay-pal") {

    return true
  }

  //IN BUSSINESS RELM
  if (pathKey == "business") {

    return businessRealmCheck({
      pathAuth,

      requestedObject
    })

  } //IN BUSSINESS RELM

  //IN USER RELM
  if (pathKey == "user") {

    return userRealmCheck(query, userRole)

  } //IN USER RELM

  return false;
} //checkAccessToken


var userRealmCheck = function(query, userRole) {
  if (query._id && query._id == userRole.userId) {

    return true;
  }

  return false;
}

var businessRealmCheck = function({pathAuth, requestedObject}) {

  var {allowedObjects} = pathAuth;

  if (allowedObjects) {

    var matchgingObjects = allowedObjects.filter((object) => requestedObject._id == object._id)

    if (matchgingObjects.length) {

      return true;

    }

    if (query._id) {

      var matchgingObjects = allowedObjects.filter((object) => object._id == query._id)

      if (matchgingObjects.length) {

        return true;

      }

    }

  } //allowedObjects

  return false;
}


var FrontAuth = function(req, res, next) {

  var teller = {
    body: req.body,
    query: req.query,
    time: new Date().toUTCString(),
    headers: req.headers,
    method: req.method,
    params: req.params,
    route: req.route,
    files: req.files,
    cookies: req.cookies,
    signedCookies: req.signedCookies,
    url: req.url,
  // socketKeys: Object.keys(req.socket)
  }

  var body = req.body;
  var query = req.query;
  var time = new Date().toUTCString();
  var headers = req.headers;
  var method = req.method;
  var params = req.params;
  var route = req.route;
  var files = req.files;
  var cookies = req.cookies;
  var signedCookies = req.signedCookies;
  var url = req.url;

  var accessToken = headers['x-api-access-token']
  var pathname = Url.parse(url).pathname;

  /*
   else if (!headers['x-api-access-token'] && pathname.toLowerCase() != '/user' && pathname.toLowerCase() != '/login') {

      res.status(401).send({
        error: 401
      })

    }
  */

  if (method == 'OPTIONS') {

    next();

  } else if (pathname.toLowerCase() == '/user' && body.userSignUpInfo) {

    next();

  } else if (pathname.toLowerCase() == '/public-business') {

    next();

  } else if (pathname.toLowerCase() == '/public-users') {

    next();

  } else if (pathname.toLowerCase() == '/login') {

    next();

  } else if (headers['x-api-access-token']) {

    auth.getRole(accessToken)

      .subscribe(userRole => {

        var access = checkAccessToken({
          pathname,
          body,
          accessToken,
          query,
          method,
          userRole
        })

        if (access || userRole.role == "admin") {

          next()

        } else {

          res.status(401).send({
            error: 401
          })

        }

      })

  } else {

    res.status(401).send({
      error: 401
    })

  }

}

module.exports = FrontAuth