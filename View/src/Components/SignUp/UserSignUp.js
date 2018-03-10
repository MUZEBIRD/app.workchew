import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import userService from '../../Services/userService.js'
import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'

class UserSignUp extends Component {

  constructor(props) {

    super(props);

  }

  render() {

    return (

      <div className="wholeView flex-col">
        <div className="showView">
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
              <input placeholder="User Name" className="form-control" />
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-sm-6'>
              <input placeholder="Email" className="form-control" />
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-sm-6'>
              <input placeholder="Password" type="password" className="form-control" />
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-sm-6'>
              <textarea placeholder="what are you working on, what drives you?" className="form-control" />
            </div>
          </div>
          <br/>
          <div className='row'>
            <div className='col-sm-1'>
              <button className="btn btn-success">
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