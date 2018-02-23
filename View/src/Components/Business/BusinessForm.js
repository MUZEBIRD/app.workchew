import React, { Component } from 'react';
import BusinessService from '../../Services/businessService.js';

import { Route, Link } from 'react-router-dom'

import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'

import BusinessSeatWidget from './BusinessSeatWidget.js'
import _ from 'lodash'

import { Subject } from 'rxjs'

var updateSubject = new Subject()
class BusinessForm extends Component {

  constructor(props) {

    super(props);

    this.state = {
      business: {

        seats: []
      }
    };

  }

  componentDidMount() {

    var params = this.getQueryParams() || {};

    if (params.id) {

      this.setBusiness(params.id)

    }

    console.log('this.props', this.props)

    this.props.addBusinessSubject

      .subscribe((addBusinessStream) => {

        console.log('addBusinessStream', addBusinessStream)
        console.log('staet business', this.state.business)

        var business = _.merge(this.state.business, addBusinessStream.business)

        business.seats = BusinessService.getSeats(business.seats)
        console.log('addBusinessStream business', business)

        this.setStateBusiness(business)

      })

    BusinessService.subject

      .filter((businessStream) => businessStream.seatUpdate)

      .filter((businessStream) => businessStream.seats)

      .subscribe((businessStream) => {

        this.state.business.seats = businessStream.seats

        this.setState({
          business: this.state.business
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
        if (typeof business.seats === 'string') {

          business.seats = [];

        }
        this.setStateBusiness(business)

      })

  }

  setStateBusiness(business) {

    this.setState({
      business
    }, () => {

      var {business} = this.state

      this.setObjectToInputsWithName(business)

      BusinessService.subject.next({
        updateSeats: true,
        seats: business.seats || []
      })

    })

  }

  setObjectToInputsWithName(item) {
    var inputs = document.getElementsByTagName('input')

    var fields = [...inputs]

    fields

      .filter((input) => input.id.indexOf('seat') == -1)

      .forEach((inputField) => {

        inputField.value = item[inputField.name]
      })
  }

  save() {
    console.log('AT SAVE')
    console.log('this.state.business   ', this.state.business)
    var inputs = document.getElementsByTagName('input')

    var fields = [...inputs]

    var businessFromFeilds = {}
    var infoFields = fields

      .filter((input) => input.id.indexOf('seat') == -1)

      .map(({name, value}) => {

        businessFromFeilds[name] = value
        return {
          name,
          value
        }

      })

    console.log('businessFromFeilds', businessFromFeilds)

    var spreadResult = {

      ...this.state.business,
      ...businessFromFeilds
    }

    spreadResult.seats = BusinessService.getSeats(this.state.business.seats)

    console.log(' spread result  after getseats  ', spreadResult)

    if (this.state.business && this.state.business._id) {

      this.updateBusiness(spreadResult)

    } else {

      this.createBusiness(spreadResult)

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

    BusinessService

      .post(business)

      .subscribe((postBusinessStream) => {

        console.log('postBusinessStream ', postBusinessStream)

        if (postBusinessStream.postBusinessResponse) {

          alert('business saved !')

          this.clearBusinessFields()

        }

      })
  }

  updateBusiness(business) {

    BusinessService

      .put(business)

      .subscribe((putBusinessStream) => {

        console.log('putBusinessStream ', putBusinessStream)

        alert('business saved !')


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
            <button onClick={ (event) => {
                              
                                this.save()
                              
                              } } className='btn btn-success'>
              Save
            </button>
          </div>
          <br/>
        </div>
        <div className="row">
          <div className='col-sm-2'>
            <span>name</span>
          </div>
          <div className='col-sm-10'>
            <input className="form-control" name="name" />
          </div>
          <br/>
        </div>
        <br/>
        <div className="row">
          <div className='col-sm-2'>
            <span>phone</span>
          </div>
          <div className='col-sm-10'>
            <input className="form-control" name="phone" />
          </div>
          <br/>
        </div>
        <br/>
        <div className="row">
          <div className='col-sm-2'>
            <span>email</span>
          </div>
          <div className='col-sm-10'>
            <input className="form-control" name="email" />
          </div>
          <br/>
        </div>
        <br/>
        <div className="row">
          <div className='col-sm-2'>
            <span>address</span>
          </div>
          <div className='col-sm-10'>
            <input className="form-control" name="address" />
          </div>
          <br/>
        </div>
        <br/>
        <div className="row">
          <div className='col-sm-2'>
            <span>wifi password</span>
          </div>
          <div className='col-sm-10'>
            <input className="form-control" name="wifi" />
          </div>
          <br/>
        </div>
        <br/>
        <div className="row">
          <div className='col-sm-12'>
            <BusinessSeatWidget />
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