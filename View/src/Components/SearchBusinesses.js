import React, { Component } from 'react';
import userService from '../Services/userService.js'

import { Route, Link } from 'react-router-dom'

import urlService from '../Services/urlService.js'
import { Topbar } from './TopBar.js'


import BusinessService from '../Services/businessService.js';

import { FlexTable } from './shared/';

class SearchBusinesses extends Component {

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
    {
      title: "Featured",
      key: "featured"
    },
  ]

  constructor(props) {

    super(props);

    this.state = {
      businesses: []
    };

    userService.checkLoginStatus()

    this.getBusinessStream({})

      .subscribe((getBusinessStream) => {

        this.setState({
          businesses: [...getBusinessStream]
        })

      })

  }

  selectBusiness(business) {

    console.log('on select Business', business)

    urlService.goTo(`${urlService.adminPartnerPage}?id=${business._id}`)

  }

  searchBusinesses() {

    var input = document.getElementById('businessSearch');

    var searchTerm = input.value;

    if (searchTerm && searchTerm.length > 0) {

      BusinessService.get({
        params: {
          searchTerm
        }
      })

        .subscribe((businessSearchStream) => {

          console.log('businessSearchStream', businessSearchStream)

          this.setState({
            businesses: businessSearchStream
          })

        })

    } else {

      this.getBusinessStream({})

        .subscribe((getBusinessStream) => {

          this.setState({
            businesses: [...getBusinessStream]
          })

        })

    }

  }

  getBusinessStream(params) {

    return BusinessService.get({
      params
    })

  }

  logOut() {

    localStorage.clear();

    window.location.reload(true);

  }

  getTableEntry(business, row) {

    if (row.key == 'featured') {


      return business.featured ? 'True' : 'False'
    }

    return business[row.key]
  }

  removeBusiness(business) {

    if (window.confirm(`Yikes! are you sure you want to delete ${business.name}`)) {

      BusinessService.delete(business)

        .subscribe((businessDeleteStream) => {

          console.log('businessDeleteStream', businessDeleteStream)

          this.searchBusinesses()

        })

    } else {


    }

  }

  render() {
    var props = {

      title: "Search Businesses",
      businesses: this.state.businesses
    }
    return (

      <div className="wholeView flex-col">
        <div className="showView">
          <Topbar { ...props } />
          <br/>
          <br/>
          <div>
            <input id="businessSearch" onKeyUp={ (event) => {
                                                 
                                                   this.searchBusinesses()
                                                 
                                                 } } placeholder="type business name" />
            <br/>
            <br/>
            <div className="business-search-results-container">
              { props.businesses &&
                <FlexTable items={ props.businesses } selectItem={ this.selectBusiness } removeItem={ (event, business) => this.removeBusiness(business) } getTableEntry={ this.getTableEntry } tableRows={ this.tableRows }
                /> }
            </div>
            <br/>
            <br/>
          </div>
        </div>
      </div>

      );
  }

}

export default SearchBusinesses;