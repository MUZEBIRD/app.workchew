import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import userService from '../../Services/userService.js'
import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'

class BusinessUserSignUp extends Component {

  constructor(props) {

    super(props);

  }

  signUp() {

    var fields = [...document.getElementsByClassName('sign-up-form-feild')];

    var businessSignUpInfo = fields.reduce((info, inputField) => {

      info[inputField.name] = inputField.value;

      return info;

    }, {})

    userService

      .signUpBusinessUser(businessSignUpInfo)
      .subscribe((businessSignUpResponse) => {
        console.log({
          businessSignUpResponse
        })
        alert("thanks for signing up check your email for next steps")
      }

    )
  }

  render() {

    return (

      <div className="wholeView flex-col">
        <div className="showView container">
          <div className='row flex-row-center-vert' style={ { backgroundColor: 'white', position: 'relative', zIndex: '5', height: '10%' } }>
            <div className='col-sm-4'>
            </div>
            <div className='col-sm-4'>
              <h2>Business Sign Up</h2>
            </div>
            <div className='col-sm-4'>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-6'>
              <input name="name" placeholder="Name of Business" className="form-control sign-up-form-feild" />
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-sm-6'>
              <input name="email" placeholder="Contact Email" className="form-control sign-up-form-feild" />
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-sm-6'>
              <textarea name="message" placeholder="Message (Optional)" className="form-control sign-up-form-feild" />
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-sm-1'>
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