var isDev = window.location.href.indexOf(3000) > -1

console.log('isDev', isDev)

var base = isDev ? 'http://localhost:8080' : ''

export default {
  main: `/`,
  loginPage: `/Login`,
  viewUserPage: `/view-user`,

  viewBusinessPage: `/view-business`,

  login: `${base}/Login`,
  signUp: `${base}/SignUp`,
  user: `${base}/User`,

  business: `${base}/business`,
  goTo: function(route) {

    window.location.hash = route
  // body...
  }

}