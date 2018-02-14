import React, { Component } from 'react';
import userService from '../Services/userService.js'

import { Route, Link } from 'react-router-dom'

import urlService from '../Services/urlService.js'

class AddBusiness extends Component {

  constructor(props) {

    super(props);

    this.state = {};

    userService

      .get({
        _id: 1
      })

      .filter((getCurrentUserResponse) => {

        return !getCurrentUserResponse._id

      })

      .subscribe((noUserSubscribe) => {

        urlService.goTo(urlService.loginPage)

      })

  }

  logOut() {

    localStorage.clear();

    window.location.reload(true);

  }

  render() {

    return (

      <div className="wholeView flex-col">
        <div className="showView">
          <div className='row flex-row-center-vert' style={ { backgroundColor: 'white', position: 'relative', zIndex: '5', height: '10%' } }>
            <div className='col-sm-4'>
              <button onClick={ (event) => {
                                
                                  this.logOut()
                                
                                } } className='btn btn-success'>
                log out
              </button>
            </div>
            <div className='col-sm-2'>
              <h2>Add Businesses</h2>
            </div>
          </div>
          <br/>
          <br/>
          <div className="row">
            <div className='col-sm-2'>
              <span>name</span>
            </div>
            <div className='col-sm-2'>
              <input/>
            </div>
            <br/>
          </div>
          <br/>
          <div className="row">
            <div className='col-sm-2'>
              <span>phone</span>
            </div>
            <div className='col-sm-2'>
              <input/>
            </div>
            <br/>
          </div>
          <br/>
          <div className="row">
            <div className='col-sm-2'>
              <span>email</span>
            </div>
            <div className='col-sm-2'>
              <input/>
            </div>
            <br/>
          </div>
          <br/>
          <div className="row">
            <div className='col-sm-2'>
              <span>address</span>
            </div>
            <div className='col-sm-2'>
              <input/>
            </div>
            <br/>
          </div>
          <br/>
          <div className="row">
            <div className='col-sm-2'>
              <span>seats</span>
            </div>
            <div className='col-sm-2'>
              <input/>
            </div>
            <br/>
          </div>
          <br/>
          <div className="row">
            <div className='col-sm-2'>
              <span>wifi password</span>
            </div>
            <div className='col-sm-2'>
              <input/>
            </div>
            <br/>
          </div>
        </div>
      </div>

      );
  }

}

export default AddBusiness;