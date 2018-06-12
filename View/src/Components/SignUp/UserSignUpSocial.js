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

import FacebookLogin from 'react-facebook-login';

import GoogleLogin from 'react-google-login';

export const signUpDialogSubject = new Subject();

class UserSignUpSocial extends Component {

  constructor(props) {

    super(props);

    var queryParams = getQueryParams()

    this.state = {
      showDialog: false,
      queryParams,
      showMemberShipSelections: false
    }

  }

  componentDidMount() {

    loaderStream.subscribe((showLoader) => {

      this.setState({
        showLoader
      })

    })

    signUpDialogSubject.subscribe(({dialogMsg, showDialog, signUpComplete}) => {

      this.setState({
        dialogMsg,
        showDialog,
        signUpComplete
      })

    })

  }

  defaultUserRespone = () => {

    var fields = [...document.getElementsByClassName('sign-up-form-feild')];

    var userSignUpInfo = fields.reduce((info, inputField) => {

      info[inputField.name] = inputField.value

      return info;

    }, {})

    console.log(userSignUpInfo);

    this.signUp(userSignUpInfo)

  }

  signUp(userSignUpInfo) {

    this.setState({
      showLoader: true
    })

    userService

      .signUpCoChewer(userSignUpInfo)

      .subscribe((signUpCoChewerResponse) => {

        var {userResponse} = signUpCoChewerResponse;

        if (userResponse._id) {

          userService.storeSignUpInfo(userResponse)

          var {memberShipInfo} = userResponse;

          var {paymentAuth} = memberShipInfo;

          var {token} = paymentAuth;

          this.setState({
            signUpData: userResponse,
            showLoader: false
          }, () => {

            // window.location.hash = "m3mberships"
            window.location.hash = `co-chewer-signUp-build?id=${userResponse._id}`

          })

        /*userResponse._id*/
        } else { /*!userResponse._id*/

          this.setState({
            showLoader: false,
            showDialog: true,
            dialogMsg: userResponse.msg
          })

        }

      })
  }

  handleClose = () => {

    this.setState({
      showDialog: false
    })

  }

  responseGoogle = (response) => {

    console.log(response);

    var {profileObj, accessToken} = response

    var {email, givenName, familyName, googleId, imageUrl, name} = profileObj

    var userSignUpInfo = {
      ...{
        firstName: givenName,
        lastName: familyName,
        accessToken,
        email,
        googleId
      },
      googleImgUrl: imageUrl
    }

    this.signUp(userSignUpInfo)

  }

  responseFacebook = (response) => {

    console.log(response);

    var {accessToken, email, first_name, last_name, userID, picture: {data: {url}}} = response

    var userSignUpInfo = {
      ...{
        firstName: first_name,
        lastName: last_name,
        accessToken,
        email
      },
      facebookUserId: userID,
      facebookImgUrl: url
    }

    this.signUp(userSignUpInfo)

  }

  responseLinkedin = (response) => {


    // Use the API call wrapper to request the member's basic profile data
    window.IN.API.Profile("me").fields("id,firstName,lastName,summary,specialties,headline,email-address,picture-urls::(original),public-profile-url,location:(name)")
      .result((me) => {
        var profile = me.values[0];
        var id = profile.id;
        var firstName = profile.firstName;
        var lastName = profile.lastName;
        var emailAddress = profile.emailAddress;
        var pictureUrl = profile.pictureUrls.values[0];
        var profileUrl = profile.publicProfileUrl;
        var country = profile.location.name;

        console.log("mememememe", me)

        var userSignUpInfo = {
          linkedInId: id,
          headline: profile.headline,
          summary: profile.summary,
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.emailAddress,
          linkedInPictureUrl: profile.pictureUrls.values[0],
          profileUrl: profile.publicProfileUrl,
          location: profile.location.name,

        }

        this.signUp(userSignUpInfo)


      });

  }

  render() {

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
                <h1 className='text-left'>Welcome, <br/> sign-up to get started.</h1>
              </div>
            </div>
            <div className='d-flex' style={ { backgroundColor: 'white', position: 'relative', zIndex: '5' } }>
              <div className='flex-1'>
                <br/>
                <br/>
                <FacebookLogin autoLoad={ false } appId="1755466141213974" fields="email,picture,first_name,last_name" callback={ this.responseFacebook } />
                <br/>
                <br/>
                <GoogleLogin clientId="198825134082-5l64c1opmt10ts62nm7ka7dssev9iok9.apps.googleusercontent.com" buttonText="Login with Google" onSuccess={ this.responseGoogle } onFailure={ this.responseGoogle }
                />
                <br/>
                <br/>
                <button onClick={ (event) => {
                                  
                                    window['IN'].User.authorize((responseLinkedin) => {
                                  
                                      this.responseLinkedin(responseLinkedin)
                                  
                                    });
                                  
                                  } } className={ "linkedin-button" }>
                </button>
              </div>
              <p>
                or
              </p>
              <div className='flex-1'>
                <br/>
                <br/>
                <div className='row'>
                  <div className='col-sm-3'></div>
                  <div className='col-sm-6'>
                    <input placeholder="Email" name="email" className="form-control sign-up-form-feild" />
                  </div>
                </div>
                <br/>
                <div className='row'>
                  <div className='col-sm-3'></div>
                  <div className='col-sm-6'>
                    <input placeholder="Password" name="password" type="password" className="form-control sign-up-form-feild" />
                  </div>
                </div>
                <br/>
                <div className='d-flex justify-content-center'>
                  <button onClick={ (event) => {
                                    
                                      this.defaultUserRespone()
                                    
                                    } } className="btn btn-success">
                    Sign up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
      );
  }

}

export default UserSignUpSocial;