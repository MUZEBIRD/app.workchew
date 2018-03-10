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
        </div>
      </div>

      );
  }

}

export default UserSignUp;