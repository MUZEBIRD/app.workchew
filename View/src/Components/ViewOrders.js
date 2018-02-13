import React, { Component } from 'react';

import userService from '../Services/userService.js'

import urlService from '../Services/urlService.js'

import picService from '../Services/picService.js'

class ViewOrder extends Component {

  constructor(props) {

    super(props);

    this.state = {
      shops: []
    };

    userService.get({
      _id: 1
    })

      .switchMap(getUserResponse => {

        return picService

          .get({
            'metadata.mode': 'itemPic',
            'metadata.userId': getUserResponse._id,

          })
      })
      .subscribe((getPicsResponse) => {

        this.setState({
          shops: getPicsResponse
        })

      })

  }

  render() {

    return (

      <div className="wholeView flex-col">
        <div className="showView">
          <h2 style={ { backgroundColor: 'white', position: 'relative', zIndex: '10' } }>View orders</h2>
          <div className='picShopView'>
            <br/>
            <br/>
            { this
                .state
                .shops
                .map(
                  (picData, i) => (
                    <div key={ i }>
                      <img src={ `${urlService.pic}/${picData._id}` } />
                    </div>
                  )
              
              ) }
            <br/>
            <br/>
          </div>
        </div>
      </div>

      );
  }

}

export default ViewOrder;