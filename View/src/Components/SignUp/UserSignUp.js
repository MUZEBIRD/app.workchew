import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import userService from '../../Services/userService.js'
import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'

import { MemberShipSelectionWidget, pricingOptions } from './MemberShipSelectionWidget';
import { getQueryParams, getPathVariables } from '../../Utils'
import { placeButton } from '../../Utils/wc-pal-pal-client.js'

import './signUp.css';
class UserSignUp extends Component {

  constructor(props) {

    super(props);

    var queryParams = getQueryParams()

    this.state = {
      queryParams,
      showMemberShipSelections: false
    }

  }

  componentDidMount() {

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
            showMemberShipSelections: true
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

          alert(userResponse.msg)

        }

      })
  }

  render() {

    return (

      <div className="wholeView w-100 d-flex flex-column align-items-center">
        <div className="showView w-100 scroll-y">
          <br/>
          <div className='row flex-row-center-vert' style={ { backgroundColor: 'white', position: 'relative', zIndex: '5' } }>
            <div className='col-sm-4'>
            </div>
            <div className='col-sm-4'>
              <img className="logo" src={ "/static/images/logo.png" } />
              <br/>
              <br/>
              <h2>User Sign Up</h2>
            </div>
            <div className='col-sm-4'>
            </div>
          </div>
          <br/>
          <br/>
          <div className='row'>
            <div className='col-sm-3'></div>
            <div className='col-sm-6'>
              <input placeholder="User Name" name="userName" className="form-control sign-up-form-feild" />
            </div>
          </div>
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
          <div className='row'>
            <div className='col-sm-3'></div>
            <div className='col-sm-6'>
              <textarea name="info" placeholder="what are you working on, what drives you?" className="form-control sign-up-form-feild" />
            </div>
          </div>
          <br/>
          <div className='d-flex justify-content-center'>
            <button onClick={ (event) => {
                              
                                this.signUp()
                              
                              } } className="btn btn-success">
              Sign up
            </button>
          </div>
          { this.state.showMemberShipSelections &&
            <div className='row'>
              <div className='col-sm-12'>
                <br/>
                <MemberShipSelectionWidget {...{ pricings: pricingOptions }}/>
              </div>
            </div> }
        </div>
      </div>

      );
  }

}

export default UserSignUp;