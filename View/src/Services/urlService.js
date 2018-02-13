var isDev = window.location.href.indexOf(3000) === 17

console.log('isDev', isDev)

var base = isDev ? 'http://localhost:8080' : ''

export default {
  main: `/`,
  loginPage: `/Login`,
  viewShopPage: `/ViewShop`,
  login: `${base}/Login`,
  signUp: `${base}/SignUp`,
  user: `${base}/User`,
  pic: `${base}/Pic`,
  location: `${base}/Location`,

  goTo: function(route) {

    window.location.hash = route
  // body...
  }

}