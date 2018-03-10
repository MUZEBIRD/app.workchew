import React, { Component } from 'react';

import loginService from '../Services/loginService.js'

import signUpService from '../Services/signUpService.js'

import userService from '../Services/userService.js'

import urlService from '../Services/urlService.js'

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

    else loginService

        .post({

          email: 'seth',

          password: ''

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

  signUp() {

    var email = document.getElementById('userEmail').value

    var password = document.getElementById('userPassword').value

    if (email && password) signUpService

        .post({

          email,
          password
        })

        .subscribe((SignUpResponse) => {

          if (SignUpResponse.msg) {

            this.showAlert(SignUpResponse.msg)


          }

          if (SignUpResponse.user && SignUpResponse.user._id) {

            userService.store(SignUpResponse.user)

            urlService.goTo(urlService.main)

          }

        },
          (err) => {

            if (err) {

              this.showAlert({
                text: "sign up error",
                class: "danger"
              })

            }


          })

    else signUpService

        .post({

          email: 'seth',

          password: ''

        })

        .subscribe((SignUpResponse) => {

          if (SignUpResponse.msg) {

            this.showAlert(SignUpResponse.msg)

          }

          if (SignUpResponse.user && SignUpResponse.user._id) {

            userService.store(SignUpResponse.user)

            urlService.goTo(urlService.main)

          }

        },
          (err) => {

            if (err) {


              this.showAlert({
                text: "sign up error dude",
                class: "danger"
              })
            }


          })

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
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <input placeholder='Email' id='userEmail' className="form-control input-lg text-center" />
            <br/>
            <input type='password' placeholder='Password' id='userPassword' className="form-control input-lg text-center" />
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-sm-4"></div>
          <div className="col-sm-1"></div>
          <div className="col-sm-2">
            <button className="btn btn-info" onClick={ () => {
                                                         this.login()
                                                       } }>
              Login
            </button>
          </div>
        </div>
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