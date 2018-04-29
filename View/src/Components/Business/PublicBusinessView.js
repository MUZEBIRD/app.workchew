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

  render() {

    var {business} = this.state
    return (

      <div className="wholeView flex-col">
        <div className="showView">
          { business &&
            <div className="scrollView">
              <Topbar title={ business.name } />
              <div className="row">
                <div className="col-md-6">
                  <h2>{ business.name }</h2>
                  <br/>
                  <span>4.93 15 ratings</span>
                  <br/>
                  <span>{ business.address }</span>
                  <br/>
                  <span>Total: 25 | Availiable: 10</span>
                </div>
                <div className="col-md-6">
                  <button className="btn btn-primary" type="button">
                    Menu
                  </button>
                </div>
              </div>
              <br/>
              <div className="row">
                <div className="col-md-6">
                  <h3>Hours</h3>
                </div>
                <div className="col-md-6">
                  <h3>Discounts</h3>
                </div>
              </div>
              <br/>
              <div className="row">
                <div className="col-md-12">
                  <h3>Events:</h3>
                </div>
              </div>
            </div> }
        </div>
      </div>


      );
  }

}

export default PublicBusinessView;