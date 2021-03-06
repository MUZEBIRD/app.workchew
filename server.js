const request = require('request'),
  bodyParser = require('body-parser'),
  express = require('express'),
  path = require('path'),
  Rx = require('rxjs'),
  http = require('http'),
  https = require('https'),
  router = express.Router(),
  fs = require('fs'),

  //MY WARES, ANYWHERES
  auth = require('./middleWare/FrontAuth'),

  logger = require('./middleWare/logger'),
  headerConfigMiddleWare = require('./middleWare/headerConfigMiddleWare');

app = express();
app.use(express.static(path.join(__dirname, 'View/build')));

const {HTTP_PORT = 8080, HTTPS_PORT = 443, NODE_ENV = 'development'} = process.env;

// START SERVER
Promise.resolve()
  .then(() => http.createServer(app).listen(HTTP_PORT, () => {

    console.log(`App listening on HTTP_PORT ${HTTP_PORT}`)

  }))

  .then(() => configSSL())

  .catch((err) => {
    if (NODE_ENV === 'development') console.error(err.stack);
  });

// ROUTES

var configSSL = function() {

  if (process.env.SSL_START) {

    var ssl = {
      key: fs.readFileSync('./certs/private.key'),
      cert: fs.readFileSync('./certs/certificate.crt'),
      ca: fs.readFileSync('./certs/ca_bundle.crt')
    }

    return https.createServer(ssl, app).listen(HTTPS_PORT, () => {

      console.log(`App listening on HTTPS_PORT ${HTTPS_PORT}`)

    })

  } else {

    return Promise.resolve()

  }
}

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true,
  limit: '5000mb'
}));

app.use(headerConfigMiddleWare);

app.use(logger);

//app.use(auth)

const routes = require('./routes/');

app.use('/', routes);

// Middleware to catch any 404s
app.use(function(request, response, next) {

  return response.status(404).json(

    {

      message: 'The endpoint ' + request.originalUrl + ' does not exist.'

    }
  );
});

module.exports = app;