import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import userService from '../../Services/userService.js'
import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'

import { getQueryParams, getPathVariables } from '../../Utils'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './signUp.css';

import { Topbar } from '../TopBar.js'


export const signUpDialogSubject = new Subject();

class MembershipPaths extends Component {

  constructor(props) {

    super(props);

    var queryParams = getQueryParams()

    var {id} = queryParams;

    this.state = {

      queryParams,
      user: {}

    }

  }

  componentDidMount() {} //componentDidMount

  render() {

    return (
      <MuiThemeProvider>
        <div className="wholeView w-100 d-flex flex-column" style={ { backgroundColor: 'orange', color: 'white' } }>
        </div>
      </MuiThemeProvider>
      );
  }

}

export default MembershipPaths;