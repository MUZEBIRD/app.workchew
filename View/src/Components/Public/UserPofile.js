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

class UserProfile extends Component {

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
        <div className="wholeView w-100 d-flex flex-column align-items-center justify-content-center oback">
          <div className="w-50" style={ { backgroundColor: 'white' } }>
            <br/>
            <div className='d-flex align-items-center justify-content-center' style={ { backgroundColor: 'white', position: 'relative', zIndex: '5' } }>
              <div className="h-100 w-100 m-3 d-flex align-items-center justify-content-around">
                <button className="btn btn-secondary">
                  pro
                </button>
                <img style={ { width: 150 } } src={ "/static/images/blank-user.png" } />
                <button className="btn btn-secondary">
                  add
                </button>
              </div>
            </div>
            <div className='row'>
              <div className='col-sm-12'>
                <p>
                  G.T. Turgut
                  <br/> Washington, DC
                </p>
                <p>
                  Assistant Professor in the Decision, Operations, and Information Technologies Department at the Robert H. Smith School of Business, University of Maryland, College
                  Park.
                </p>
              </div>
            </div>
            <button className="btn btn-secondary">
              Message
            </button>
            <br/>
            <br/>
          </div>
        </div>
      </MuiThemeProvider>
      );
  }

}

export default UserProfile;