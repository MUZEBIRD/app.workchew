import React, { Component } from 'react';
import userService from '../Services/userService.js'

import { Route, Link } from 'react-router-dom'

import urlService from '../Services/urlService.js'
import { Topbar } from './TopBar.js'

class SearchUser extends Component {

  constructor(props) {

    super(props);

    this.state = {
      users: []
    };

    userService.checkLoginStatus()


    this.getUserStream({})

      .subscribe((getUserStream) => {

        this.setState({
          users: [...getUserStream]
        })

      })

  }

  selectUser(user) {

    console.log('on select User', user)

    urlService.goTo(`${urlService.viewUserPage}?id=${user._id}`)

  }

  searchUsers() {

    var input = document.getElementById('userSearch');

    var searchTerm = input.value;

    if (searchTerm && searchTerm.length > 0) {

      userService.get({
        params: {
          searchTerm
        }
      })

        .subscribe((userSearchStream) => {

          console.log('userSearchStream', userSearchStream)

          this.setState({
            users: userSearchStream
          })

        })

    } else {

      this.getUserStream({})

        .subscribe((getUserStream) => {

          this.setState({
            users: [...getUserStream]
          })

        })

    }

  }

  getUserStream(params) {

    return userService.get({
      params
    })

  }

  render() {
    var props = {

      title: "Search User",
    }
    return (

      <div className="wholeView flex-col">
        <div className="showView">
          <Topbar props={ { ...props } } />
          <br/>
          <br/>
          <div>
            <input placeholder="type user name" id="userSearch" onKeyUp={ (event) => {
                                                                          
                                                                            this.searchUsers()
                                                                          
                                                                          } } />
            <br/>
            <br/>
            <div className="user-search-results-container">
              <div>
                { this
                    .state
                    .users
                    .map(
                      (user, i) => (
                        <div key={ i } onClick={ (event) => {
                                           
                                             this.selectUser(user)
                                           
                                           } }>
                          <p className="businesSelection">
                            { user.email }
                          </p>
                        </div>
                      )
                  
                  ) }
              </div>
            </div>
            <br/>
            <br/>
          </div>
        </div>
      </div>

      );
  }

}

export default SearchUser;