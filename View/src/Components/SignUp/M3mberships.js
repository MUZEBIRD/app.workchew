import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import userService from '../../Services/userService.js'
import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'

import { MemberShipSelectionWidget, pricingOptions, pricingOptions3 } from './MemberShipSelectionWidget';
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
            <br/>
            <div className='row'>
              <div className='col-sm-12'>
                <div className='row w-100 d-flex flex-wrap justify-content-center'>
                  { pricingOptions3.map(
                      (pricing, i) => (
                        <div key={ i } style={ { width: 300 } } className='d-flex flex-column'>
                          <p>
                            { pricing.title }
                          </p>
                          <p>
                            $
                            { pricing.price }
                          </p>
                          <p>
                            { pricing.paymentRecurrence }
                          </p>
                        </div>)
                    ) }
                </div>
                <div class="d-flex flex-column align-items-center w-100 " style={ { border: '1px solid black' } }>
                  <h3 class="small uppercase ae-4 done">A M E N I T I E S</h3>
                  <br/>
                  <div id="priceLet-container" class="d-flex w-100 ae-3 done">
                    <div class="flex-1 flex-column align-items-center">
                      <img width="80" height="50" src={ "/static/images/Wifi.png" } />
                      <br/>
                      <strong>Fast <br/> WiFi</strong>
                      <br/>
                      <br/>
                    </div>
                    <div class="flex-1 d-flex justify-content-between">
                      <div class="flex-1 flex-column align-items-center">
                        <img width="80" height="50" src={ "/static/images/Weekly_Social_Events.png" } />
                        <br/>
                        <strong>Weekly Networking + <br/> Social Events</strong>
                        <br/>
                        <br/>
                      </div>
                      <div class="flex-1 flex-column align-items-center">
                        <img width="80" height="50" src={ "/static/images/Portbale_Charger.png" } />
                        <br/>
                        <strong>Portable <br/> Chargers</strong>
                        <br/>
                        <br/>
                      </div>
                    </div>
                    <div class="flex-1 flex-column align-items-center">
                      <img width="80" height="50" src={ "/static/images/Food_Drink_Discounts.png" } />
                      <br/>
                      <strong>Food & Drink <br/> Discounts</strong>
                      <br/>
                      <br/>
                    </div>
                  </div>
                </div>
                <br/>
                <div className='row w-100 d-flex flex-wrap justify-content-center'>
                  { pricingOptions3.map(
                      (pricing, i) => (
                        <div key={ i } style={ { width: 300 } } className='d-flex flex-column'>
                          { pricing.features.map(
                              (feature, j) => (<p key={ j }>
                                                 <img class="chewCheck" style={ { height: 20 } } src={ "static/images/chewCheck.png" } />
                                                 { feature.text }
                                               </p>)
                            ) }
                        </div>)
                    ) }
                </div>
                <div className='row w-100 d-flex flex-wrap justify-content-center'>
                  { pricingOptions3.map(
                      (pricing, i) => (
                        <div key={ i } style={ { width: 300 } } className='d-flex flex-column'>
                          <div id={ `${pricing.id}-button` }>
                          </div>
                        </div>)
                    ) }
                </div>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
      );
  }

}

export default M3mberships;