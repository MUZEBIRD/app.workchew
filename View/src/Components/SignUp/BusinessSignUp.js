import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import userService from '../../Services/userService.js'
import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'
import { getQueryParams, getPathVariables } from '../../Utils'
import { Topbar } from '../TopBar.js'

class BusinessUserSignUp extends Component {

  constructor(props) {

    super(props);

    this.state = {};

  }

  componentDidMount() {


    var params = getQueryParams() || {};

    if (params.id) {

      this.setState({
        bid: params.id
      })

    }

    userService

      .get({
        params: {
          _id: 1
        }
      })

      .subscribe((user) => {

        this.setState({
          currentUser: user
        })

      })
  }

  signUp = () => {

    var fields = [...document.getElementsByClassName('partner-sign-up-form-feild')];

    var businessSignUpInfo = fields.reduce((info, inputField) => {

      info[inputField.name] = inputField.value;

      return info;

    }, {
      bid: this.state.bid
    })

    userService

      .signUpBusinessUser(businessSignUpInfo)
      .subscribe((businessSignUpResponse) => {
        console.log({
          businessSignUpResponse
        })

        alert("thanks for signing up check your email for next steps")

        if (this.state.bid) {

          window.location.hash = "admin-partner-page?id=" + this.state.bid

        } else {

          window.location.hash = "login"

        }
      }

    )
  }

  render() {

    return (

      <div className="wholeView">
        <div className="showView  container">
          <br/>
          <br/>
          <Topbar title={ 'Create Account' } />
          <br/>
          <div className='row'>
            <div className='col-sm-12 d-flex flex-column align-items-center'>
              <input name="name" placeholder="Name of Business" className="form-control w-50 partner-sign-up-form-feild" />
              <br/>
              <input name="email" placeholder="Contact Email" className="form-control w-50 partner-sign-up-form-feild" />
              <br/>
              { this.state.currentUser
                && this.state.currentUser.auth
                && (this.state.currentUser.auth.role == 'admin')
                ? <input name="password" placeholder="Password" className="form-control w-50 partner-sign-up-form-feild" />
                : <textarea name="message" placeholder="Message (Optional)" className="form-control w-50 partner-sign-up-form-feild" /> }
              <br/>
              <button onClick={ this.signUp } className="btn btn-success">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>

      );
  }

}

export default BusinessUserSignUp;