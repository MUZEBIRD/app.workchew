import React, { Component } from 'react';
import userService from '../Services/userService.js'
import BusinessService from '../Services/businessService.js';

import { Route, Link } from 'react-router-dom'

import urlService from '../Services/urlService.js'
import restService from '../Services/restService.js'

class AddBusiness extends Component {

  constructor(props) {

    super(props);

    this.state = {};

    userService

      .get({
        _id: 1
      })

      .filter((getCurrentUserResponse) => {

        return !getCurrentUserResponse._id

      })

      .subscribe((noUserSubscribe) => {

        urlService.goTo(urlService.loginPage)

      })

  }

  save() {

    var inputs = document.getElementsByTagName('input')

    var fields = [...inputs]

    var business = {}
    var infoFields = fields.map(({name, value}) => {

      business[name] = value
      return {
        name,
        value
      }

    })

    console.log(infoFields)
    var {name, phone, email, seats, address} = business

    BusinessService.post({
      name,
      phone,
      email,
      seats,
      address
    })

      .subscribe((postBusinessStream) => {

        console.log('postBusinessStream ', postBusinessStream)

        if (postBusinessStream.postBusinessResponse) {


          alert('business saved !')


          fields.forEach((inputField) => {

            inputField.value = ""


          })

        }

      })

  } //save

  logOut() {

    localStorage.clear();

    window.location.reload(true);

  }

  render() {

    return (

      <div className="wholeView flex-col">
        <div className="showView">
          <div className='row flex-row-center-vert' style={ { backgroundColor: 'white', position: 'relative', zIndex: '5', height: '10%' } }>
            <div className='col-sm-4'>
              <button onClick={ (event) => {
                                
                                  this.logOut()
                                
                                } } className='btn btn-success'>
                log out
              </button>
            </div>
            <div className='col-sm-2'>
              <h2>Add Businesses</h2>
            </div>
          </div>
          <br/>
          <br/>
          <div className="row">
            <div className='col-sm-2'>
              <span>name</span>
            </div>
            <div className='col-sm-2'>
              <input name="name" />
            </div>
            <br/>
          </div>
          <br/>
          <div className="row">
            <div className='col-sm-2'>
              <span>phone</span>
            </div>
            <div className='col-sm-2'>
              <input name="phone" />
            </div>
            <br/>
          </div>
          <br/>
          <div className="row">
            <div className='col-sm-2'>
              <span>email</span>
            </div>
            <div className='col-sm-2'>
              <input name="email" />
            </div>
            <br/>
          </div>
          <br/>
          <div className="row">
            <div className='col-sm-2'>
              <span>address</span>
            </div>
            <div className='col-sm-2'>
              <input name="address" />
            </div>
            <br/>
          </div>
          <br/>
          <div className="row">
            <div className='col-sm-2'>
              <span>seats</span>
            </div>
            <div className='col-sm-2'>
              <input name="seats" />
            </div>
            <br/>
          </div>
          <br/>
          <div className="row">
            <div className='col-sm-2'>
              <span>wifi password</span>
            </div>
            <div className='col-sm-2'>
              <input name="wifi" />
            </div>
            <br/>
          </div>
          <br/>
          <div className="row">
            <div className='col-sm-2'>
              <button onClick={ (event) => {
                                
                                  this.save()
                                
                                } } className='btn btn-success'>
                Save
              </button>
            </div>
            <br/>
          </div>
        </div>
      </div>

      );
  }

}

export default AddBusiness;