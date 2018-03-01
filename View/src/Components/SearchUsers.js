import React, { Component } from 'react';
import userService from '../Services/userService.js'

import { Route, Link } from 'react-router-dom'

import urlService from '../Services/urlService.js'
import { Topbar } from './TopBar.js'
import { FlexTable } from './shared/';

class SearchUser extends Component {

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
      title: "Email",
      key: "email"
    },
    {
      title: "Phone",
      key: "phone"
    },
  ]

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

  getTableEntry(user, row) {

    return user[row.key]
  }

  removeUser(user) {

    if (window.confirm(`Yikes! are you sure you want to delete ${user.name}`)) {

      userService.delete(user)

        .subscribe((userDeleteStream) => {

          console.log('userDeleteStream', userDeleteStream)

          this.searchUsers()

        })

    } else {


    }

  }

  render() {
    var props = {

      title: "Search User",
      users: this.state.users
    }
    return (

      <div className="wholeView flex-col">
        <div className="showView">
          <Topbar { ...props } />
          <br/>
          <br/>
          <div>
            <input placeholder="type user name" id="userSearch" onKeyUp={ (event) => {
                                                                          
                                                                            this.searchUsers()
                                                                          
                                                                          } } />
            <br/>
            <br/>
            <div className="user-search-results-container">
              { props.users &&
                <FlexTable items={ props.users } selectItem={ this.selectUser } removeItem={ (event, user) => this.removeUser(user) } getTableEntry={ this.getTableEntry } tableRows={ this.tableRows }
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

export default SearchUser;