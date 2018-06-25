import React, { Component } from 'react';

import { connect } from 'react-redux'

import userService from '../../Services/userService.js'

import { Route, Link } from 'react-router-dom'

import urlService from '../../Services/urlService.js'

import BusinessService from '../../Services/businessService.js';
import ImageUploader from 'react-images-upload';


import ParnterInfoArea from './PartnerInfoArea'
import ParnterInfoInput from './PartnerInfoInput'

import { Topbar } from '../TopBar.js'


import { getQueryParams, getPathVariables } from '../../Utils'
import * as partnerActions from './actions'

var {getPartner, putPartner} = partnerActions

class PartnerMarketingPage extends Component {

  constructor(props) {
    var queryParams = getQueryParams()

    super(props);

    this.state = {

      queryParams,
      bannerPreviewData: null

    };

  }

  componentDidMount() {

    if (this.state.queryParams && this.state.queryParams.id) {

      this.props.getPartner({
        query: {
          _id: this.state.queryParams.id
        }
      })
    }
  }

  updateCurrentPartnerState(update, key) {

    var partner = {
      ...this.props.partner,
      ...this.state.partner
    }

    partner[key] = update;

    this.setState({
      partner
    })

  }

  updatePartner() {

    var partner = {
      ...this.props.partner,
      ...this.state.partner
    }

    this.props.putPartner({

      body: partner

    })
  }

  updateBannerImage = (dataURL) => {
    if (this.props.partner && this.props.partner._id) {
      var blobBin = atob(this.state.bannerPreviewData.split(',')[1]);
      var array = [];
      for (var i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
      }
      var file = new Blob([new Uint8Array(array)], {
        type: 'image/png'
      });
      var formdata = new FormData();
      formdata.append("image", file);
      formdata.append("partnerId", this.props.partner._id);
      console.log('this.props.partner._idthis.props.partner._idthis.props.partner._id ', this.props.partner._id)

      BusinessService

        .updateBanner(formdata)

        .subscribe((postBusinessStream) => {

          console.log('updateBanner ', postBusinessStream)

          alert('banner updated !')
          window.location.reload(true);

          this.clearPreviewImage()

        })
    }
  }

  clearPreviewImage = (imageData) => {

    this.setState({
      bannerPreviewData: null
    })

  }

  setBannerPreview = (imageData) => {

    console.log("imageData", imageData)
    if (this.props.partner && this.props.partner._id) {

      this.setState({
        bannerPreviewData: imageData
      })
    }
  }

  onDrop = (pictures) => {
    console.log("on drop ", pictures)

    var self = this;

    var canvas,
      context,
      canvas = document.createElement("canvas");
    context = canvas.getContext('2d');

    var reader = new FileReader();

    reader.addEventListener("loadend", function(arg) {
      var src_image = new Image();
      src_image.onload = function() {
        canvas.height = src_image.height;
        canvas.width = src_image.width;
        context.drawImage(src_image, 0, 0);
        var imageData = canvas.toDataURL("image/png");

        self.setBannerPreview(imageData)

        // uploadCanvas(imageData);

      }
      src_image.src = this.result;
    });

    reader.readAsDataURL(pictures[pictures.length - 1]);

  }

  render() {

    var partner = this.state.partner || this.props.partner

    return (

      <div className="wholeView flex-col">
        <div className="showView d-flex flex-column">
          <br />
          <Topbar title={ 'Partner Marketing' } />
          <br />
          <div className='flex-1 scroll-y container text-left'>
            <div className='row'>
              <div className='col-md-6'>
                { partner._id
                  && <ImageUploader withIcon={ true } buttonText='Upload Banner' onChange={ this.onDrop } imgExtension={ ['.jpg', '.gif', '.png', '.gif'] } maxFileSize={ 5242880 }
                     /> }
              </div>
              <div className='col-md-6'>
                { partner
                  
                  && (partner.bannerImgId || this.state.bannerPreviewData)
                  && <div className="row">
                       <div className='col-sm-12'>
                         <img className='w-100' style={ { height: 200 } } src={ this.state.bannerPreviewData || `${urlService.pic}/${partner.bannerImgId}` } />
                         <br/>
                         <br/>
                         <div className='d-flex justify-content-around w-100'>
                           <button onClick={ (event) => {
                                             
                                               this.clearPreviewImage()
                                             
                                             } } className='btn btn-primary'>
                             Clear
                           </button>
                           <button onClick={ (event) => {
                                             
                                               this.updateBannerImage()
                                             
                                             } } className='btn btn-primary'>
                             Save Banner Update
                           </button>
                         </div>
                       </div>
                     </div> }
              </div>
            </div>
            <br/>
            <div className='row'>
              <div className='col-md-6 Brandon_bld'>
                WorkChew Hours:
              </div>
              <div className='col-md-6'>
                <ParnterInfoArea onChange={ (event) => this.updateCurrentPartnerState(event.target.value, 'hours') } value={ partner.hours } />
              </div>
            </div>
            <br/>
            <div className='row Brandon_bld'>
              <div className='col-md-6'>
                # of Allotted Seats:
              </div>
              <div className='col-md-6'>
                <ParnterInfoInput onChange={ (event) => this.updateCurrentPartnerState(event.target.value, 'seats') } value={ partner.seats } />
              </div>
            </div>
            <br/>
            <div className='row Brandon_bld'>
              <div className='col-md-6'>
                Additional Specials:
              </div>
              <div className='col-md-6'>
                <ParnterInfoArea onChange={ (event) => this.updateCurrentPartnerState(event.target.value, 'specials') } value={ partner.specials } />
              </div>
            </div>
            <br />
            <div className='row Brandon_bld'>
              <div className='col-md-6'>
                Events
              </div>
              <div className='col-md-6'>
                <ParnterInfoArea onChange={ (event) => this.updateCurrentPartnerState(event.target.value, 'events') } value={ partner.events } />
              </div>
            </div>
            <br/>
            <div className='row Brandon_bld'>
              <div className='col-md-6'>
                Discounts
              </div>
              <div className='col-md-6'>
                <ParnterInfoArea onChange={ (event) => this.updateCurrentPartnerState(event.target.value, 'discounts') } value={ partner.discounts } />
              </div>
            </div>
            <br/>
            <br />
            <div className='d-flex justify-content-center'>
              <button onClick={ (event) => this.updatePartner() } className="btn btn-primary Brandon_bld" type="button" aria-expanded="false">
                SAVE
              </button>
            </div>
            <br/>
            <br />
          </div>
        </div>
      </div>

      );
  }

}

const mapStateToProps = (state, ownProps) => ({
  partner: state.partners.current
})

const PartnerMarketingPageComponent = connect(mapStateToProps, {
  getPartner,
  putPartner
})(PartnerMarketingPage)

export default PartnerMarketingPageComponent;