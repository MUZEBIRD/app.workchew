import React, { Component } from 'react';
import BusinessService from '../../Services/businessService.js';

import { Route, Link } from 'react-router-dom'
import './Business.css'
import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'

class BusinessDiscountWidget extends Component {

  constructor(props) {

    super(props);

    this.state = {
      discounts: []
    };

  }

  setDiscount(discounts) {

    discounts

      .forEach((discount, i) => {

        var nameId = `${i}discountsName`;

        var descriptionId = `${i}discountsDescription`;

        document.getElementById(nameId).value = discount.name || "";

        document.getElementById(descriptionId).value = discount.description || "";

      })

    this.setState({
      discounts
    })

  }

  getDiscount(discounts) {

    return discounts

      .map((discount, i) => {

        var nameId = `${i}discountsName`;

        var descriptionId = `${i}discountsDescription`;

        var name = document.getElementById(nameId).value;

        var description = document.getElementById(descriptionId).value;

        return {
          name,
          description
        }

      })

  }

  addDiscount() {

    var nuDiscount = [...this.getDiscount(this.state.discounts), {
      name: "",
      description: ""
    }]

    this.setState({
      discounts: nuDiscount
    })

    console.log('this.state.discounts', this.state.discounts)
    this.updateDiscount(nuDiscount)
  }

  removeDiscount(discount, index) {

    var discounts = this.getDiscount(this.state.discounts)
    discounts.splice(index, 1)

    this.setDiscount(discounts)

    this.updateDiscount(discounts)
  }

  componentDidMount() {

    console.log('this.props in discounts di load', this.props)

    BusinessService.subject

      .filter((businessStream) => businessStream.updateDiscounts)

      .filter((businessStream) => businessStream.discounts)

      .filter((businessStream) => Array.isArray(businessStream.discounts))

      .subscribe((businessStream) => {

        this.setState({
          discounts: businessStream.discounts
        }, () => {

          this.setDiscount(this.state.discounts)

        })


      })

  }

  updateDiscount(discounts) {

    BusinessService.subject.next({
      discountsUpdate: true,
      discounts
    })

  }

  render() {

    return (

      <div className="busines-seat-widget">
        <br/>
        <div className="busines-seat-title">
          <p>
            Discounts
          </p>
          <button onClick={ (event) => {
                            
                              this.addDiscount()
                            
                            } } className='btn btn-success'>
            Add
          </button>
        </div>
        <br/>
        <div className="scrollView">
          <div className="business-seats">
            { this
                .state
                .discounts
                .map(
                  (discount, i) => (
                    <div className="busines-seat-component" key={ i }>
                      <br/>
                      <div className="busines-seat-title">
                        <span>Discount # { i }</span>
                        <button onClick={ (event) => {
                                          
                                            this.removeDiscount(discount, i)
                                          
                                          } } className='btn btn-danger'>
                          remove
                        </button>
                      </div>
                      <br/>
                      <div className="busines-seat-info">
                        <input placeholder="name" id={ `${i}discountsName` } />
                        <br/>
                        <br/>
                        <textarea placeholder="description" id={ `${i}discountsDescription` } />
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

export default BusinessDiscountWidget;