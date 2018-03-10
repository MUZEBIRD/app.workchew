var nodemailer = require('nodemailer');
var rx = require('rxjs');

var sendEmail = function(emailData) {

  var result = JSON.stringify(docs);

  var transporter = nodemailer.createTransport('smtps://jtvents@gmail.com:sethwins@smtp.gmail.com');

  var mailOptions = emailData.mailOptions

  // send mail with defined transport object

  return rx.Observable.create(function(observer) {

    transporter.sendMail(mailOptions, function(error, info) {

      if (error) {

        console.log(error);

        observer.error(error)

      } else {

        console.log('Message sent: ', info.response);

        observer.next({

          info: info,
          SignUp: true,
          msg: 'thank you for signing up , check you inbox for a email from joint Ventures to verify your account'

        });

      }

    });

  })

}

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