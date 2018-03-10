import React, { Component } from 'react';
import BusinessService from '../../Services/businessService.js';
import { getQueryParams } from '../../Utils/';
import { FlexTable } from '../shared/';

import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'
import { Topbar } from '../TopBar.js'

class PublicBusinessView extends Component {

  constructor(props) {

    super(props);

    this.state = {
      business: {}
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


  checkIn() {}

  setBusiness(id) {

    BusinessService.get({
      params: {
        _id: id
      }
    })

      .subscribe((getBusinessStream) => {

        console.log('getBusinessStream  in set business public business view', getBusinessStream)

        var business = getBusinessStream[0]
        if (typeof business.seats === 'string') {

          business.seats = [];

        }

        this.setState({
          business
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
                      <button onClick={ (event) => {
                                        
                                          this.checkIn()
                                        
                                        } } className='btn btn-primary'>
                        check In
                      </button>
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