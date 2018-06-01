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

    this.state = {

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

    window.paypalCheckoutReady = () => {

      if (this.state.showMemberShipSelections) {
        pricingOptions.forEach((pricing) => {

          placeButton({

            price: pricing.price,
            elementKey: `${pricing.id}-button`,
            membershipName: pricing.title
          })

        })
      }
      ;

    }

  }

  signUp() {

    var fields = [...document.getElementsByClassName('sign-up-form-feild')];

    var userSignUpInfo = fields.reduce((info, inputField) => {

      info[inputField.name] = inputField.value

      return info;

    }, {})

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

          //alert("thanks for signing up check your email for next steps")

          this.setState({
            signUpData: userResponse,
            showMemberShipSelections: true,
            showLoader: false
          }, () => {

            pricingOptions.forEach((pricing) => {

              placeButton({

                price: pricing.price,
                elementKey: `${pricing.id}-button`,
                membershipName: pricing.title
              })

            })
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
                <h1 className='text-left'>Build your profile.</h1>
                <p className='text-left'>
                  WorkChew is about building connections between real people.
                </p>
              </div>
            </div>
            <div className='d-flex align-items-center' style={ { backgroundColor: 'white', position: 'relative', zIndex: '5' } }>
              <div className='flex-1'>
                <div className='row'>
                  <div className='col-sm-12'>
                    <input placeholder="First Name" name="firstName" className="form-control sign-up-form-feild" />
                  </div>
                </div>
                <br/>
                <div className='row'>
                  <div className='col-sm-12'>
                    <input placeholder="Last Name" name="lastName" className="form-control sign-up-form-feild" />
                  </div>
                </div>
              </div>
              <div className="h-100 m-3 d-flex align-items-center">
                <img style={ { width: 150 } } src={ "/static/images/chew-pofile-img.png" } />
              </div>
              <div className='flex-1'>
                <div className='row'>
                  <div className='col-sm-12'>
                    <input placeholder="Location" name="location" className="form-control sign-up-form-feild" />
                  </div>
                </div>
                <br/>
                <div className='row'>
                  <div className='col-sm-12'>
                    <input placeholder="Email" name="email" className="form-control sign-up-form-feild" />
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-sm-12'>
                <textarea placeholder="Introduce yourself so we know a little about you…" name="info" className="form-control sign-up-form-feild" />
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
      );
  }

}

export default BuildYourProfile;