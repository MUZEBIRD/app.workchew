import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter } from 'react-router-dom'

import Login from './Components/Login.js'

import Bussiness from './Components/Businesses.js'


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
          <Route path="/businesses" component={ Bussiness } />
          <Route path="/users" />
          <Route path="/add-businesses" />
          <Route path="/add-users" />
          <Route path="/search-businesses" />
          <Route path="/search-users" />
          <Route path="/edit-businesses" />
          <Route path="/edit-users" />
        </div>
      </HashRouter>
      );
  }

}

export default App;