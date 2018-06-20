import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import userService from '../../Services/userService.js'
import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'

import { MemberShipSelectionWidget, pricingOptions } from './MemberShipSelectionWidget';
import { getQueryParams, getPathVariables } from '../../Utils'
import { placeButton } from '../../Utils/wc-pal-pal-client.js'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import WorkLoader, { loaderStream } from '../shared/workLoader';

import { Subject } from 'rxjs'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './signUp.css';


export const signUpDialogSubject = new Subject();

class BuildYourProfile extends Component {

  constructor(props) {

    super(props);

    var queryParams = getQueryParams()

    var {id} = queryParams;

    this.state = {

      queryParams,
      user: {}
    }

  }

  updateUser(toPayment) {

    var fields = [...document.getElementsByClassName('sign-up-build-form-feild')];

    var userProfileUpdate = fields.reduce((info, inputField) => {

      info[inputField.name] = inputField.value

      return info;

    }, {
      _id: this.state.queryParams.id
    })

    console.log(userProfileUpdate);

    userService

      .put(userProfileUpdate)

      .subscribe((updateUserResponse) => {

        console.log('updateUserResponse', updateUserResponse);

        var {userResponse} = updateUserResponse;

        userService.storeSignUpInfo(userResponse)

        if (toPayment) {
          window.location.hash = `M3mberships?id=${userResponse._id}`
        }

      })

  } //updateUser

  componentDidMount() {

    var signUpData = userService.getSignUpData()


    this.setState({
      user: signUpData
    })

    console.log('signUpData', signUpData)

    var {email, firstName, lastName, location} = signUpData;

    var fields = [...document.getElementsByClassName('sign-up-build-form-feild')];

    fields.forEach((inputField) => {

      if (signUpData[inputField.name]) {

        inputField.value = signUpData[inputField.name];

      }

    }, {})

    loaderStream.subscribe((showLoader) => {

      this.setState({
        showLoader
      })

    })

  } //componentDidMount

  handleClose = () => {

    this.setState({
      showDialog: false
    })

  }

  viewProfile = () => {

    userService.get({
      params: {
        _id: 1
      }
    })

      .subscribe((currentUser) => {

        var url = `${urlService.userProfile}?id=${currentUser._id}`;

        urlService.goTo(url)

      })

  }

  render() {

    var user = this.state.user

    const actions = [
      <FlatButton label="Done" primary={ true } keyboardFocused={ true } onClick={ (event) => {
                                                                             
                                                                               localStorage.clear();
                                                                             
                                                                               this.handleClose()
                                                                             
                                                                               if (this.state.signUpComplete) {
                                                                                 window.location.reload(true);
                                                                               }
                                                                             
                                                                             } } />
    ];

    return (

      <MuiThemeProvider>
        <div className="wholeView w-100 d-flex flex-column">
          <Dialog title={ this.state.dialogMsg } actions={ actions } modal={ false } open={ this.state.showDialog } onRequestClose={ this.handleClose }>
          </Dialog>
          { this.state.showLoader && <WorkLoader/> }
          <div className="showView w-100 scroll-y container">
            <br/>
            <div className='row' style={ { backgroundColor: 'white', position: 'relative', zIndex: '5' } }>
              <div className='col-sm-12'>
                <h1 className='text-left'>Build your profile.</h1>
                <p className='text-left'>
                  WorkChew is about building connections between real people.
                </p>
                <button onClick={ (event) => {
                                    this.viewProfile()
                                  
                                  } } className="btn btn-info">
                  View your profile
                </button>
              </div>
            </div>
            <div className='d-flex align-items-center' style={ { backgroundColor: 'white', position: 'relative', zIndex: '5' } }>
              <div className='flex-1'>
                <div className='row'>
                  <div className='col-sm-12'>
                    <input placeholder="First Name" name="firstName" className="form-control sign-up-build-form-feild" />
                  </div>
                </div>
                <br/>
                <div className='row'>
                  <div className='col-sm-12'>
                    <input placeholder="Last Name" name="lastName" className="form-control sign-up-build-form-feild" />
                  </div>
                </div>
              </div>
              <input onChange={ (event) => {
                                
                                  console.log("duwop", event.target.files)
                                
                                } } style={ { "visibility": "hidden", heigh: 0, width: 0, opacity: 1 } } type="file" name="imageUpload" id="imageUpload" />
              <div className="h-100 m-3 d-flex align-items-center">
                <label for="imageUpload">
                  <img style={ { width: 150 } } src={ user.facebookImgUrl || user.linkedInPictureUrl || user.profileImgLink || "/static/images/chew-pofile-img.png" } />
                </label>
              </div>
              <div className='flex-1'>
                <div className='row'>
                  <div className='col-sm-12'>
                    <input placeholder="Location" name="location" className="form-control sign-up-build-form-feild" />
                  </div>
                </div>
                <br/>
                <div className='row'>
                  <div className='col-sm-12'>
                    <input placeholder="Email" name="email" className="form-control sign-up-build-form-feild" />
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-sm-12'>
                <textarea placeholder="Introduce yourself so we know a little about you…" name="summary" className="form-control sign-up-build-form-feild" />
              </div>
            </div>
            <br/>
            <div className='row'>
              <div className='col-sm-12 d-flex justify-content-around'>
                <button onClick={ (event) => {
                                  
                                    this.updateUser(false);
                                  
                                  } } className="btn btn-info">
                  Save
                </button>
                <button onClick={ (event) => {
                                  
                                    this.updateUser(true);
                                  
                                  } } className="btn btn-info">
                  Next To Payment Page
                </button>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
      );
  }

}

export default BuildYourProfile;