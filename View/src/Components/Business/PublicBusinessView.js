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
    return (

      <div className="wholeView flex-col">
        <div className="showView">
          { this.state.business && <div className="scrollView">
                                     <Topbar title={ this.state.business.name } />
                                     <br/>
                                     <div>
                                       <p>
                                         { JSON.stringify(this.state.business) }
                                       </p>
                                     </div>
                                   </div> }
        </div>
      </div>


      );
  }

}

export default PublicBusinessView;