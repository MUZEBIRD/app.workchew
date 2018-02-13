var logger = function(req, res, next) {

  console.log("")
  console.log("")

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
  // socketKeys: Object.keys(req.socket)
  })

  console.log("")
  console.log("")

  next();
}

module.exports = logger