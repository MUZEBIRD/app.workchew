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

import { Topbar } from '../TopBar.js'

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
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

      info[inputField.childNodes[0].name] = inputField.childNodes[0].value

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
        <div className="wholeView w-100 d-flex flex-column" style={ { backgroundColor: 'orange', color: 'white' } }>
          <Dialog title={ this.state.dialogMsg } actions={ actions } modal={ false } open={ this.state.showDialog } onRequestClose={ this.handleClose }>
          </Dialog>
          { this.state.showLoader && <WorkLoader/> }
          <div className="showView w-100 scroll-y container">
            <Topbar title={ 'Create Profile' } />
            <br/>
            <div className='row' style={ { position: 'relative' } }>
              <div className='col-sm-12'>
                <button onClick={ (event) => {
                                    this.viewProfile()
                                  } } className="btn btn-info">
                  View your profile
                </button>
              </div>
            </div>
            <br/>
            { user
              && user.email
              && <div className="p-3" style={ { backgroundColor: 'white', position: 'relative' } }>
                   <div className='d-flex align-items-center'>
                     <div className='flex-1'>
                       <div className='row'>
                         <div className='col-sm-12'>
                           <TextField floatingLabelText="First Name" defaultValue={ user.firstName } placeholder="First Name" name="firstName" className="w-100 sign-up-build-form-feild"
                           />
                         </div>
                       </div>
                     </div>
                     <input onChange={ (event) => {
                                       
                                         console.log("duwop", event.target.files)
                                       
                                       } } style={ { "visibility": "hidden", heigh: 0, width: 0, opacity: 1 } } type="file" name="imageUpload" id="imageUpload" />
                     <div className="h-100 m-3 d-flex flex-column align-items-center">
                       <p className="Brandon_bld" style={ { color: 'black' } }>
                         PHOTO
                       </p>
                       <label htmlFor="imageUpload">
                         <img style={ { width: 150 } } src={ user.facebookImgUrl || user.linkedInPictureUrl || user.profileImgLink || "/static/images/chew-pofile-img.png" } />
                       </label>
                     </div>
                     <div className='flex-1'>
                       <div className='row'>
                         <div className='col-sm-12'>
                           <TextField floatingLabelText="Last Name" defaultValue={ user.lastName } placeholder="Last Name" name="lastName" className="w-100 sign-up-build-form-feild" />
                         </div>
                       </div>
                     </div>
                   </div>
                   <br/>
                   <div className='row'>
                     <div className='col-sm-6'>
                       <TextField floatingLabelText="Location" defaultValue={ user.location } placeholder="location" name="location" className="w-100 sign-up-build-form-feild" />
                     </div>
                     <div className='col-sm-6'>
                       <TextField floatingLabelText="Zip" defaultValue={ user.Zip } placeholder="Zip" name="zip" className="w-100 sign-up-build-form-feild" />
                     </div>
                   </div>
                   <br/>
                   <div className='row'>
                     <div className='col-sm-12'>
                       <TextField floatingLabelText="Email" defaultValue={ user.email } placeholder="Email" name="email" className="w-100 sign-up-build-form-feild" />
                     </div>
                   </div>
                   <br/>
                   <div className='row'>
                     <div className='col-sm-6'>
                       <SelectField className="w-100" floatingLabelText="OCCUPATION" value={ this.state.occupationValue } onChange={ () => {
                                                                                                                                     } }>
                         <MenuItem value={ 1 } primaryText="Never" />
                         <MenuItem value={ 2 } primaryText="Every Night" />
                         <MenuItem value={ 3 } primaryText="Weeknights" />
                         <MenuItem value={ 4 } primaryText="Weekends" />
                         <MenuItem value={ 5 } primaryText="Weekly" />
                       </SelectField>
                     </div>
                     <div className='col-sm-6'>
                       <SelectField className="w-100" floatingLabelText="INDUSTRY" value={ this.state.industryValue } onChange={ () => {
                                                                                                                                 } }>
                         <MenuItem value={ 1 } primaryText="Never" />
                         <MenuItem value={ 2 } primaryText="Every Night" />
                         <MenuItem value={ 3 } primaryText="Weeknights" />
                         <MenuItem value={ 4 } primaryText="Weekends" />
                         <MenuItem value={ 5 } primaryText="Weekly" />
                       </SelectField>
                     </div>
                   </div>
                   <br/>
                   <div className='row'>
                     <div className='col-sm-12'>
                       <SelectField className="w-100 text-center d-flex align-items-start" floatingLabelText="WHAT ARE YOU HOPING TO GET OUT OF THIS?" value={ 0 } onChange={ () => {
                                                                                                                                                                              } }>
                         <MenuItem value={ 0 } primaryText="Never" />
                         <MenuItem value={ 2 } primaryText="Every Night" />
                         <MenuItem value={ 3 } primaryText="Weeknights" />
                         <MenuItem value={ 4 } primaryText="Weekends" />
                         <MenuItem value={ 5 } primaryText="Weekly" />
                       </SelectField>
                     </div>
                   </div>
                   <br/>
                   <div className='row'>
                     <div className='col-sm-12'>
                       <TextField floatingLabelText="Summary" defaultValue={ user.summary } placeholder="Introduce yourself so we know a little about you…" name="summary" className="w-100 sign-up-build-form-feild"
                       />
                     </div>
                   </div>
                 </div> }
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