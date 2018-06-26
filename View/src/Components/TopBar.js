import React, { Component } from 'react';
import userService from '../Services/userService.js'
import urlService from '../Services/urlService.js'

var goToEditProfilePage = function() {

  userService.get({
    params: {
      _id: 1
    }
  })

    .subscribe((currentUser) => {

      var url = `${urlService.editUserProfile}?id=${currentUser._id}`;

      console.log('url', url)
      userService.storeSignUpInfo(currentUser)

      urlService.goTo(url)

    })
}

var goToLocations = function() {

  window.location.hash = "locations"

}

var goToChangePassword = function() {

  userService.get({
    params: {
      _id: 1
    }
  })

    .subscribe((currentUser) => {

      var url = `${urlService.changePassword}?id=${currentUser._id}`;

      console.log('url', url)
      userService.storeSignUpInfo(currentUser)

      urlService.goTo(url)

    })
}

var Topbar = (props) => {

  return (<div className='row flex-row-center-vert' style={ { backgroundColor: 'white', position: 'relative', zIndex: '5', height: '10%' } }>
            <div className='col-sm-4'>
              <button onClick={ (event) => {
                                
                                  window.history.back();
                                } } className='btn btn-secondary'>
                back
              </button>
            </div>
            <div className='col-sm-4'>
              <h2 className="Brandon_bld">{ props.title }</h2>
            </div>
            <div className='col-sm-4'>
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="material-icons md-36">settings</i>
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" onClick={ (event) => {
                                                         
                                                           userService.logOut()
                                                         
                                                         } }>Logout</a>
                  <a onClick={ (event) => {
                               
                                 goToEditProfilePage()
                               } } className="dropdown-item">Update Profile</a>
                  <a onClick={ (event) => {
                               
                                 goToChangePassword()
                               } } className="dropdown-item">Change Password</a>
                  <a onClick={ (event) => {
                               
                                 goToLocations()
                               } } className="dropdown-item">Go To Locations</a>
                </div>
              </div>
            </div>
          </div>
  )


}

export { Topbar };