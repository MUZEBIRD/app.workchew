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


    var params = this.getQueryParams() || {};

    if (params.id) {

      this.setBusinsee(params.id)

    }


  }

  setBusinsee(id) {

    BusinessService.get({
      params: {
        _id: id
      }
    })

      .subscribe((getBusinessStream) => {

        console.log('getBusinessStream  in set business', getBusinessStream)

        var business = getBusinessStream[0]
        this.setState({
          business
        }, (state) => {

          this.setObjectToInputsWithName(business)

        })

      })

  }

  setObjectToInputsWithName(item) {
    var inputs = document.getElementsByTagName('input')

    var fields = [...inputs]

    fields.forEach((inputField) => {

      inputField.value = item[inputField.name]
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

    console.log(this.state)

    if (this.state.business && this.state.business._id) {

      this.updateBusiness({

        ...this.state.business,
        ...business,
      })


    } else {

      this.createBusiness(business)

    }

  } //save

  clearBusinessFields() {
    var inputs = document.getElementsByTagName('input')

    var fields = [...inputs]

    fields.forEach((inputField) => {

      inputField.value = ""


    })

  }

  createBusiness(business) {

    var {name, phone, email, seats, address, wifi} = business

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

          this.clearBusinessFields()

        }

      })
  }

  updateBusiness(business) {

    var {name, phone, email, seats, address, wifi, _id} = business

    BusinessService.put({
      _id,
      name,
      phone,
      email,
      seats,
      address,
      wifi
    })

      .subscribe((putBusinessStream) => {

        console.log('putBusinessStream ', putBusinessStream)

      })
  }

  getQueryParams() {

    var url = window.location.href;
    console.log('url', url)

    var queryString = url.substring(url.indexOf('?') + 1)

    if (url.indexOf('?') > -1) {

      var splits = queryString.split('&')

      var queryParams = splits

        .map(split => split.split('='))

        .map(([name, value]) => {

          return {

            [name]: value
          }

        })

        .reduce((params, splitItem) => {

          return {
            ...params,
            ...splitItem
          }

        }, {})


      console.log('queryParams', queryParams)

      return queryParams

    }

  }

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
              <h2>Add/Edit Businesses</h2>
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