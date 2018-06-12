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