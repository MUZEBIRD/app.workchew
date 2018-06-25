import React, { Component } from 'react';
import BusinessService from '../../Services/businessService.js';
import { getQueryParams } from '../../Utils/';
import { FlexTable } from '../shared/';

import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'


import userService from '../../Services/userService.js'

import { Topbar } from '../TopBar.js'

class PublicBusinessView extends Component {

  constructor(props) {

    super(props);

    this.state = {
      business: {},
      isCheckedIn: false
    }

  }

  discountTableRows =[
    {
      title: "Name",
      key: "name"
    },
    {
      title: "Description",
      key: "description"
    },

  ]

  componentDidMount() {

    var params = getQueryParams() || {};

    if (params.id) {

      this.setBusiness(params.id)

    }

  }

  checkOut() {

    userService.get({
      params: {
        _id: 1
      }
    })

      .filter((getCurrentUserStream) => getCurrentUserStream._id)

      .switchMap((logedInUser) => {

        return BusinessService.checkOut({
          bid: this.state.business._id,
          uid: logedInUser._id
        })

          .map((checkOutStream) => {

            return {
              checkOutStream,
              uid: logedInUser._id
            }

          })

      })

      .subscribe(({checkOutStream, uid}) => {

        console.log('checkOutStream', checkOutStream)

        var {putBusinessResponse} = checkOutStream;

        if (putBusinessResponse && putBusinessResponse.seats) {

          var seats = putBusinessResponse.seats || [];

          var seatsWithUser = seats.filter((seat) => seat.customer == uid)

          if (seatsWithUser.length == 0) {

            this.setState({
              isCheckedIn: false
            })

          }

        }

      })

  }

  checkIn() {

    userService.get({
      params: {
        _id: 1
      }
    })

      .filter((getCurrentUserStream) => getCurrentUserStream._id)

      .switchMap((logedInUser) => {

        return BusinessService.checkIn({
          bid: this.state.business._id,
          uid: logedInUser._id
        })

          .map((checkInStream) => {

            return {
              checkInStream,
              uid: logedInUser._id
            }

          })

      })

      .subscribe(({checkInStream, uid}) => {

        console.log('checkInStream', checkInStream)

        var {putBusinessResponse} = checkInStream;

        if (putBusinessResponse && putBusinessResponse.seats) {

          var seats = putBusinessResponse.seats || [];

          var seatsWithUser = seats.filter((seat) => seat.customer == uid)

          if (seatsWithUser.length > 0) {

            this.setState({
              isCheckedIn: true
            })

          }

        }

      })

  }

  setBusiness(id) {

    BusinessService.get({
      params: {
        _id: id
      }
    })

      .map((getBusinessStream) => {

        console.log('getBusinessStream  in set business public business view', getBusinessStream)

        var business = getBusinessStream[0];

        if (typeof business.seats === 'string') {

          business.seats = [];

        }

        return business

      })

      .switchMap(business => {

        return userService.get({
          params: {
            _id: 1
          }
        })

          .map((getCurrentUserStream) => {

            return {
              business,
              currentUser: getCurrentUserStream
            }

          })

      })

      .subscribe(({business, currentUser}) => {

        var seats = business.seats || []

        var seatsWithUser = seats.filter(seat => seat.customer == currentUser._id)

        var isCheckedIn = this.state.isCheckedIn

        if (seatsWithUser.length > 0) {
          isCheckedIn = true;
        }

        console.log(currentUser)

        this.setState({
          business,
          isCheckedIn
        })

      })

  }

  getTableEntry(item, row) {

    return item[row.key]
  }

  gotToPartnerMenu = () => {

    userService.get({
      params: {
        _id: 1
      }
    })
      .subscribe((user) => {

        var token = user.auth.token || user.auth.accessToken
        if (token) {

          window.location.href = "http://orders.workchew.com/#/?bid=" + this.state.business._id + "&token=" + token

        }

      })


  }
  render() {

    var {business} = this.state
    return (

      <div className="wholeView flex-col">
        <div className="showView">
          { business &&
            <div className="scrollView">
              <Topbar title={ '' } />
              { business.bannerImgId
                && business.bannerImgId != ""
                && <div className="row h-25">
                     <div className="col-md-12">
                       <img style={ { opacity: .2 } } className="h-200 w-100" src={ `${urlService.pic}/${business.bannerImgId}` } />
                     </div>
                   </div> }
              <br/>
              <br/>
              <div className="row">
                <div className="col-md-1">
                </div>
                <div className="col-md-5  text-left">
                  <h2 style={ { fontWeight: 'bold' } } className="Brandon_bld">{ business.name }</h2>
                  <span>{ business.address }</span>
                  <br/>
                  <span className="Brandon_bld">Total: { business.seats || '0' } | Availiable:{ business.openSeats || business.seats || '0' }</span>
                </div>
                <div className="col-md-6">
                  <button onClick={ (event) => {
                                      this.gotToPartnerMenu()
                                    } } className="btn btn-primary Brandon_bld" type="button">
                    Menu
                  </button>
                </div>
              </div>
              <br/>
              <hr/>
              <div className="row">
                <div className="col-md-6">
                  <h3 className="Brandon_bld">Hours:</h3>
                  <p className="Brandon_bld">
                    { business.hours }
                  </p>
                </div>
                <div className="col-md-6">
                  <h3 className="Brandon_bld">Discounts:</h3>
                  <p className="Brandon_bld">
                    { business.discounts }
                  </p>
                </div>
              </div>
              <br/>
              <div className="row">
                <div className="col-md-6">
                  <h3 className="Brandon_bld">Events:</h3>
                  <p className="Brandon_bld">
                    { business.events }
                  </p>
                </div>
                <div className="col-md-6">
                  <h3 className="Brandon_bld">Specials:</h3>
                  <p className="Brandon_bld">
                    { business.specials }
                  </p>
                </div>
              </div>
            </div> }
        </div>
      </div>


      );
  }

}

export default PublicBusinessView;