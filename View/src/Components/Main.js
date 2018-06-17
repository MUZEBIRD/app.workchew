import React, { Component } from 'react';
import userService from '../Services/userService.js'

import { Route, Link } from 'react-router-dom'

import urlService from '../Services/urlService.js'

import MainMapForm from './Main/MainMapForm.js'

import { FlexTable } from './shared/';

import BusinessService from '../Services/businessService.js';

import { v4 } from 'uuid'

const BusinessList = (props) => props.businesses.map(business => {

  return (

    <div className="container" key={ v4() }>
      <br/>
      <div className="w-100 d-flex justify-content-between">
        <div className="text-left">
          <span><b>{ business.name }</b></span>
          <br/>
          <span>{ business.address }</span>
        </div>
        <div>
          <button onClick={ (event) => props.selectItem(business) } className="btn btn-primary" type="button" aria-expanded="false">
            Partner Page
          </button>
        </div>
      </div>
    </div>

  )

})

class Main extends Component {

  tableRows =[
    {
      title: "Name",
      key: "name"
    },
    {
      title: "Address",
      key: "address"
    },
    {
      title: "WiFi",
      key: "wifi"
    },
  ]

  constructor(props) {

    super(props);

    this.state = {
      userIsAdmin: false
    };

    userService.checkLoginStatus()

  }

  logOut() {

    localStorage.clear();

    window.location.reload(true);

  }

  getBusinessStream(params) {

    return BusinessService.get({
      params
    })

  }

  selectBusiness(business) {

    console.log('on select Business', business)

    urlService.goTo(`${urlService.businessPage}?id=${business._id}`)

  }

  componentDidMount() {

    userService.get({
      params: {
        _id: 1
      }
    })

      .subscribe(currentUser => {
        var auth = currentUser.auth

        if (auth && auth.role == "admin") {

          this.setState({
            userIsAdmin: true

          })
        }
      })

    this.getBusinessStream({}).subscribe((businessStream) => {

      console.log('businessStream', businessStream)
      this.setState({

        businesses: businessStream

      })
    })

  }

  render() {

    return (

      <div className="wholeView flex-col">
        <div className="showView d-flex flex-column">
          <div className='row flex-row-center-vert' style={ { backgroundColor: 'white', position: 'relative', zIndex: '5', height: '10%' } }>
            <div className='col-sm-4'>
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="material-icons md-36">settings</i>
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a onClick={ (event) => {
                               
                                 userService.logOut()
                               
                               } } className="dropdown-item" href="#">Logout</a>
                </div>
              </div>
            </div>
            <div className='col-sm-4'>
              <h2>Main</h2>
            </div>
          </div>
          <br/>
          <br/>
          { this.state.userIsAdmin &&
            <div>
              <button className="btn btn-info">
                <Link to="/businesses">
                  Businesses
                </Link>
              </button>
              <br/>
              <br/>
              <button className="btn btn-info">
                <Link to="/users">
                  Users
                </Link>
              </button>
              <br/>
              <br/>
            </div> }
          <div className="flex-1 scroll-y">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" id="map-tab" data-toggle="tab" href="#map" role="tab" aria-controls="map" aria-selected="true">Map View</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">List View</a>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade show active" id="map" role="tabpanel" aria-labelledby="map-tab">
                <MainMapForm />
              </div>
              <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                { this.state.businesses && <BusinessList {...this.state} selectItem={ this.selectBusiness } /> }
              </div>
            </div>
          </div>
          <br/>
          <br/>
        </div>
      </div>

      );
  }

}
//<FlexTable items={ this.state.businesses } selectItem={ this.selectBusiness } getTableEntry={ this.getTableEntry } tableRows={ this.tableRows } />
export default Main;