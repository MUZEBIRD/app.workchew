import React, { Component } from 'react';
import BusinessService from '../../Services/businessService.js';
import { getQueryParams } from '../../Utils/';

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

  componentDidMount() {

    var params = getQueryParams() || {};

    if (params.id) {

      this.setBusiness(params.id)

    }

  }

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

  render() {

    var {business} = this.state
    return (

      <div className="wholeView flex-col">
        <div className="showView">
          { business &&
            <div className="scrollView">
              <Topbar title={ business.name } />
              <br/>
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
            </div> }
        </div>
      </div>


      );
  }

}

export default PublicBusinessView;