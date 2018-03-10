var nodemailer = require('nodemailer');
var rx = require('rxjs');

var sendAdminSignUpEmail = function(signUpData) {

  console.log('sendAdminSignUpEmail  ', {
    signUpData
  });

  var htmlMsg = "";

  htmlMsg = "<p>user has signed up</p>"

  return sendEmail({
    mailOptions: {
      from: '" jVents " <jtVents@gmail.com>', // sender address
      to: "isethguy@gmail.com", // list of receivers
      subject: 'welcome ✔', // Subject line
      html: htmlMsg
    }
  })

}

var sendThankForSignUpEmail = function(signUpData) {

  console.log('sendThankForSignUpEmail  ', {
    signUpData
  });

  var htmlMsg = "";

  htmlMsg = "<p>thank you for signing up</p>"

  return sendEmail({
    mailOptions: {
      from: '" jVents " <jtVents@gmail.com>', // sender address
      to: signUpData.email, // list of receivers
      subject: 'welcome ✔', // Subject line
      html: htmlMsg
    }
  })

} //sendThankForSignUpEmail

var sendUserVerificationEmail = function(signUpData) {

  console.log('sendUserVerificationEmail  ', {
    signUpData
  });

  var htmlMsg = "";

  htmlMsg = "<p>click here to verify</p>"

  return sendEmail({
    mailOptions: {
      from: '" jVents " <jtVents@gmail.com>', // sender address
      to: signUpData.email, // list of receivers
      subject: 'welcome ✔', // Subject line
      html: htmlMsg
    }
  })

}

var emailService = {

  sendEmail,

  sendAdminSignUpEmail,

  sendThankForSignUpEmail,

  sendUserVerificationEmail
}

module.exports = emailService;