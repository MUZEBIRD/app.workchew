import React, { Component } from 'react';
import BusinessService from '../../Services/businessService.js';

import { Route, Link } from 'react-router-dom'

import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'

class FlexTable extends Component {

  constructor(props) {

    super(props);

        console.log(props,'props props')


    this.state = this.props

  }

  getTableEntry(item,row){

    return item[row.key];

  }

  selecItem(item) {
      
    console.log(item,'item selected')

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
                                                      
                                                        this.selecItem(item)
                                                      
                                                      } }>
                                  { this.getTableEntry(item, row) }
                                </td> )
                              
                              ) }
                   
                          </tr>)
                    ) }
                </tbody>
              </table>
      );
  }

}

export default FlexTable;