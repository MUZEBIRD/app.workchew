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

import { industries, hopings, occupations } from './dropDownSelections'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './signUp.css';

import { Topbar } from '../TopBar.js'
import { v4 } from 'uuid'

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

  updateUser = (toPayment) => {

    var fields = [...document.getElementsByClassName('sign-up-build-form-feild')];

    var userProfileUpdate = fields.reduce((info, inputField) => {

      info[inputField.childNodes[1].name] = inputField.childNodes[1].value

      return info;

    }, {
      _id: this.state.queryParams.id
    })

    var finalUpdate = {
      ...userProfileUpdate,
      hopingsValue: this.state.hopingsValue,
      occupationValue: this.state.occupationValue,
      industryValue: this.state.industryValue,
      likeToMeet: this.state.likeToMeet
    }

    console.log(finalUpdate);

    userService

      .put(finalUpdate)

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
      user: signUpData,
      hopingsValue: signUpData.hopingsValue,
      occupationValue: signUpData.occupationValue,
      industryValue: signUpData.industryValue,
      likeToMeet: signUpData.likeToMeet
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

  setBannerPreview = (imageData) => {

    this.setState({
      previewProfilePic: imageData
    })

  }

  updateProfilePic = () => {
    if (this.state.user && this.state.user._id) {
      var blobBin = atob(this.state.previewProfilePic.split(',')[1]);
      var array = [];
      for (var i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
      }
      var file = new Blob([new Uint8Array(array)], {
        type: 'image/png'
      });
      var formdata = new FormData();
      formdata.append("image", file);
      formdata.append("userId", this.state.user._id);
      console.log('this.state.business._idthis.state.business._idthis.state.business._id ', this.state.user._id)

      userService.updateProfilePic(formdata)

        .subscribe((updateProfilePicStream) => {

          console.log('updateProfilePicStream ', updateProfilePicStream)
          userService.storeSignUpInfo(updateProfilePicStream)

          alert('profile pic updated !')
          window.location.reload(true);

          this.clearPreviewImage()

        })
    }
  }

  clearPreviewImage = (imageData) => {

    this.setState({
      previewProfilePic: null
    })

  }

  upDateProfilePreview = (files) => {

    console.log("on drop ", files)

    var self = this;

    var canvas,
      context,
      canvas = document.createElement("canvas");
    context = canvas.getContext('2d');

    var reader = new FileReader();

    reader.addEventListener("loadend", function(arg) {
      var src_image = new Image();
      src_image.onload = function() {
        canvas.height = src_image.height;
        canvas.width = src_image.width;
        context.drawImage(src_image, 0, 0);
        var imageData = canvas.toDataURL("image/png");

        self.setBannerPreview(imageData)

        // uploadCanvas(imageData);

      }
      src_image.src = this.result;
    });

    reader.readAsDataURL(files[files.length - 1]);

  }

  onSelectionChange = (event, key, selection) => {

    console.log('onkey selection', event.target, key, selection)

    this.setState({
      [key]: selection
    })

  }

  render() {

    var user = this.state.user

    var profileImgLink = user.googleImgUrl || user.facebookImgUrl || user.linkedInPictureUrl

    if (user.profileImgLink) {

      profileImgLink = `${urlService.pic}/${user.profileImgLink}`;

    }

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
          <div className="showView w-100 container">
            <div className="scroll-y h-100">
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
                                         
                                           this.upDateProfilePreview(event.target.files)
                                         
                                         } } style={ { "visibility": "hidden", heigh: 0, width: 0, opacity: 1 } } type="file" name="imageUpload" id="imageUpload" />
                       <div className="h-100 m-3 d-flex flex-column align-items-center">
                         <p className="Brandon_bld" style={ { color: 'black' } }>
                           PHOTO
                         </p>
                         <label htmlFor="imageUpload">
                           { !profileImgLink && !this.state.previewProfilePic && <img style={ { width: 150 } } src={ "/static/images/chew-pofile-img.png" } /> }
                           { this.state.previewProfilePic && <img style={ { width: 150 } } src={ this.state.previewProfilePic } /> }
                           { profileImgLink && !this.state.previewProfilePic && <img style={ { width: 150 } } src={ profileImgLink } /> }
                         </label>
                         <br/>
                         <div className="row">
                           <div className='col-sm-12'>
                             <button onClick={ (event) => {
                                               
                                                 this.clearPreviewImage()
                                               
                                               } } className='btn btn-warning'>
                               Clear
                             </button>
                             { '    ' }
                             <button onClick={ (event) => {
                                               
                                                 this.updateProfilePic()
                                               
                                               } } className='btn btn-warning'>
                               Update
                             </button>
                           </div>
                         </div>
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
                         <TextField floatingLabelText="City" defaultValue={ user.location } name="location" className="w-100 sign-up-build-form-feild" />
                       </div>
                       <div className='col-sm-6'>
                         <TextField floatingLabelText="Zip" defaultValue={ user.Zip } name="zip" className="w-100 sign-up-build-form-feild" />
                       </div>
                     </div>
                     <br/>
                     <div className='row'>
                       <div className='col-sm-12'>
                         <TextField floatingLabelText="Email" defaultValue={ user.email } name="email" className="w-100 sign-up-build-form-feild" />
                       </div>
                     </div>
                     <br/>
                     <div className='row'>
                       <div className='col-sm-6'>
                         <SelectField onChange={ (event, index, value) => {
                                                   this.onSelectionChange(event, 'occupationValue', value)
                                                 } } className="w-100 d-flex align-items-start o-hidden b-under" floatingLabelText="OCCUPATION" value={ this.state.occupationValue }>
                           { occupations.map((occupation, i) => {
                               return ( <MenuItem key={ v4() } value={ i } primaryText={ occupation.name } /> )
                             }) }
                         </SelectField>
                       </div>
                       <div className='col-sm-6'>
                         <SelectField onChange={ (event, index, value) => {
                                                   this.onSelectionChange(event, 'industryValue', value)
                                                 } } className="w-100 d-flex align-items-start o-hidden b-under" floatingLabelText="INDUSTRY" value={ this.state.industryValue }>
                           { industries.map((industry, i) => {
                               return ( <MenuItem key={ v4() } value={ i } primaryText={ industry.name } /> )
                             }) }
                         </SelectField>
                       </div>
                     </div>
                     <br/>
                     <div className='row'>
                       <div className='col-sm-12'>
                         <SelectField onChange={ (event, index, value) => {
                                                   this.onSelectionChange(event, 'hopingsValue', value)
                                                 } } className="w-100 text-center d-flex align-items-start o-hidden b-under" floatingLabelText="WHAT ARE YOU HOPING TO GET OUT OF THIS?"
                           value={ this.state.hopingsValue }>
                           { hopings.map((hoping, i) => {
                               return ( <MenuItem key={ v4() } value={ i } primaryText={ hoping.name } /> )
                             }) }
                         </SelectField>
                       </div>
                     </div>
                     <br/>
                     <div className='row'>
                       <div className='col-sm-12'>
                         <SelectField onChange={ (event, index, value) => {
                                                   this.onSelectionChange(event, 'likeToMeet', value)
                                                 } } className="w-100 text-center d-flex align-items-start o-hidden b-under" floatingLabelText="WHO WOULD YOU LIKE TO MEET"
                           value={ this.state.likeToMeet }>
                           { occupations.map((occupations, i) => {
                               return ( <MenuItem key={ v4() } value={ i } primaryText={ occupations.name } /> )
                             }) }
                         </SelectField>
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
              <br/>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
      );
  }

}

export default BuildYourProfile;