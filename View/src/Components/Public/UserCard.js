import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import userService from '../../Services/userService.js'
import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'

import { getQueryParams, getPathVariables } from '../../Utils'
import { placeButton } from '../../Utils/wc-pal-pal-client.js'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { Subject } from 'rxjs'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class UserCard extends Component {

  constructor(props) {

    super(props);

    var queryParams = getQueryParams()

    this.state = {

      queryParams,
    }

  }

  componentDidMount() {}

  render() {

    return (

      <MuiThemeProvider>
        <div className="wholeView w-100 d-flex flex-column oback align-items-center justify-content-center">
          <div style={ { backgroundColor: 'white' } } className="w-50 d-flex flex-column align-items-center justify-content-center">
            <br/>
            <img className="logo" src={ "/static/images/logo.png" } />
            <br/>
            <h2>MEMBERSHIP CARD</h2>
            <br/>
            <div className='d-flex align-items-center justify-content-center' style={ { backgroundColor: 'white', position: 'relative', zIndex: '5' } }>
              <div className="h-100 m-3 d-flex align-items-center">
                <img style={ { width: 150 } } src={ "/static/images/blank-user.png" } />
              </div>
            </div>
            <div className='row'>
              <div className='col-sm-12'>
                <p>
                  G.T.Turgut
                  <br/> Washington, DC
                </p>
                <p>
                  Entrepreneur
                </p>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
      );
  }

}

export default UserCard;