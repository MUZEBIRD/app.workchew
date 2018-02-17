import React, { Component } from 'react';
import userService from '../Services/userService.js'

import { Route, Link } from 'react-router-dom'

import urlService from '../Services/urlService.js'

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

    return (

      <div className="wholeView flex-col">
        <div className="showView">
          <div className='row flex-row-center-vert' style={ { backgroundColor: 'white', position: 'relative', zIndex: '5', height: '10%' } }>
            <div className='col-sm-4'>
              <button onClick={ (event) => {
                                
                                  userService.logOut()
                                
                                } } className='btn btn-success'>
                log out
              </button>
            </div>
            <div className='col-sm-4'>
              <h2>Search User</h2>
            </div>
          </div>
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
                            { user.name }
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