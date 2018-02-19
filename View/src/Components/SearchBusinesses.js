import React, { Component } from 'react';
import userService from '../Services/userService.js'

import { Route, Link } from 'react-router-dom'

import urlService from '../Services/urlService.js'
import { Topbar } from './TopBar.js'


import BusinessService from '../Services/businessService.js';


class SearchBusinesses extends Component {

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

  selectBusines(business) {

    console.log('on select Business', business)

    urlService.goTo(`${urlService.viewBusinessPage}?id=${business._id}`)

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

  render() {
    var props = {

      title: "Search Businesses",
    }
    return (

      <div className="wholeView flex-col">
        <div className="showView">
          <Topbar props={ { ...props } } />
          <br/>
          <br/>
          <div>
            <input id="businessSearch" onKeyUp={ (event) => {
                                                 
                                                   this.searchBusinesses()
                                                 
                                                 } } placeholder="type business name" />
            <br/>
            <br/>
            <div className="business-search-results-container">
              { this
                  .state
                  .businesses
                  .map(
                    (business, i) => (
                      <div key={ i } onClick={ (event) => {
                                         
                                           this.selectBusines(business)
                                         
                                         } }>
                        <p className="businesSelection">
                          { business.name }
                        </p>
                      </div>
                    )
                
                ) }
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