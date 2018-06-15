import React, { Component } from 'react';
import BusinessService from '../../Services/businessService.js';

import { Route, Link } from 'react-router-dom'

import urlService from '../../Services/urlService.js'
import restService from '../../Services/restService.js'
import ImageUploader from 'react-images-upload';

import _ from 'lodash'

import { Subject } from 'rxjs'

var updateSubject = new Subject()
class BusinessForm extends Component {


  constructor(props) {

    super(props);

    this.state = {
      business: {

        seats: []
      }
    };

  }

  componentDidMount() {

    var params = this.getQueryParams() || {};

    if (params.id) {

      this.setBusiness(params.id)

    }

    console.log('this.props', this.props)

    BusinessService.subject

      .filter((businessStream) => businessStream.mapUpdate)

      .subscribe((addBusinessStream) => {

        console.log('addBusinessStream', addBusinessStream)
        console.log('staet business', this.state.business)

        var business = _.extend(this.state.business, addBusinessStream.business)

        var businessWithList = this.mapListDataToBusiness(business)

        console.log('addBusinessStream business', business)

        this.setStateBusiness(business)

      })



  }

  listenFor(keyName) {

    console.log(keyName, `${keyName}Update`)

    BusinessService.subject

      .filter((businessStream) => businessStream[`${keyName}Update`])

      .filter((businessStream) => businessStream[keyName])

      .subscribe((businessStream) => {
        console.log(keyName, "on updaet")

        this.state.business[keyName] = businessStream[keyName]
        this.setState({
          business: this.state.business
        })

      })
  }

  setBusiness(id) {

    BusinessService.get({
      params: {
        _id: id
      }
    })

      .subscribe((getBusinessStream) => {

        console.log('getBusinessStream  in set business', getBusinessStream)

        var business = getBusinessStream[0]
        if (business.geoPoint && business.geoPoint.coordinates) {

          BusinessService.setGeoCoordinates(business.geoPoint.coordinates[1], business.geoPoint.coordinates[0])

        }

        this.setStateBusiness(business)

      })

  }

  firstUpperCase(word) {

    var first = word[0];
    var upper = word[0].toUpperCase();

    return word.replace(first, upper)

  }

  setStateBusiness(business) {

    this.setState({
      business
    }, () => {

      var {business} = this.state

      this.setObjectToInputsWithName(business)

      //var msg = this.buildUpdateMsg(business)

      // BusinessService.subject.next(msg)

    })
  }

  setObjectToInputsWithName(item) {
    var inputs = document.getElementsByClassName('business-text-feild')

    var fields = [...inputs]

    fields

      .forEach((inputField) => {

        inputField.value = item[inputField.name] || ""
      })
  }

  save() {
    console.log('AT SAVE')
    console.log('this.state.business', this.state.business)
    var inputs = document.getElementsByClassName('business-text-feild')

    var fields = [...inputs]

    var businessFromFeilds = {}
    var infoFields = fields

      .map(({name, value}) => {

        businessFromFeilds[name] = value
        return {
          name,
          value
        }

      })

    console.log('businessFromFeilds', businessFromFeilds)

    var spreadResult = {

      ...this.state.business,
      ...businessFromFeilds
    }

    var businessWithList = this.mapListDataToBusiness(spreadResult)

    businessWithList.geoPoint = BusinessService.getGeoCoordinates().geoPoint

    console.log(' businessWithList  ', businessWithList)

    this.saveBusiness(businessWithList)

  } //save

  saveBusiness(business) {

    if (this.state.business && this.state.business._id) {

      this.updateBusiness(business)

    } else {

      this.createBusiness(business)

    }

  }

  mapListDataToBusiness(business) {

    this.list.forEach(list => {

      business[list.keyName] = BusinessService.getlistDataByKeyName(list.keyName, business[list.keyName] || [], list.props)


    })

    return business

  }

  clearBusinessFields() {
    var inputs = document.getElementsByClassName('business-text-feild')

    var fields = [...inputs]

    fields.forEach((inputField) => {

      inputField.value = ""

    })

  }

  setFeatured(featured) {

    this.state.business.featured = featured

    this.setState({
      business: this.state.business
    },
      () => {


        console.log(this.state.business)
      }
    )

  }

  createBusiness(business) {

    BusinessService

      .post(business)

      .subscribe((postBusinessStream) => {

        console.log('postBusinessStream ', postBusinessStream)

        if (postBusinessStream.postBusinessResponse) {

          alert('business saved !')

          this.clearBusinessFields()

        }

      })
  }

  updateBusiness(business) {

    BusinessService

      .put(business)

      .subscribe((putBusinessStream) => {

        console.log('putBusinessStream ', putBusinessStream)

        alert('business saved !')

      })
  }

  getQueryParams() {

    var url = window.location.href;
    console.log('url', url)

    var queryString = url.substring(url.indexOf('?') + 1)

    if (url.indexOf('?') > -1) {

      var splits = queryString.split('&')

      var queryParams = splits

        .map(split => split.split('='))

        .map(([name, value]) => {

          return {

            [name]: value
          }

        })

        .reduce((params, splitItem) => {

          return {
            ...params,
            ...splitItem
          }

        }, {})

      console.log('queryParams', queryParams)

      return queryParams

    }

  }

  logOut() {

    localStorage.clear();

    window.location.reload(true);

  }

  updateBannerImage = (dataURL) => {

    var blobBin = atob(dataURL.split(',')[1]);
    var array = [];
    for (var i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
    }
    var file = new Blob([new Uint8Array(array)], {
      type: 'image/png'
    });
    var formdata = new FormData();
    formdata.append("image", file);


    BusinessService

      .updateBanner(formdata)

      .subscribe((postBusinessStream) => {

        console.log('updateBanner ', postBusinessStream)

        alert('banner updated !')

      })

      // $.ajax({
      //    url: "/asdfs/zlock",
      //    type: "POST",
      //    data: formdata,
      //    processData: false, // important
      //    contentType: false  // important
      // }).complete(function(response){
      //   console.log(response.status);
      // });

  }

  clearPreviewImage = (imageData) => {

    this.setState({
      bannerPreviewData: null
    })

  }
  setBannerPreview = (imageData) => {

    this.setState({
      bannerPreviewData: imageData
    })

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



    reader.readAsDataURL(pictures[0]);

  }


  render() {

    return (

      <div className='col-sm-6'>
        <div className="row">
          <div className='col-sm-2'>
            <button onClick={ (event) => {
                              
                                this.save()
                              
                              } } className='btn btn-primary'>
              Save
            </button>
          </div>
          <div className='col-sm-10'>
          </div>
        </div>
        <br/>
        { this.state.business
          && <div className="row" style={ { height: 200 } }>
               <div className='col-sm-12 h-100'>
                 <img className='w-100 h-100' src={ this.state.business.bannerImgSrc } />
               </div>
             </div> }
        <br/>
        <ImageUploader withIcon={ true } buttonText='Upload Banner' onChange={ this.onDrop } imgExtension={ ['.jpg', '.gif', '.png', '.gif'] } maxFileSize={ 5242880 }
        />
        <br/>
        { this.state.bannerPreviewData
          &&
          
          
          <div>
            <div className="row">
              <div className='col-sm-12'>
                <button onClick={ (event) => {
                                  
                                    this.clearPreviewImage()
                                  
                                  } } className='btn btn-warning'>
                  Clear
                </button>
                <button onClick={ (event) => {
                                  
                                    this.updateBannerImage()
                                  
                                  } } className='btn btn-warning'>
                  update
                </button>
              </div>
            </div>
            <br/>
            <div className="row" style={ { height: 200 } }>
              <div className='col-sm-12 h-100'>
                <img className='w-100 h-100' src={ this.state.bannerPreviewData } />
              </div>
            </div>
          </div> }
        <br />
        <br/>
        <div className="row">
          <div className='col-sm-2'>
            <span>name</span>
          </div>
          <div className='col-sm-10'>
            <input className="form-control business-text-feild" name="name" />
          </div>
          <br/>
        </div>
        <br/>
        <div className="row">
          <div className='col-sm-2'>
            <span>phone</span>
          </div>
          <div className='col-sm-10'>
            <input className="form-control business-text-feild" name="phone" />
          </div>
          <br/>
        </div>
        <br/>
        <div className="row">
          <div className='col-sm-2'>
            <span>email</span>
          </div>
          <div className='col-sm-10'>
            <input className="form-control business-text-feild" name="email" />
          </div>
          <br/>
        </div>
        <br/>
        <div className="row">
          <div className='col-sm-2'>
            <span>address</span>
          </div>
          <div className='col-sm-10'>
            <input className="form-control business-text-feild" name="address" />
          </div>
          <br/>
        </div>
        <br/>
        <div className="row">
          <div className='col-sm-2'>
            <span>wifi password</span>
          </div>
          <div className='col-sm-10'>
            <input className="form-control business-text-feild" name="wifi" />
          </div>
        </div>
        <br/>
        <div className="row">
          <div className='col-sm-2'>
            <span>Description</span>
          </div>
          <div className='col-sm-10'>
            <textarea className="form-control business-text-feild" name="description" />
          </div>
        </div>
        <br/>
        <div className="row">
          <div className='col-sm-2'>
            <span># number of sheets</span>
          </div>
          <div className='col-sm-10'>
            <input className="form-control business-text-feild" name="seats" />
          </div>
          <br/>
        </div>
        <br/>
        <div className="row">
          <div className='col-sm-2'>
            <span>Hours</span>
          </div>
          <div className='col-sm-10'>
            <textarea className="form-control business-text-feild" rows="8" name="hours" />
          </div>
          <br/>
        </div>
        <br/>
        <div className="row">
          <div className='col-sm-2'>
            <span>Specials</span>
          </div>
          <div className='col-sm-10'>
            <textarea className="form-control business-text-feild" rows="8" name="specials" />
          </div>
          <br/>
        </div>
        <br/>
        <div className="row">
          <div className='col-sm-2'>
            <span>Discounts</span>
          </div>
          <div className='col-sm-10'>
            <textarea className="form-control business-text-feild" rows="8" name="discounts" />
          </div>
          <br/>
        </div>
        <br/>
        <div className="row">
          <div className='col-sm-2'>
            <span>Events</span>
          </div>
          <div className='col-sm-10'>
            <textarea className="form-control business-text-feild" rows="8" name="events" />
          </div>
          <br/>
        </div>
        <br/>
        <br/>
        <div className="row">
          <div className='col-sm-2'>
            <button onClick={ (event) => {
                              
                                this.save()
                              
                              } } className='btn btn-primary'>
              Save
            </button>
          </div>
          <br/>
        </div>
      </div>

      );
  }

}

export default BusinessForm;