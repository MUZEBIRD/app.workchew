import React, { Component } from 'react';

import userService from '../Services/userService.js'

import urlService from '../Services/urlService.js'

import picService from '../Services/picService.js'

class LoadPic extends Component {

  constructor(props) {

    super(props);

    this.state = {
      picForm: new FormData(),
      previewImages: []
    };

  }

  onFileSelct(event) {

    var put = event.target

    var reader = new FileReader();

    reader.onload = function(e) {

      var dataUrl = e.target.result;

    }

    if (put.files[0]) {

      userService

        .get({
          _id: 1
        })

        .filter(user => user._id)

        .subscribe((getUserResponse) => {

          var imgBlob = new Blob([put.files[0]], {
            type: "image/jpeg"
          });

          this.state.picForm.append('file', imgBlob);

          this.state.picForm.append('userId', getUserResponse._id);

          this.state.picForm.append('mode', 'menuPic');

          picService
            .post(this.state.picForm)
            .subscribe((postPicResponse) => {

              if (postPicResponse.postPicResponse.id) {

                this.setState({
                  previewImages: [{
                    _id: postPicResponse.postPicResponse.id
                  }]
                })
              }

            })

        })

      reader.readAsDataURL(put.files[0]);

    }

  }

  render() {

    return (

      <div className="wholeView flex-col">
        <div className="showView">
          <h2>LoadPic</h2>
          <br/>
          <br/>
          <div>
            <button className="btn btn-info">
              <label htmlFor='loadpics'>
                Upload Saved Pic
              </label>
              <input style={ { display: 'none' } } name='loadpics' id="loadpics" type="file" onChange={ (event) => {
                                                                                                        
                                                                                                          this.onFileSelct(event)
                                                                                                        
                                                                                                        } } />
            </button>
            <br/>
            <br/>
            { this
                .state
                .previewImages
                .map(
                  (picData, i) => (
                    <div style={ { height: '300px' } } key={ i }>
                      <img src={ `${urlService.pic}/${picData._id}` } />
                    </div>
                  )
              
              ) }
          </div>
        </div>
      </div>

      );
  }

}

export default LoadPic;