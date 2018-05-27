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

import PartnerPage from './Components/partner-page.js'

import PartnerMarketingPage from './Components/Partner/Marketing.js'

import PartnerSettingsPage from './Components/Partner/Settings.js'

import SearchUsers from './Components/SearchUsers.js'

import AddUser from './Components/AddUser.js'

import { BusinessUserSignUp, UserSignUp, Memberships, UserSignUpSocial, BuildYourProfile } from './Components/SignUp'

import Main from './Components/Main.js'

import { Route } from 'react-router-dom'

import createHistory from 'history/createBrowserHistory'

import { store } from './Store'

import { Provider, connect } from 'react-redux'


const history = createHistory()

class App extends Component {

  render() {

    return (
      <Provider store={ store }>
        <HashRouter history={ history } basename='/'>
          <div className="App">
            <Route exact path="/" component={ Main } />
            <Route exact path="/Login" component={ Login } />
            <Route exact path="/partner-marketing-page" component={ PartnerMarketingPage } />
            <Route exact path="/partner-settings-page" component={ PartnerSettingsPage } />
            <Route exact path="/partner-page" component={ PartnerPage } />
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
            <Route path="/co-chewer-signUp-social" component={ UserSignUpSocial } />
            <Route path="/co-chewer-signUp-build" component={ BuildYourProfile } />
            <Route path="/co-chewer-signUp" component={ UserSignUp } />
            <Route path="/memberships" component={ Memberships } />
            <Route path="/edit-user" />
          </div>
        </HashRouter>
      </Provider>

      );
  }

}


/*
 <Route path="/" component={ UserSignUp } />
*/

export default App;