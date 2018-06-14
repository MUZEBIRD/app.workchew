import React, { Component } from 'react';
import BusinessService from '../../Services/businessService.js';

import { Route, Link } from 'react-router-dom'

import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'

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

    BusinessService.subject

      .filter((businessStream) => businessStream.mapUpdate)

      .subscribe((addBusinessStream) => {

        console.log('addBusinessStream', addBusinessStream)
        console.log('staet business', this.state.business)

        var business = _.extend(this.state.business, addBusinessStream.business)

        var businessWithList = this.mapListDataToBusiness(business)

        console.log('addBusinessStream business', business)

        this.setStateBusiness(business)

      })



  }

  listenFor(keyName) {

    console.log(keyName, `${keyName}Update`)

    BusinessService.subject

      .filter((businessStream) => businessStream[`${keyName}Update`])

      .filter((businessStream) => businessStream[keyName])

      .subscribe((businessStream) => {
        console.log(keyName, "on updaet")

        this.state.business[keyName] = businessStream[keyName]
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
        if (business.geoPoint && business.geoPoint.coordinates) {

          BusinessService.setGeoCoordinates(business.geoPoint.coordinates[1], business.geoPoint.coordinates[0])

        }

        this.setStateBusiness(business)

      })

  }

  firstUpperCase(word) {

    var first = word[0];
    var upper = word[0].toUpperCase();

    return word.replace(first, upper)

  }

  setStateBusiness(business) {

    this.setState({
      business
    }, () => {

      var {business} = this.state

      this.setObjectToInputsWithName(business)

      //var msg = this.buildUpdateMsg(business)

     // BusinessService.subject.next(msg)

    })
  }

  setObjectToInputsWithName(item) {
    var inputs = document.getElementsByClassName('business-text-feild')

    var fields = [...inputs]

    fields

      .forEach((inputField) => {

        inputField.value = item[inputField.name] || ""
      })
  }

  save() {
    console.log('AT SAVE')
    console.log('this.state.business   ', this.state.business)
    var inputs = document.getElementsByClassName('business-text-feild')

    var fields = [...inputs]

    var businessFromFeilds = {}
    var infoFields = fields

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

    var businessWithList = this.mapListDataToBusiness(spreadResult)

    businessWithList.geoPoint = BusinessService.getGeoCoordinates().geoPoint

    console.log(' businessWithList  ', businessWithList)

    this.saveBusiness(businessWithList)

  } //save

  saveBusiness(business) {

    if (this.state.business && this.state.business._id) {

      this.updateBusiness(business)

    } else {

      this.createBusiness(business)

    }

  }

  mapListDataToBusiness(business) {

    this.list.forEach(list => {

      business[list.keyName] = BusinessService.getlistDataByKeyName(list.keyName, business[list.keyName] || [], list.props)


    })

    return business

  }

  clearBusinessFields() {
    var inputs = document.getElementsByClassName('business-text-feild')

    var fields = [...inputs]

    fields.forEach((inputField) => {

      inputField.value = ""

    })

  }

  setFeatured(featured) {

    this.state.business.featured = featured

    this.setState({
      business: this.state.business
    },
      () => {


        console.log(this.state.business)
      }
    )

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
                              
                              } } className='btn btn-primary'>
              Save
            </button>
          </div>
          <div className='col-sm-10 featured-flex'>
            <h2>Featured ?</h2>
            <div className="dropdown">
              <button className="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                { this.state.business.featured ? 'True' : 'False' }
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a onClick={ (event) => {
                             
                               this.setFeatured(true)
                             
                             } } className="dropdown-item">True</a>
                <a onClick={ (event) => {
                             
                               this.setFeatured(false)
                             
                             } } className="dropdown-item">False</a>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br/>
        <div className="row">
          <div className='col-sm-2'>
            <span>name</span>
          </div>
          <div className='col-sm-10'>
            <input className="form-control business-text-feild" name="name" />
          </div>
          <br/>
        </div>
        <br/>
        <div className="row">
          <div className='col-sm-2'>
            <span>phone</span>
          </div>
          <div className='col-sm-10'>
            <input className="form-control business-text-feild" name="phone" />
          </div>
          <br/>
        </div>
        <br/>
        <div className="row">
          <div className='col-sm-2'>
            <span>email</span>
          </div>
          <div className='col-sm-10'>
            <input className="form-control business-text-feild" name="email" />
          </div>
          <br/>
        </div>
        <br/>
        <div className="row">
          <div className='col-sm-2'>
            <span>address</span>
          </div>
          <div className='col-sm-10'>
            <input className="form-control business-text-feild" name="address" />
          </div>
          <br/>
        </div>
        <br/>
        <div className="row">
          <div className='col-sm-2'>
            <span>wifi password</span>
          </div>
          <div className='col-sm-10'>
            <input className="form-control business-text-feild" name="wifi" />
          </div>
        </div>
        <br/>
        <div className="row">
          <div className='col-sm-2'>
            <span>Description</span>
          </div>
          <div className='col-sm-10'>
            <textarea className="form-control business-text-feild" name="description" />
          </div>
        </div>
        <br/>
        <div className="row">
          <div className='col-sm-2'>
            <span>Hours</span>
          </div>
          <div className='col-sm-10'>
            <textarea className="form-control business-text-feild" rows="8" name="hours" />
          </div>
          <br/>
        </div>
        <br/>
        <div className="row">
          <div className='col-sm-2'>
            <span>Specials</span>
          </div>
          <div className='col-sm-10'>
            <textarea className="form-control business-text-feild" rows="8" name="specials" />
          </div>
          <br/>
        </div>
        <br/>
        <div className="row">
          <div className='col-sm-2'>
            <span>Discounts</span>
          </div>
          <div className='col-sm-10'>
            <textarea className="form-control business-text-feild" rows="8" name="discounts" />
          </div>
          <br/>
        </div>
        <br/>
        <div className="row">
          <div className='col-sm-2'>
            <span>Events</span>
          </div>
          <div className='col-sm-10'>
            <textarea className="form-control business-text-feild" rows="8" name="events" />
          </div>
          <br/>
        </div>
        <br/>
        <br/>
        <div className="row">
          <div className='col-sm-2'>
            <button onClick={ (event) => {
                              
                                this.save()
                              
                              } } className='btn btn-primary'>
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