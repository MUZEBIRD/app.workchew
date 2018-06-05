import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import userService from '../../Services/userService.js'
import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'

import { M3mberShipSelectionWidget, pricingOptions3 } from './M3mberShipSelectionWidget';
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

class M3mberships extends Component {

  constructor(props) {

    super(props);

    var queryParams = getQueryParams()

    this.state = {
      showDialog: false,
      queryParams,
      showMemberShipSelections: true
    }

  }

  componentDidMount() {

    window.paypalCheckoutReady = () => {

      if (this.state.showMemberShipSelections) {
        pricingOptions3.forEach((pricing) => {

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
        <div className="wholeView w-100 d-flex flex-column align-items-center">
          <Dialog title={ this.state.dialogMsg } actions={ actions } modal={ false } open={ this.state.showDialog } onRequestClose={ this.handleClose }>
          </Dialog>
          { this.state.showLoader && <WorkLoader/> }
          <div className="showView w-100 scroll-y">
            <br/>
            <div className='row flex-row-center-vert' style={ { backgroundColor: 'white', position: 'relative', zIndex: '5' } }>
              <div className='col-sm-4'>
              </div>
              <div className='col-sm-4'>
                <img className="logo" src={ "/static/images/logo.png" } />
                <br/>
                <br/>
                <h2>Memberships</h2>
              </div>
              <div className='col-sm-4'>
              </div>
            </div>
            <br/>
            <M3mberShipSelectionWidget/>
            <br/>
          </div>
        </div>
      </MuiThemeProvider>
      );
  }

}

export default M3mberships;