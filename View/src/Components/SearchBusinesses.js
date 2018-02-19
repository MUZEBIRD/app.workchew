import React, { Component } from 'react';
import userService from '../Services/userService.js'

import { Route, Link } from 'react-router-dom'

import urlService from '../Services/urlService.js'


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
            <div className='col-sm-4'>
              <h2>Search Businesses</h2>
            </div>
          </div>
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