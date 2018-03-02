import React, { Component } from 'react';
import BusinessService from '../../Services/businessService.js';

import { Route, Link } from 'react-router-dom'
import './Business.css'
import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'
import { ListInputWidget } from '../shared/';
// <BusinessDiscountWidget onListUpdate={ this.onListUpdate } discounts={ this.state.business.discounts } />

class DiscountListWidget extends Component {

  constructor(props) {

    super(props);

    this.state = {

    };

  }

  discountItemProperties =[
    {
      name: 'name'
    },
    {
      name: 'description',
      type: 'textarea'
    }
  ]

  render() {

    var discountListWidgetProps = {

      items: this.props.discounts || [],
      itemTitle: "discount",
      title: "Discounts",
      itemPropList: this.discountItemProperties,
      removeItem: (i) => {

        console.log('onRemoveListItem', i)
        console.log('onRemoveListItem this.props.discounts', this.props.discounts)

        var fresh = [...this.props.discounts];
        console.log('onRemoveListItem fresh', fresh)

        fresh.splice(i, 1)
        console.log('onRemoveListItem fresh after splice', fresh)

        this.props.onListUpdate({
          key: 'discounts',
          items: fresh
        })

      },
      addItem: () => {

        console.log('onAddListItem')

        console.log('onAddListItem this.props.discounts', this.props.discounts)

        var fresh = [...this.props.discounts];
        console.log('onAddListItem fresh', fresh)

        fresh.push({})

        console.log('onAddListItem fresh after push', fresh)

        this.props.onListUpdate({
          key: 'discounts',
          items: fresh
        })
      }

    }

    return (<ListInputWidget {...discountListWidgetProps} />);
  }

}

export default DiscountListWidget;