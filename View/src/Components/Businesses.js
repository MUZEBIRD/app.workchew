import React, { Component } from 'react';
import userService from '../Services/userService.js'

import { Route, Link } from 'react-router-dom'

import urlService from '../Services/urlService.js'
import { Topbar } from './TopBar.js'

class Businesses extends Component {

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
    var props = {

      title: "Businesses",
    }
    return (

      <div className="wholeView flex-col">
        <div className="showView">
          <Topbar { ...props } />
          <br/>
          <br/>
          <div>
            <button className="btn btn-info">
              <Link to="/add-business">
                Add
              </Link>
            </button>
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

export default Businesses;