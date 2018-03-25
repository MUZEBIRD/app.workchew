import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import userService from '../../Services/userService.js'
import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'


import { getQueryParams, getPathVariables } from '../../Utils'


class UserSignUp extends Component {

  constructor(props) {

    super(props);

    var queryParams = getQueryParams()

    this.state = {
      queryParams,
      showMemberShipSelections: false
    }

    console.log({
      queryParams
    })

  }

  signUp() {

    var fields = [...document.getElementsByClassName('sign-up-form-feild')];

    var userSignUpInfo = fields.reduce((info, inputField) => {

      info[inputField.name] = inputField.value

      return info;

    }, {})

    userService

      .signUpCoChewer(userSignUpInfo)

      .subscribe((signUpCoChewerResponse) => {

        var {userResponse: {newUser}} = signUpCoChewerResponse;

        console.log({
          signUpCoChewerResponse
        })

        userService.storeSignUpInfo(newUser)

        this.setState({
          signUpData: newUser,
          showMemberShipSelections: true
        })

        alert("thanks for signing up check your email for next steps")

      })
  }

  render() {

    return (

      <div className="wholeView flex-col">
        <div className="showView container">
          <div className='row flex-row-center-vert' style={ { backgroundColor: 'white', position: 'relative', zIndex: '5', height: '10%' } }>
            <div className='col-sm-4'>
            </div>
            <div className='col-sm-4'>
              <h2>User Sign Up</h2>
            </div>
            <div className='col-sm-4'>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-6'>
              <input placeholder="User Name" name="userName" className="form-control sign-up-form-feild" />
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-sm-6'>
              <input placeholder="Email" name="email" className="form-control sign-up-form-feild" />
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-sm-6'>
              <input placeholder="Password" name="password" type="password" className="form-control sign-up-form-feild" />
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-sm-6'>
              <textarea name="info" placeholder="what are you working on, what drives you?" className="form-control sign-up-form-feild" />
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

export default UserSignUp;