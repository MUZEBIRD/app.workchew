import React, { Component } from 'react';
import BusinessService from '../../Services/businessService.js';

import { Route, Link } from 'react-router-dom'
import './Business.css'
import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'

class BusinessSeatWidget extends Component {

  constructor(props) {

    super(props);

    this.state = {
      seats: this.props.seats
    };

  }

  addSeat() {

    this.seats.push({
      name: "",
      section: ""
    })

  }

  removeSeat(seat, index) {

    this.seats.splice(index, 1)

  }

  componentDidMount() {

    console.log('this.props', this.props)

  }

  updateSeats() {

    this.props.addBusinessSubject.next({
      businessUpdate: true,
      business: {
        seats: this.seats
      }
    })

  }

  render() {

    return (

      <div className="busines-seat-widget">
        <div className="busines-seat-title">
          <p>
            SEATS
          </p>
        </div>
        <div className="scrollView">
          <div className="business-seats">
            { this
                .state
                .seats
                .map(
                  (business, i) => (
                    <div className="busines-seat-component" key={ i }>
                      <br/>
                      <p>
                        Seat #
                        { i }
                      </p>
                      <div className="busines-seat-info">
                        <input placeholder="customer" id={ `seat${i}Name` } />
                        <br/>
                        <br/>
                        <input placeholder="section" id={ `seat${i}section` } />
                      </div>
                    </div>
                  )
              ) }
          </div>
        </div>
      </div>

      );
  }

}

export default BusinessSeatWidget;