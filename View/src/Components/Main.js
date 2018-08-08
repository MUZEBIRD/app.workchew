import React, { Component } from 'react';
import userService from '../Services/userService.js'

import { Route, Link } from 'react-router-dom'

import urlService from '../Services/urlService.js'

import MainMapForm from './Main/MainMapForm.js'

import { FlexTable } from './shared/';

import BusinessService from '../Services/businessService.js';

import { v4 } from 'uuid'

import { Topbar } from './TopBar.js'


const BusinessList = (props) => props.businesses.map(business => {

  return (

    <div className="container" key={ v4() }>
      <br/>
      <div className="w-100 d-flex justify-content-between">
        <div className="text-left">
          <span style={ { fontSize: 22, fontWeight: 'bold' } } className="Brandon_bld"><b>{ business.name }</b></span>
          <br/>
          <span className="Brandon_bld">{ business.address }</span>
        </div>
        <div>
          <button onClick={ (event) => props.selectItem(business) } className="btn btn-primary Brandon_bld" type="button" aria-expanded="false">
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

    urlService.goTo(`${urlService.businessPage}?id=${business._id}`)

  }

  componentDidMount() {

    userService.get({
      params: {
        _id: 1
      }
    })

      .subscribe(currentUser => {

        if (currentUser && currentUser._id) {

          var auth = currentUser.auth

          if (window.location.port != 3000) {

            window.location.href = "https://www.workchew.com/locations.html?token=" + (auth.token || auth.accessToken)

          }

        } else {

          window.location.hash = "login"

        }
        // if (auth && auth.role == "admin") {
        //   this.setState({
        //     userIsAdmin: true
        //   })
        // }

      })

    this.getBusinessStream({})

      .subscribe((businessStream) => {

        this.setState({
          businesses: businessStream
        })

      })

  }

  render() {

    var props = {

      title: "Locations",

    }

    return (

      <div className="wholeView flex-col">
        <div className="showView d-flex flex-column">
          <Topbar { ...props } />
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
                <a className="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">List View</a>
              </li>
              <li className="nav-item">
                <a className="nav-link " id="map-tab" data-toggle="tab" href="#map" role="tab" aria-controls="map" aria-selected="true">Map View</a>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade" id="map" role="tabpanel" aria-labelledby="map-tab">
                <MainMapForm />
              </div>
              <div className="tab-pane fade  show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
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