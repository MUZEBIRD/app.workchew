import React, { Component } from 'react';
import { v4 } from 'uuid'

const KeyInputRange = (props) => (<div>
                                    { props.itemPropList.map((propertyKeyItem, i) => (
                                      
                                        <div key={ i }>
                                          <input onChange={ (event) => {
                                                              var change = event.target.value
                                                              var key = propertyKeyItem.name
                                                              console.log(' on change', props.onChange({
                                                                change,
                                                                key
                                                              }))
                                                            } } defaultValue={ props.item[propertyKeyItem.name] } />
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


  onItemChange = (item, i) => {

    console.log('item change ', item)

    var nuList = [...this.props.items]

    nuList[i] = item;

    this.props.onListUpdate(nuList)

  }

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
                        <KeyInputRange onChange={ ({change, key}) => {
                                                    item[key] = change
                                                    this.onItemChange(item)
                                                  } } itemPropList={ this.props.itemPropList } item={ item } />
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