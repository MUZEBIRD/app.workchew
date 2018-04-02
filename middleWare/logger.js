var logger = function(req, res, next) {

  console.log("")
  console.log("")
  var remoteIp = ""

  if (req.connection && req.connection.remoteAddress) {

    remoteIp = req.connection.remoteAddress

  }


  console.log({
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
    remoteIp: remoteIp
  // socketKeys: Object.keys(req.socket)
  })

  console.log("")
  console.log("")

  next();
}

module.exports = logger