var nodemailer = require('nodemailer');
var rx = require('rxjs');

// hello@workchew.com

// Worckchew2018#

var sendEmail = function(emailData) {

  let smtpConfig = {
    host: 'smtp.office365.com',
    //  port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: 'hello@workchew.com',
      pass: 'WorkWorkChew1@'
    }
  };

  // let smtpConfig = {
  //   host: 'smtp.gmail.com',
  //   secure: true, // upgrade later with STARTTLS
  //   auth: {
  //     user: 'jtvents@gmail.com',
  //     pass: 'sethwins@'
  //   }
  // };

  //var transporter = nodemailer.createTransport('smtps://jtvents@gmail.com:sethwins@smtp.gmail.com');
  //var transporter = nodemailer.createTransport('smtps://hello@workchew.com:WorkWorkChew1@@smtpout.secureserver.net');
  var transporter = nodemailer.createTransport(smtpConfig);

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
          msg: 'thank you for signing up , check your email to verify your account'

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

  var signUpEmail = ""

  if (signUpData.businessSignUpInfo) {

    var {email, name, message} = signUpData.businessSignUpInfo

    htmlMsg = `<p> A business named, ${name} , wants to join with  email : ${email}</p>

        <p> message: ${message}</p>`

  }

  if (signUpData.userSignUpInfo) {

    signUpEmail = signUpData.userSignUpInfo.email

    htmlMsg = `<p>user has signed up with email : ${signUpEmail}</p>`

  }

  return sendEmail({
    mailOptions: {
      from: 'hello@workchew.com', // sender address
      to: "isethguy@gmail.com", // list of receivers
      //  to: "isethguy@gmail.com,mb@workchew.com", // list of receivers
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

  var signUpEmail = signUpData.businessSignUpInfo.email

  return sendEmail({
    mailOptions: {
      from: 'hello@workchew.com', // sender address
      to: signUpEmail, // list of receivers
      subject: 'welcome ✔', // Subject line
      html: htmlMsg
    }
  })

} //sendThankForSignUpEmail

var sendUserVerificationEmail = function(signUpData) {

  console.log('sendUserVerificationEmail  ', {
    signUpData
  });

  var toEmail = signUpData.userSignUpInfo.email

  var htmlMsg = "";

  htmlMsg = "<p>click here to verify</p>"

  return sendEmail({
    mailOptions: {
      from: 'hello@workchew.com', // sender address
      to: toEmail, // list of receivers
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