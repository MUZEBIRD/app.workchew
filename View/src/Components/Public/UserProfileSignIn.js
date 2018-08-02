import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import { connect } from 'react-redux'


import userService from '../../Services/userService.js'
import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'

import { getQueryParams, getPathVariables } from '../../Utils'


import { Subject } from 'rxjs'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as userActions from './actions'

var {} = userActions

class UserProfileSignIn extends Component {

  constructor(props) {

    super(props);

    var queryParams = getQueryParams()

    this.state = {

      queryParams,
    }

  }

  componentDidMount() {

    if (this.state.queryParams && this.state.queryParams.token) {

      console.log("found token,", this.state.queryParams.token)

    }
  }

  render() {

    var user = this.props.user;

    var profileImgLink = user.googleImgUrl || user.facebookImgUrl || user.linkedInPictureUrl

    if (user.profileImgLink) {

      profileImgLink = `${urlService.pic}/${user.profileImgLink}`;

    }

    return (

      <MuiThemeProvider>
        <div className="wholeView w-100 d-flex flex-column align-items-center justify-content-center oback">
        </div>
      </MuiThemeProvider>
      );
  }

}


const mapStateToProps = (state, ownProps) => ({
  user: state.users.current
})

const UserProfileSignInComponent = connect(mapStateToProps, {

})(UserProfileSignIn)

export default UserProfileSignInComponent;