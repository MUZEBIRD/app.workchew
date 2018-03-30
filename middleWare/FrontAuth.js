var Url = require('url');

var checkAccessToken = function({pathname, body, accessToken, query}) {


  return true;
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

  var pathname = Url.parse(url).pathname;

  console.log(Url.parse(url), body, pathname.toLowerCase())

  if (!headers['x-api-access-token'] && pathname.toLowerCase() != '/user' && pathname.toLowerCase() != '/login') {

    res.sendStatus(401)

  } else if (pathname.toLowerCase() == '/user' && body.userSignUpInfo) {

    next();

  } else if (headers['x-api-access-token'] && checkAccessToken({
      pathname,
      body,
      accessToken,
      query
    })) {


    next()


  } else if (pathname.toLowerCase() == '/login') {

    next();

  } else {


    res.sendStatus(401)

  }

}

module.exports = FrontAuth