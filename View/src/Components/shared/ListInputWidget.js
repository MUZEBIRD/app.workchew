import React, { Component } from 'react';
import { v4 } from 'uuid'

const KeyInputRange = (props) => (<div>
                                    { props.itemPropList.map((propertyKeyItem, i) => (
                                      
                                        <div key={ i }>
                                          <input defaultValue={ props.item[propertyKeyItem.name] } />
                                          <br/>
                                          <br/>
                                        </div>
                                      
                                      )) }
                                  </div>)

class ListInputWidget extends Component {

  constructor(props) {

    super(props);

    this.state = {

    };

  }

  componentDidMount() {}

  render() {

    return (

      <div className="busines-seat-widget">
        <br/>
        <div className="busines-seat-title">
          <p>
            { this.props.title }
          </p>
          <button onClick={ (event) => {
                            
                              this.props.addItem()
                            
                            } } className='btn btn-success'>
            Add
          </button>
        </div>
        <br/>
        <div className="scrollView">
          <div className="business-seats">
            { this.props.items && this
                .props
                .items
                .map(
                  (item, i) => (
                    <div className="busines-seat-component" key={ v4() }>
                      <br/>
                      <div className="busines-seat-title">
                        <span>{ this.props.itemTitle } # { i }</span>
                        <button onClick={ (event) => {
                                          
                                            this.props.removeItem(item, i)
                                          
                                          } } className='btn btn-danger'>
                          remove
                        </button>
                      </div>
                      <br/>
                      <div className="busines-seat-info">
                        <KeyInputRange itemPropList={ this.props.itemPropList } item={ item } />
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

export default ListInputWidget;