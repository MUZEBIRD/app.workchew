import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import userService from '../../Services/userService.js'
import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'

import { getQueryParams, getPathVariables } from '../../Utils'
import { placeButton } from '../../Utils/wc-pal-pal-client.js'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { Subject } from 'rxjs'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class UserInterest extends Component {

  constructor(props) {

    super(props);

    var queryParams = getQueryParams()

    this.state = {

      queryParams,
    }

  }

  componentDidMount() {}

  render() {

    return (

      <MuiThemeProvider>
        <div className="wholeView w-100 d-flex flex-column align-items-center">
          <div className="showView w-100 scroll-y container d-flex flex-column align-items-center justify-content-center">
            <br/>
            <h1 className='text-left'>How do you identify yourself ?</h1>
            <h1 className='text-left'>Choose the one that fits the best.</h1>
            <div className='w-100'>
              <button className="btn btn-secondary m-2">
                UI/UX Politics Capital
              </button>
              <button className="btn btn-secondary m-2">
                Venture Startups Art
              </button>
              <button className="btn btn-secondary m-2">
                Law Entrepreneurship Creativity Social
              </button>
              <button className="btn btn-secondary m-2">
                Writing Real Estate Consulting Web
              </button>
              <button className="btn btn-secondary m-2">
                Development
              </button>
              <button className="btn btn-secondary m-2">
                Graphic
              </button>
              <button className="btn btn-secondary m-2">
                Design
              </button>
              <button className="btn btn-secondary m-2">
                Photography Sales & Marketing Branding Public Relations
              </button>
              <button className="btn btn-secondary m-2">
                Accounting Big Data Architecture Production
              </button>
              <button className="btn btn-secondary m-2">
                Audio/Video
              </button>
              <button className="btn btn-secondary m-2">
                Music/DJ
              </button>
              <button className="btn btn-secondary m-2">
                Investing
              </button>
              <button className="btn btn-secondary m-2">
                Personal
              </button>
              <button className="btn btn-secondary m-2">
                Development
              </button>
              <button className="btn btn-secondary m-2">
                Mobil App
              </button>
              <button className="btn btn-secondary m-2">
                Property
              </button>
              <button className="btn btn-secondary m-2">
                Intellectual
              </button>
              <button className="btn btn-secondary m-2">
                Foo
              </button>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
      );
  }

}

export default UserInterest;