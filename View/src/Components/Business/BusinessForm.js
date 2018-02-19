import React, { Component } from 'react';
import BusinessService from '../../Services/businessService.js';

import { Route, Link } from 'react-router-dom'

import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'

class BusinessForm extends Component {

  constructor(props) {

    super(props);

    this.state = {};

    var params = this.getQueryParams() || {};

    if (params.id) {

      this.setBusiness(params.id)

    }

  }

  componentDidMount() {

    console.log('this.props', this.props)
    this.props.addBusinessSubject

      .subscribe((addBusinessStream) => {

        console.log('addBusinessStream', addBusinessStream)


        this.setStateBusiness({

          name: addBusinessStream.place.name,
          address: addBusinessStream.place.formatted_address,
          phone: addBusinessStream.place.formatted_phone_number,


        })

      })
  }

  setBusiness(id) {

    BusinessService.get({
      params: {
        _id: id
      }
    })

      .subscribe((getBusinessStream) => {

        console.log('getBusinessStream  in set business', getBusinessStream)

        var business = getBusinessStream[0]
        this.setStateBusiness(business)

      })

  }

  setStateBusiness(business) {

    this.setState({
      business
    }, () => {

      var {business} = this.state

      this.setObjectToInputsWithName(business)

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
      address,
      wifi
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

      <div className='col-sm-6'>
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

      );
  }

}

export default BusinessForm;