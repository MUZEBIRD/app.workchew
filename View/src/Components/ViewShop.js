import React, { Component } from 'react';

import userService from '../Services/userService.js'

import urlService from '../Services/urlService.js'

import picService from '../Services/picService.js'

import Rx from 'rxjs'

import { interact } from 'interactjs'

class ViewShop extends Component {

  constructor(props) {

    super(props);

    this.state = {
      shops: []
    };

    var paths = window.location.href.split('/')

    var picId = paths[paths.length - 1];

    picService.get({
      _id: picId
    })

      .subscribe((getPicInfoResponse) => {

        this.setState({
          shops: [getPicInfoResponse[0]]
        })

      })

  }

  html2Canvax(element) {
    return Rx.Observable.create(function(observer) {

      window.html2canvas(element, {
        onrendered: function(canvas) {

          observer.next(canvas);
          observer.complete();

        }

      });

    });
  }

  canvaToBlob(canvas) {

    return Rx.Observable.create(function(observer) {
      canvas.toBlob(function(blob) {
        observer.next(blob);
        observer.complete();
      });


    });
  }

  placeBlobOnFormWithUser(blob) {

    var fd = new FormData();

    return userService.get({
      _id: 1
    })

      .map((getUserResponse) => {

        fd.append('file', blob);

        fd.append('selectorId', getUserResponse._id);

        fd.append('userId', this.state.shops[0].metadata.userId);

        fd.append('originPicId', this.state.shops[0]._id);

        return fd

      })

  }

  makeSelection() {

    this.html2Canvax(document.getElementById('viewToCopy'))

      .switchMap((canvas) => {

        return this.canvaToBlob(canvas)

      })

      .switchMap((blob) => {

        return this.placeBlobOnFormWithUser(blob)

      })

      .map((fd) => {

        fd.append('mode', 'itemPic');

        return fd

      })

      .switchMap((fd) => {

        return picService.post(fd)

      })

      .subscribe((postPicResponse) => {

        alert("order posted")

      })

  }

  render() {

    return (

      <div className="wholeView flex-col">
        <div className="showView">
          <div className='row flex-row-center-vert' style={ { backgroundColor: 'white', position: 'relative', zIndex: '5', height: '10%' } }>
            <div className='col-sm-4'>
              <button onClick={ (event) => {
                                
                                  this.makeSelection()
                                
                                } } className='btn btn-success'>
                make selection
              </button>
            </div>
            <div className='col-sm-4'>
              <h2>View shop</h2>
            </div>
          </div>
          <div id="viewToCopy" className='resize-container' style={ { overflow: 'scroll', backgroundColor: 'white', position: 'relative', zIndex: '5', height: '90%' } }>
            <div className="resize-drag">
            </div>
            { this.state.shops.map((picData, i) => (<img key={ i } style={ { width: '100%' } } src={ `${urlService.pic}/${picData._id}` } />)) }
          </div>
        </div>
      </div>

      );
  }

  componentDidMount() {

    function dragMoveListener(event) {
      var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      // translate the element
      target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

      // update the posiion attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }

    // this is used later in the resizing and gesture demos
    window.dragMoveListener = dragMoveListener;

    interact('.resize-drag')

      .draggable({
        onmove: window.dragMoveListener
      })

      .resizable({
        preserveAspectRatio: true,
        edges: {
          left: true,
          right: true,
          bottom: true,
          top: true
        }
      })

      .on('resizemove', function(event) {
        var target = event.target,
          x = (parseFloat(target.getAttribute('data-x')) || 0),
          y = (parseFloat(target.getAttribute('data-y')) || 0);

        // update the element's style
        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      //target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);
      });

  }

}

export default ViewShop;