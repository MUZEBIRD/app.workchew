import React, { Component } from 'react';
import BusinessService from '../../Services/businessService.js';

import { Route, Link } from 'react-router-dom'

import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'

class FlexTable extends Component {

  constructor(props) {

    super(props);

    console.log(props, 'props props')

    this.state = this.props

  }

  getTableEntry(item, row) {

    if (this.props.getTableEntry) {

      return this.props.getTableEntry(item, row)

    } else {

      return item[row.key];

    }

  }

  selectItem(item) {

    console.log(item, 'item selected')

    if (this.props.selectItem) {

      return this.props.selectItem(item)

    } else {


    }

  }

  render() {

    return (
      <table className="business-results-table">
        <thead>
          <tr>
            { this.props.tableRows.map((row, i) => (
              
                <th key={ i }>
                  { row.title }
                </th>
              
              )) }
            <th>
            </th>
          </tr>
        </thead>
        <tbody>
          { this.props.items &&
            this.props.items
              .map(
                (item, i) => (
            
                  <tr key={ i }>
                    { this.props.tableRows.map((row, j) => (
                      
                        <td key={ j } onClick={ (event) => {
                                              
                                                this.selectItem(item)
                                              
                                              } }>
                          { this.getTableEntry(item, row) }
                        </td> )
                      
                      ) }
                    { this.props.removeItem &&
                      <td>
                        <button onClick={ (event) => {
                                          
                                            this.props.removeItem(event, item)
                                          
                                          } } className='btn btn-warning'>
                          remove
                        </button>
                      </td> }
                  </tr>)
            ) }
        </tbody>
      </table>);
  }

}

export default FlexTable;