import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter } from 'react-router-dom'

import Login from './Components/Login.js'

import Business from './Components/Businesses.js'

import SearchBusinesses from './Components/SearchBusinesses.js'

import AddBusiness from './Components/AddBusiness.js'

import PublicBusinessView from './Components/Business/PublicBusinessView.js'

import Users from './Components/Users.js'

import SearchUsers from './Components/SearchUsers.js'

import AddUser from './Components/AddUser.js'

import { BusinessUserSignUp, UserSignUp } from './Components/SignUp'


import Main from './Components/Main.js'

import { Route } from 'react-router-dom'

import createHistory from 'history/createBrowserHistory'

const history = createHistory()

class App extends Component {

  render() {

    return (
      <HashRouter history={ history } basename='/'>
        <div className="App">
          <Route exact path="/" component={ Main } />
          <Route exact path="/Login" component={ Login } />
          <Route path="/businesses" component={ Business } />
          <Route path="/search-businesses" component={ SearchBusinesses } />
          <Route path="/add-business" component={ AddBusiness } />
          <Route path="/view-business" component={ AddBusiness } />
          <Route path="/users" component={ Users } />
          <Route path="/add-user" component={ AddUser } />
          <Route path="/view-user" component={ AddUser } />
          <Route path="/search-users" component={ SearchUsers } />
          <Route path="/business-page" component={ PublicBusinessView } />
          <Route path="/business-signup" component={ BusinessUserSignUp } />
          <Route path="/co-chewer-signUp" component={ UserSignUp } />
          <Route path="/edit-users" />
        </div>
      </HashRouter>
      );
  }

}

export default App;