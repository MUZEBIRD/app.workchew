var isDev = window.location.href.indexOf(3000) > -1

console.log('isDev', isDev)

var base = isDev ? 'http://localhost:8080' : ''

export default {
  main: `/`,
  loginPage: `/Login`,
  viewUserPage: `/view-user`,
  coChewerSignUp: `/co-chewer-signUp`,
  businessSignUp: `/business-signup`,
  viewBusinessPage: `/view-business`,
  businessPage: `/business-page`,
  login: `${base}/Login`,
  signUp: `${base}/SignUp`,
  user: `${base}/User`,
  payPal: `${base}/pay-pal`,


  business: `${base}/business`,
  goTo: function(route) {

    window.location.hash = route
  // body...
  }

}