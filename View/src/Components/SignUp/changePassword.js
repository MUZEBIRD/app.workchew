import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import userService from '../../Services/userService.js'
import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'
import { getQueryParams, getPathVariables } from '../../Utils'
import { Topbar } from '../TopBar.js'

class ChangePassword extends Component {

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

  changePassword = () => {

    var fields = [...document.getElementsByClassName('partner-changePassword-form-feild')];

    var businessSignUpInfo = fields.reduce((info, inputField) => {

      info[inputField.name] = inputField.value;

      return info;

    }, {
      _id: this.state.currentUser._id
    })

    userService

      .put(businessSignUpInfo)
      .subscribe((businessSignUpResponse) => {
        console.log({
          businessSignUpResponse
        })

        alert("password changed!")

      }

    )
  }

  render() {

    return (

      <div className="wholeView">
        <div className="showView  container">
          <br/>
          <br/>
          <Topbar title={ 'Change Password' } />
          <br/>
          <div className='row'>
            <div className='col-sm-12 d-flex flex-column align-items-center'>
              <input name="oldPassword" placeholder="Old Password" className="form-control w-50 partner-changePassword-form-feild" />
              <br/>
              <input name="newPassword" placeholder="New Password" className="form-control w-50 partner-changePassword-form-feild" />
              <br/>
              <button onClick={ this.changePassword } className="btn btn-success">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>

      );
  }

}

export default ChangePassword;