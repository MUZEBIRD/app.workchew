import React, { Component } from 'react';
import userService from '../Services/userService.js'

import { Route, Link } from 'react-router-dom'

import urlService from '../Services/urlService.js'

class SearchBusinesses extends Component {

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
            <div className='col-sm-4'>
              <h2>Main</h2>
            </div>
          </div>
          <br/>
          <br/>
          <div>
            <input/>
            <br/>
            <br/>
            <button className="btn btn-info">
              <Link to="/search-businesses">
                Search / Edit / Delete
              </Link>
            </button>
            <br/>
            <br/>
          </div>
        </div>
      </div>

      );
  }

}

export default Main;