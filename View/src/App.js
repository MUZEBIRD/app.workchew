import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter } from 'react-router-dom'

import Login from './Components/Login.js'

import Business from './Components/Businesses.js'

import SearchBusinesses from './Components/SearchBusinesses.js'

import AddBusiness from './Components/AddBusiness.js'

import AdminPartnerPage from './Components/AdminPartnerPage.js'

import PublicBusinessView from './Components/Business/PublicBusinessView.js'

import Users from './Components/Users.js'

import PartnerPage from './Components/partner-page.js'

import PartnerMarketingPage from './Components/Partner/Marketing.js'

import PartnerSettingsPage from './Components/Partner/Settings.js'

import SearchUsers from './Components/SearchUsers.js'

import AddUser from './Components/AddUser.js'

import { BusinessUserSignUp, PaymentPage, ChangePassword, UserSignUp, Memberships, M3mberships, UserSignUpSocial, BuildYourProfile, MembershipPaths, UserInterest, UserType } from './Components/SignUp'

import UserProfile from './Components/Public/UserPofile'
import UserCard from './Components/Public/UserCard'
import UserProfileSingIn from './Components/Public/UserProfileSignIn.js'

import Main from './Components/Main.js'

import { Route } from 'react-router-dom'

import createHistory from 'history/createBrowserHistory'

import { store } from './Store'

import { Provider, connect } from 'react-redux'
import { StripeProvider } from 'react-stripe-elements';

const history = createHistory()

class App extends Component {

  render() {

    return (
      <Provider store={ store }>
        <StripeProvider apiKey="pk_test_rPSGAU5ciy3i5pHlgjUtINnz">
          <HashRouter>
            <div className="App">
              <Route exact path="/" component={ Main } />
              <Route exact path="/locations" component={ Main } />
              <Route exact path="/payment-page" component={ PaymentPage } />
              <Route exact path="/Login" component={ Login } />
              <Route exact path="/partner-marketing-page" component={ PartnerMarketingPage } />
              <Route exact path="/partner-settings-page" component={ PartnerSettingsPage } />
              <Route exact path="/partner-page" component={ PartnerPage } />
              <Route path="/businesses" component={ Business } />
              <Route path="/search-businesses" component={ SearchBusinesses } />
              <Route path="/add-business" component={ AddBusiness } />
              <Route path="/view-business" component={ AddBusiness } />
              <Route path="/admin-partner-page" component={ AdminPartnerPage } />
              <Route path="/users" component={ Users } />
              <Route path="/add-user" component={ AddUser } />
              <Route path="/view-user" component={ AddUser } />
              <Route path="/search-users" component={ SearchUsers } />
              <Route path="/business-page" component={ PublicBusinessView } />
              <Route path="/changePassword" component={ ChangePassword } />
              <Route path="/business-signup" component={ BusinessUserSignUp } />
              <Route path="/co-chewer-signUp-social" component={ UserSignUpSocial } />
              <Route path="/co-chewer-profile" component={ UserSignUpSocial } />
              <Route path="/co-chewer-signUp-build" component={ BuildYourProfile } />
              <Route path="/co-chewer-signUp" component={ UserSignUp } />
              <Route path="/m3mberships" component={ M3mberships } />
              <Route path="/memberships" component={ Memberships } />
              <Route path="/user-profile" component={ UserProfile } />
              <Route path="/user-profile-signin" component={ UserProfileSingIn } />
              <Route path="/user-card" component={ UserCard } />
              <Route path="/user-type" component={ UserType } />
              <Route path="/user-interest" component={ UserInterest } />
              <Route path="/membership-paths" component={ MembershipPaths } />
              <Route path="/edit-user" />
            </div>
          </HashRouter>
        </StripeProvider>
      </Provider>

      );
  }

}

/*
 <Route path="/" component={ UserSignUp } />
*/

export default App;