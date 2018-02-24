import React, { Component } from 'react';
import BusinessService from '../../Services/businessService.js';

import { Route, Link } from 'react-router-dom'
import './Business.css'
import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'

class BusinessTagsWidget extends Component {

  constructor(props) {

    super(props);

    this.state = {
      tags: []
    };

  }

  setTags(tags) {

    tags

      .forEach((tag, i) => {

        var textId = `${i}tagsText`;

        document.getElementById(textId).value = tag.text || "";

      })

    this.setState({
      tags
    })

  }

  getTags(tags) {

    return tags

      .map((tag, i) => {

        var textId = `${i}tagsText`;

        var text = document.getElementById(textId).value;

        return {
          text
        }

      })

  }

  isTag(input) {

    return (input.id.indexOf("Text") > -1)
  }

  addTag() {

    var nuTags = [...this.getTags(this.state.tags), {
      text: ""
    }]

    this.setState({
      tags: nuTags
    })

    console.log('this.state.tags', this.state.tags)
    this.updateTags(nuTags)
  }

  removeTag(tag, index) {

    var tags = this.getTags(this.state.tags)
    tags.splice(index, 1)
    //var nuTags = [...]

    this.setTags(tags)

    this.updateTags(tags)
  }

  componentDidMount() {

    console.log('this.props in tags di load', this.props)

    BusinessService.subject

      .filter((businessStream) => businessStream.updateTags)

      .filter((businessStream) => businessStream.tags)

      .filter((businessStream) => Array.isArray(businessStream.tags))

      .subscribe((businessStream) => {

        this.setState({
          tags: businessStream.tags
        }, () => {

          this.setTags(this.state.tags)

        })

      })

  }

  updateTags(tags) {

    BusinessService.subject.next({
      tagsUpdate: true,
      tags
    })

  }

  render() {

    return (

      <div className="busines-seat-widget">
        <br/>
        <div className="busines-seat-title">
          <p>
            Tags
          </p>
          <button onClick={ (event) => {
                            
                              this.addTag()
                            
                            } } className='btn btn-success'>
            Add
          </button>
        </div>
        <br/>
        <div className="scrollView">
          <div className="business-seats">
            { this
                .state
                .tags
                .map(
                  (tag, i) => (
                    <div className="busines-seat-component" key={ i }>
                      <br/>
                      <div className="busines-seat-title">
                        <span>Tag # { i }</span>
                        <button onClick={ (event) => {
                                          
                                            this.removeTag(tag, i)
                                          
                                          } } className='btn btn-danger'>
                          remove
                        </button>
                      </div>
                      <br/>
                      <div className="busines-seat-info">
                        <input placeholder="text" id={ `${i}tagsText` } />
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

export default BusinessTagsWidget;