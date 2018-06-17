var isDev = window.location.href.indexOf(3000) > -1

console.log('isDev', isDev)

var base = isDev ? 'http://localhost:8080' : ''

export default {
  main: `/`,
  loginPage: `/Login`,
  viewUserPage: `/view-user`,
  coChewerSignUp: `/co-chewer-signUp-social`,
  businessSignUp: `/business-signup`,
  viewBusinessPage: `/view-business`,

  adminPartnerPage: '/admin-partner-page',

  partnerPage: `/partner-page`,
  businessPage: `/business-page`,
  login: `${base}/Login`,
  signUp: `${base}/SignUp`,
  user: `${base}/User`,
  payPal: `${base}/pay-pal`,
  pic: `${base}/pic`,


  business: `${base}/business`,
  goTo: function(route) {

    window.location.hash = route
  // body...
  }

}