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
      seats: []
    };

  }

  setSeats(seats) {

    seats

      .forEach((seat, i) => {

        var customerId = `${i}seatCustomer`;

        var sectionId = `${i}seatSection`;

        document.getElementById(customerId).value = seat.customer || "";

        document.getElementById(sectionId).value = seat.section || "";

      })

    this.setState({
      seats
    })

  }

  getSeats(seats) {

    return seats

      .map((seat, i) => {

        var customerId = `${i}seatCustomer`;

        var sectionId = `${i}seatSection`;

        var customer = document.getElementById(customerId).value;

        var section = document.getElementById(sectionId).value;

        return {
          customer,
          section
        }

      })

  }

  isSeat(input) {

    return (input.id.indexOf("Customer") > -1)
  }

  addSeat() {

    var nuSeats = [...this.getSeats(this.state.seats), {
      customer: "",
      section: ""
    }]

    this.setState({
      seats: nuSeats
    })

    console.log('this.state.seats', this.state.seats)
    this.updateSeats(nuSeats)
  }

  removeSeat(seat, index) {

    var seats = this.getSeats(this.state.seats)
    seats.splice(index, 1)
    //var nuSeats = [...]

    this.setSeats(seats)

    this.updateSeats(seats)
  }

  componentDidMount() {

    console.log('this.props in seats di load', this.props)

    BusinessService.subject

      .filter((businessStream) => businessStream.updateSeats)

      .filter((businessStream) => businessStream.seats)

      .filter((businessStream) => Array.isArray(businessStream.seats))


      .subscribe((businessStream) => {

        this.setState({
          seats: businessStream.seats
        }, () => {

          this.setSeats(this.state.seats)

        })


      })

  }

  updateSeats(seats) {

    BusinessService.subject.next({
      seatUpdate: true,
      seats
    })

  }

  render() {

    return (

      <div className="busines-seat-widget">
        <br/>
        <div className="busines-seat-title">
          <p>
            SEATS
          </p>
          <button onClick={ (event) => {
                            
                              this.addSeat()
                            
                            } } className='btn btn-success'>
            Add
          </button>
        </div>
        <br/>
        <div className="scrollView">
          <div className="business-seats">
            { this
                .state
                .seats
                .map(
                  (seat, i) => (
                    <div className="busines-seat-component" key={ i }>
                      <br/>
                      <div className="busines-seat-title">
                        <span>Seat # { i }</span>
                        <button onClick={ (event) => {
                                          
                                            this.removeSeat(seat, i)
                                          
                                          } } className='btn btn-danger'>
                          remove
                        </button>
                      </div>
                      <br/>
                      <div className="busines-seat-info">
                        <input placeholder="customer" id={ `${i}seatCustomer` } />
                        <br/>
                        <br/>
                        <input placeholder="section" id={ `${i}seatSection` } />
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