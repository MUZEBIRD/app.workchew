import React, { Component } from 'react';

import loginService from '../Services/loginService.js'

import signUpService from '../Services/signUpService.js'

import userService from '../Services/userService.js'

import urlService from '../Services/urlService.js'

import FacebookLogin from 'react-facebook-login';

import GoogleLogin from 'react-google-login';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      LoginAlertMsg: "wrong password",
      alertVisibilty: 'hidden',
      alertLevel: 'warning'
    }
  }

  login() {

    var email = document.getElementById('userEmail').value

    var password = document.getElementById('userPassword').value

    if (email && password) loginService

        .post({

          email,
          password
        })

        .subscribe((LoginResponse) => {

          if (LoginResponse.msg) {

            this.showAlert(LoginResponse.msg)

          }

          if (LoginResponse.user && LoginResponse.user._id) {

            userService.store(LoginResponse.user)

            urlService.goTo(urlService.main)

          }

        },
          (err) => {

            if (err) {

              this.showAlert({
                text: "log in error",
                class: "danger"
              })
            }


          })



  }

  socialSignUp(userSignUpInfo) {

    this.setState({
      showLoader: true
    })

    userService

      .signUpCoChewer(userSignUpInfo)

      .subscribe((signUpCoChewerResponse) => {

        var {userResponse} = signUpCoChewerResponse;

        console.log("signUpCoChewerResponse", signUpCoChewerResponse)

        if (userResponse._id) {
          userService.storeSignUpInfo(userResponse)


          var {memberShipInfo} = userResponse;

          var {paymentAuth} = memberShipInfo;

          var {token} = paymentAuth;

          this.setState({
            signUpData: userResponse,
            showLoader: false
          }, () => {

            userService.store(userResponse)

            urlService.goTo(`${urlService.buildProfile}?id=${userResponse._id}`)
          })

        /*userResponse._id*/
        } else if (userResponse.user && userResponse.user._id) { /*userResponse.user*/

          userService.store(userResponse.user)

          urlService.goTo(urlService.main)
        } else {

          this.setState({
            showLoader: false,
            showDialog: true,
            dialogMsg: userResponse.msg
          })

        }

      })
  }

  responseGoogle = (response) => {

    console.log(response);

    var {profileObj, accessToken} = response

    var {email, givenName, familyName, googleId, imageUrl, name} = profileObj

    var userSignUpInfo = {
      ...{
        firstName: givenName,
        lastName: familyName,
        accessToken,
        email,
        googleId
      },
      googleImgUrl: imageUrl
    }

    this.socialSignUp(userSignUpInfo)

  }

  responseFacebook = (response) => {

    console.log(response);

    var {accessToken, email, first_name, last_name, userID, picture: {data: {url}}} = response

    var userSignUpInfo = {
      ...{
        firstName: first_name,
        lastName: last_name,
        accessToken,
        email
      },
      facebookUserId: userID,
      facebookImgUrl: url
    }

    this.socialSignUp(userSignUpInfo)

  }

  responseLinkedin = (response) => {

    // Use the API call wrapper to request the member's basic profile data
    window.IN.API.Profile("me").fields("id,firstName,lastName,summary,specialties,headline,email-address,picture-urls::(original),public-profile-url,location:(name)")
      .result((me) => {
        var profile = me.values[0];
        var id = profile.id;
        var firstName = profile.firstName;
        var lastName = profile.lastName;
        var emailAddress = profile.emailAddress;
        var pictureUrl = profile.pictureUrls.values[0];
        var profileUrl = profile.publicProfileUrl;
        var country = profile.location.name;

        console.log("mememememe", me)

        var userSignUpInfo = {
          linkedInId: id,
          headline: profile.headline,
          summary: profile.summary,
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.emailAddress,
          linkedInPictureUrl: profile.pictureUrls.values[0],
          profileUrl: profile.publicProfileUrl,
          location: profile.location.name,

        }

        this.socialSignUp(userSignUpInfo)


      });

  }

  goToCoChewerSignUp() {

    urlService.goTo(urlService.coChewerSignUp)

  }
  goToBusinessSignUp() {

    urlService.goTo(urlService.businessSignUp)

  }

  closeAlert() {
    this.setState({
      alertVisibilty: 'hidden'
    })
  }

  showAlert(msg) {
    this.setState({
      LoginAlertMsg: msg.text,
      alertVisibilty: 'visible',
      alertLevel: msg.class
    })

  }

  render() {

    return (

      <div className="wholeView">
        <br/>
        <br/>
        <div>
          <img className="logo" src={ "/static/images/logo.png" } />
        </div>
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <div className={ "alert alert-" + this.state.alertLevel } style={ { visibility: this.state.alertVisibilty } } role="alert">
              <button type="button" className="close" onClick={ () => {
                                                                  this.closeAlert()
                                                                } } aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
              <strong>Oh snap!</strong>
              <br/>
              { this.state.LoginAlertMsg }
            </div>
          </div>
        </div>
        <div className='d-flex' style={ { backgroundColor: 'white', position: 'relative', zIndex: '5' } }>
          <div className='flex-1'>
            <br/>
            <br/>
            <FacebookLogin autoLoad={ false } appId="1755466141213974" fields="email,picture,first_name,last_name" callback={ this.responseFacebook } />
            <br/>
            <br/>
            <GoogleLogin clientId="198825134082-5l64c1opmt10ts62nm7ka7dssev9iok9.apps.googleusercontent.com" buttonText="Login with Google" onSuccess={ this.responseGoogle } onFailure={ this.responseGoogle }
            />
            <br/>
            <br/>
            <button onClick={ (event) => {
                              
                                window['IN'].User.authorize((responseLinkedin) => {
                              
                                  this.responseLinkedin(responseLinkedin)
                              
                                });
                              
                              } } className={ "linkedin-button" }>
            </button>
          </div>
          <p>
            or
          </p>
          <div className='flex-1'>
            <br/>
            <br/>
            <div className='row'>
              <div className='col-sm-3'></div>
              <div className='col-sm-6'>
                <input placeholder='Email' id='userEmail' className="form-control input-lg text-center" />
              </div>
            </div>
            <br/>
            <div className='row'>
              <div className='col-sm-3'></div>
              <div className='col-sm-6'>
                <input type='password' placeholder='Password' id='userPassword' className="form-control input-lg text-center" />
              </div>
            </div>
            <br/>
            <div className='d-flex justify-content-center'>
              <button className="btn btn-info" onClick={ () => {
                                                           this.login()
                                                         } }>
                Login
              </button>
            </div>
          </div>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4 flex-row-space-around">
            <span>Sign Up as a Co-Chewer</span>
            <button className="btn btn-success" onClick={ () => {
                                                            this.goToCoChewerSignUp()
                                                          } }>
              click here
            </button>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4 flex-row-space-around">
            <span>Sign Up as Business Owner</span>
            <button className="btn btn-success" onClick={ () => {
                                                            this.goToBusinessSignUp()
                                                          } }>
              click here
            </button>
          </div>
        </div>
      </div>

      );
  }

}

export default Login;