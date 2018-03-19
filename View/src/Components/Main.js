import React, { Component } from 'react';
import userService from '../Services/userService.js'

import { Route, Link } from 'react-router-dom'

import urlService from '../Services/urlService.js'

import MainMapForm from './Main/MainMapForm.js'


class Main extends Component {

  constructor(props) {

    super(props);

    this.state = {};

    userService.checkLoginStatus()

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
                                
                                } } className='btn btn-danger'>
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
            <button className="btn btn-info">
              <Link to="/businesses">
                Businesses
              </Link>
            </button>
            <br/>
            <br/>
            <button className="btn btn-info">
              <Link to="/users">
                Users
              </Link>
            </button>
            <br/>
            <br/>
          </div>
          <div>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" id="map-tab" data-toggle="tab" href="#map" role="tab" aria-controls="map" aria-selected="true">Map View</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">List View</a>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade show active" id="map" role="tabpanel" aria-labelledby="map-tab">
                <MainMapForm />
              </div>
              <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                ...
              </div>
            </div>
          </div>
        </div>
      </div>

      );
  }

}

export default Main;