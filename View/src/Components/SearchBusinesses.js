import React, { Component } from 'react';
import userService from '../Services/userService.js'

import { Route, Link } from 'react-router-dom'

import urlService from '../Services/urlService.js'
import { Topbar } from './TopBar.js'


import BusinessService from '../Services/businessService.js';


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
              <table className="business-results-table">
                <thead>
                  <tr>
                    { this.tableRows.map((row, i) => (
                      
                      
                        <th key={ i }>
                          { row.title }
                        </th>
                      
                      
                      )) }
                    <th>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  { this
                      .state
                      .businesses
                      .map(
                        (business, i) => (
                    
                          <tr key={ i }>
                            { this.tableRows.map((row, j) => (
                              
                                <td key={ j } onClick={ (event) => {
                                                      
                                                        this.selectBusines(business)
                                                      
                                                      } }>
                                  { this.getTableEntry(business, row) }
                                </td> )
                              
                              ) }
                            <td>
                              <button onClick={ (event) => {
                                                
                                                  this.removeBusiness(business)
                                                
                                                } } className='btn btn-warning'>
                                remove
                              </button>
                            </td>
                          </tr>)
                    ) }
                </tbody>
              </table>
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