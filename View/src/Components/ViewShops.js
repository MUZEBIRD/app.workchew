import React, { Component } from 'react';

import userService from '../Services/userService.js'

import urlService from '../Services/urlService.js'

import picService from '../Services/picService.js'

class ViewShops extends Component {

  constructor(props) {

    super(props);

    this.state = {
      shops: []
    };

    picService

      .get({
        'metadata.mode': 'menuPic'
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
          <h2 style={ { backgroundColor: 'white', position: 'relative', zIndex: '10' } }>View shops</h2>
          <div className='picShopView'>
            <br/>
            <br/>
            { this
                .state
                .shops
                .map(
                  (picData, i) => (
                    <div key={ i } className='viewShopsImgHolder'>
                      <img onClick={ (event) => {
                                     
                                       urlService
                                         .goTo(`${urlService.viewShopPage}/${picData._id}`)
                                     
                                     } } src={ `${urlService.pic}/${picData._id}` } />
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

export default ViewShops;