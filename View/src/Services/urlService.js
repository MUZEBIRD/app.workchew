var isDev = window.location.port == 3000

console.log('isDev', isDev)

var base = isDev ? 'http://localhost:8080' : ''

export default {
  main: `/`,
  loginPage: `/Login`,
  viewUserPage: `/view-user`,
  coChewerSignUp: `/co-chewer-signUp-social`,
  businessSignUp: `/business-signup`,
  viewBusinessPage: `/view-business`,
  buildProfile: '/co-chewer-signUp-build',
  adminPartnerPage: '/admin-partner-page',
  createPartnerUser: 'business-signup',
  memberships: `${base}/memberships`,
  partnerPage: `/partner-page`,
  businessPage: `/business-page`,
  editUserProfile: '/co-chewer-signUp-build',
  userProfile: '/user-profile',
  login: `${base}/Login`,
  signUp: `${base}/SignUp`,
  changePassword: '/changePassword',
  user: `${base}/User`,
  payPal: `${base}/pay-pal`,
  pic: `${base}/pic`,
  business: `${base}/business`,
  goTo: function(route) {

    window.location.hash = route
  // body...
  }

}