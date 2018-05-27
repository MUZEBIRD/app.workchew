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

class UserInterest extends Component {

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
        <div className="wholeView w-100 d-flex flex-column">
          <div className="showView w-100 scroll-y container">
            <br/>
            <h1 className='text-left'>How do you identify yourself?</h1>
            <h1 className='text-left'>Choose the one that fits the best.</h1>
            <div className='row'>
              <button className="btn btn-info">
                Remote Worker
              </button>
              <button className="btn btn-info">
                Entrepreneur
              </button>
              <button className="btn btn-info">
                Traveling Professional
              </button>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
      );
  }

}

export default UserInterest;