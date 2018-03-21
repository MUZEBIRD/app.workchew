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

        return BusinessService.checkIn({
          bid: this.state.business._id,
          uid: logedInUser._id
        })

      })

      .subscribe((getCurrentUserStream) => {

        console.log('getCurrentUserStream', getCurrentUserStream)

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
              <br/>
              <br/>
              <br/>
              <div className="row">
                <div className="col-sm-12">
                  <div>
                    <p>
                      { business.address }
                    </p>
                  </div>
                  <div>
                    <p>
                      { business.phone }
                    </p>
                  </div>
                  <div>
                    <p>
                      wifi password :
                      { business.wifi }
                    </p>
                  </div>
                  <div className="row">
                    <div className='col-sm-2'>
                      { !this.state.isCheckedIn ?
                        <button onClick={ (event) => {
                                          
                                            this.checkIn()
                                          
                                          } } className='btn btn-primary'>
                          check In
                        </button>
                        :
                        <button onClick={ (event) => {
                                          
                                            this.checkOut()
                                          
                                          } } className='btn btn-primary'>
                          check Out
                        </button> }
                    </div>
                  </div>
                  <p>
                    Discounts
                  </p>
                  <div>
                    { business.discounts &&
                      <FlexTable items={ business.discounts } tableRows={ this.discountTableRows } /> }
                  </div>
                </div>
              </div>
            </div> }
        </div>
      </div>


      );
  }

}

export default PublicBusinessView;