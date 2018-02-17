import React, { Component } from 'react';
import userService from '../Services/userService.js'

import { Route, Link } from 'react-router-dom'

import urlService from '../Services/urlService.js'

class AddUser extends Component {

  constructor(props) {

    super(props);

    this.state = {};

    userService.checkLoginStatus()

    var params = this.getQueryParams() || {};

    if (params.id) {

      this.setUser(params.id)

    }

  }

  setUser(id) {

    userService.get({
      params: {
        _id: id
      }
    })

      .subscribe((getUserStream) => {

        console.log('getUserStream  in set user', getUserStream)

        var user = getUserStream[0]
        this.setState({
          user
        }, (state) => {

          this.setObjectToInputsWithName(user)

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

    var user = {}
    var infoFields = fields.map(({name, value}) => {

      user[name] = value
      return {
        name,
        value
      }

    })

    console.log(this.state)

    if (this.state.user && this.state.user._id) {

      this.updateUser({

        ...this.state.user,
        ...user,
      })

    } else {

      this.createUser(user)

    }

  } //save

  clearUserFields() {
    var inputs = document.getElementsByTagName('input')

    var fields = [...inputs]

    fields.forEach((inputField) => {

      inputField.value = ""

    })

  }

  createUser(user) {

    var {name, phone, email, address, password} = user

    userService.post({
      name,
      phone,
      email,
      address,
      password
    })

      .subscribe((postUserStream) => {

        console.log('postUserStream ', postUserStream)

        if (postUserStream.userResponse) {

          alert('user saved !')

          this.clearUserFields()

        }

      })
  }

  updateUser(user) {

    var {name, phone, email, address, password, _id} = user

    userService.put({
      _id,
      name,
      phone,
      email,
      address,
      password
    })

      .subscribe((putUserStream) => {

        alert('user saved !')


        console.log('putUserStream ', putUserStream)

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
              <h2>Add Users</h2>
            </div>
          </div>
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
              <span>password</span>
            </div>
            <div className='col-sm-2'>
              <input name="password" />
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

export default AddUser ;