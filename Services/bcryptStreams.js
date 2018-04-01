var bcrypt = require('bcryptjs');
const Rx = require('rxjs');
const saltRounds = 10;

var hashUserPassword = function(myPlaintextPassword) {

  return Rx.Observable.create((observer) => {

    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
      // Store hash in your password DB.

      if (err) return observer.error(err)

      observer.next(hash)

    });

  })

} //hashUserPassword

var compare = function(plainText, hash) {

  return Rx.Observable.create((observer) => {

    bcrypt.compare(plainText, hash, function(err, res) {
      // Store hash in your password DB.

      if (err) return observer.error(err)

      observer.next(res)

    });

  })

} //testGivenPassword

module.exports = {
  hashUserPassword,
  compare
}