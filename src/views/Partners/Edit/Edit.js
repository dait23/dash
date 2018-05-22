import React, { Component } from 'react';
import {

  Input,

} from "reactstrap";
import {withRouter, Link } from 'react-router-dom'
import request from 'superagent';
import slugify from 'slugify';
import ReactQuill from "react-quill";
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import Select from 'react-select-plus';
import { Multiselect } from 'react-widgets'
import 'react-widgets/dist/css/react-widgets.css';
import 'react-select-plus/dist/react-select-plus.css';

import {Cloudinary_Code, Cloudinary_Link, Cloudinary_Name, MainApi} from '../../../views/Api/';
import Dropzone from 'react-dropzone'


import { ToastContainer, toast} from 'react-toastify';

const CLOUDINARY_UPLOAD_PRESET = Cloudinary_Code;
const CLOUDINARY_UPLOAD_URL = Cloudinary_Link;


const renderSuggestion = ({ formattedSuggestion }) => (
  <div className="Demo__suggestion-item">
    <i className="fa fa-map-marker Demo__suggestion-icon" />
    <strong>{formattedSuggestion.mainText}</strong>{' '}
    <small className="text-muted">{formattedSuggestion.secondaryText}</small>
  </div>
)

const renderFooter = () => (
  <div className="Demo__dropdown-footer">
    <div>
      
    </div>
  </div>
)

const cssClasses = {
  root: 'form-group',
  input: 'Demo__search-input',
  autocompleteContainer: 'Demo__autocomplete-container',
}

const shouldFetchSuggestions = ({ value }) => value.length > 2

const onError = (status, clearSuggestions) => {
  console.log(
    'Error happened while fetching suggestions from Google Maps API',
    status
  )
  clearSuggestions()
}

class EditPartners extends Component {

  static propTypes = {
    router: PropTypes.object
  }

   constructor(props) {
        super(props)
        this.state = {

        address: '',
        geocodeResults: null,
        loading: false,
        name: '',
        uId:'',
        slug:'',
        picName: '',
        picPhone: '',
        ownerName: '',
        ownerPhone: '',
        avgVisitor: '',
        avgSpending: '',
        lat: '',
        lng: '',
        peakHour: '',
        categoryId: '',
        userId: localStorage.getItem('uid'),
        areaId: '',
        visitors:[],
        status:'',
        nearby: '',
        workingHour:'',
        facebook: '',
        daysx:[],
        instagram: '',
        website: '',
        imageUrl:'',
        imageId:'',
        selectedOption: '',
        uploadedFile: null
        } 

         //this.handleChange = this.handleChange.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleSelectChangeDay = this.handleSelectChangeDay.bind(this)
         this.handleSelectChangeEvent = this.handleSelectChangeEvent.bind(this)
        this.handleSelectChangeCollab = this.handleSelectChangeCollab.bind(this)
        this.handleChangex = this.handleChangex.bind(this)
        this.handleChangez = this.handleChangez.bind(this)
        this.handleChangeVit = this.handleChangeVit.bind(this)
        //this.handleChangeRe = this.handleChangeRe.bind(this)
         this.handleChangeInc = this.handleChangeInc.bind(this)
        this.handleChangeExc = this.handleChangeExc.bind(this)
         this.handleChangeSec = this.handleChangeSec.bind(this)

        this.handleSelect = this.handleSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)

      }
 ////////////////////////////

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                     .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                     .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        console.log(response.body);
        this.setState({
           imageUrl: response.body.secure_url,
           imageId: response.body.public_id
        });
      }
    });
  }
  //////////////////
  handleSelectChangeDay (value) {

    const map1 = value.map(x => x.id);
    this.setState({ daysIds: map1 });


     console.log('You\'ve selectedxx:', map1);
  }


 handleSelect(address) {
    this.setState({
      address,
      loading: true,
    })

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('Geocode Success', { lat, lng })
        this.setState({
          geocodeResults: this.renderGeocodeSuccess(lat, lng),
          loading: false,
          lat: lat,
          lng: lng
        })
        console.log(this.geocodeResults)
      })
      .catch(error => {
        console.log('Geocode Error', error)
        this.setState({
          geocodeResults: this.renderGeocodeFailure(error),
          loading: false,
        })
      })
  }

  handleChange(address) {
    this.setState({
      address,
      geocodeResults: null,
    })
  }


   componentDidMount() {
      var that = this;
      that.getData();
        
    }

  ///////////////////////


  getData(){
     var that = this;
     that.setState({
          loading: true
      });
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            query Partner($id: ID!) {
              Partner(id: $id){
              id
              uId
              name
              slug
              address
              avgVisitor
              avgSpending
              nearby
              peakHour
              imageId
              imageUrl
              status
              picName
              picPhone
              ownerName
              ownerPhone
              remarks
              inclusions{
                id
                name
               }
              exclusions{
                id
                name
               }
               days{
                id
                name
              }
              website
              status
              workingHour
              facebook
              instagram
              user{
                id
              }
              area{
                id
                name
              }
              visitors{
                id
                name
              }
              facilities{
                id
                name
              }
              category{
                id
                name
              }
              types{
                id
                name
              }
             collabs{
              id
              name
            }
            segments{
              id
              name
            }
              
              }
            }
          `
          var queryVars = {
            id: this.props.match.params.id
          }
          var opts = {
            // custom fetch options
          }


          fetch(query, queryVars, opts).then(function (results) {
            if (results.errors) {
              //...
              return
            }
            //var BlogCategory = results.data.BlogCategory

            that.setState({
              data : results.data.Partner,
              id:results.data.Partner.id,
              uId:results.data.Partner.uId,
              name:results.data.Partner.name,
              slug:results.data.Partner.slug,
              address:results.data.Partner.address,
              lat:results.data.Partner.lat,
              lng:results.data.Partner.lng,
              status:results.data.Partner.status,
              avgVisitor:results.data.Partner.avgVisitor,
              avgSpending:results.data.Partner.avgSpending,
              nearby:results.data.Partner.nearby,
              peakHour:results.data.Partner.peakHour,
              imageUrl:results.data.Partner.imageUrl,
              imageId:results.data.Partner.imageId,
              picName:results.data.Partner.picName,
              picPhone:results.data.Partner.picPhone,
              ownerName:results.data.Partner.ownerName,
              remarks:results.data.Partner.remarks,
              ownerPhone:results.data.Partner.ownerPhone,
              inclusions:results.data.Partner.inclusions,
              exclusions:results.data.Partner.exclusions,
               website:results.data.Partner.website,
              status:results.data.Partner.status,
              userId:results.data.Partner.user.id,
              workingHour:results.data.Partner.workingHour,
              facebook:results.data.Partner.facebook,
              instagram:results.data.Partner.instagram,
              areaId:results.data.Partner.area.id,
              visitorsIds:results.data.Partner.visitors.id,
              visitors:results.data.Partner.visitors,
              facilitiesIds:results.data.Partner.facilities.id,
              facilities:results.data.Partner.facilities,
              segments:results.data.Partner.segments,
              categoryId:results.data.Partner.category.id,
              typesIds:results.data.Partner.types.id,
              types:results.data.Partner.types,
              collabsIds:results.data.Partner.collabs.id,
              collabs:results.data.Partner.collabs,
              days:results.data.Partner.days,
              loading:false
             });
            
             //console.log(that.state.inclusions);
           
          })
       
  }

handleChangeInc (value) {

      const map1 = value.map(x => x.id);

      this.setState({ inclusionsIds: map1 });


       console.log('Inclusions:', map1);
    }

    handleChangeSec (value) {

      const map1 = value.map(x => x.id);

      this.setState({ segmentsIds: map1 });


       console.log('Segment:', map1);
    }

    /////////////////

     handleChangeExc (value) {

      const map1 = value.map(x => x.id);

      this.setState({ exclusionsIds: map1 });


       console.log('exclusions:', map1);
    }
   
    
    handleSelectChange (value) {

    const map1 = value.map(x => x.id);
    this.setState({ facilitiesIds: map1 });


     console.log('You\'ve selectedxx:', map1);
  }

  /////////////////////////////////////////


    handleSelectChangeEvent (value) {

    const map1 = value.map(x => x.id);

    this.setState({ typesIds: map1 });


     console.log('You\'ve selected type:', map1);
  }

      //////////


    handleSelectChangeCollab (value) {

    const map1 = value.map(x => x.id);

    this.setState({ collabsIds: map1 });


     console.log('You\'ve selected collab:', map1);
  }

      //////////
       handleChangex = (categoryId) => {
        this.setState({ categoryId : categoryId.value});
        console.log(`category: ${categoryId.value}`);
      }

  
       handleChangez = (areaId) => {
        this.setState({ 
          areaId:areaId.value
        });
        console.log(`area: ${areaId.value}`);
      }

     handleChangeVit (value) {

    const map1 = value.map(x => x.id);

    this.setState({ visitorsIds: map1 });


     console.log('Visitor:', map1);
  }
 ///////////////////////

renderGeocodeFailure(err) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Error!</strong> {err}
      </div>
    )
  }

  renderGeocodeSuccess(lat, lng) {
    return (
      <div className="alert alert-success" role="alert">
        <strong>Success!</strong> Geocoder found latitude and longitude:{' '}
        <strong>
          {lat}, {lng}
        </strong>
      </div>
    )
  }


  renderInc(){

      const inList = this.state.inclusions || []

     if (this.props.IncQuery.loading) {
      return (<div></div>)

       }
      
      return(


        <Multiselect
                       onChange={this.handleChangeInc}
                         data={this.props.IncQuery.allInclusions.map((inclusionx) => (
                           
                           {id: inclusionx.id, name: inclusionx.name}

                         
                          ))}
                        valueField='id'
                        textField='name'
                        placeholder="Select Inclusion Partner"
                        defaultValue={inList.map((inclusion) => (
                           
                           {id: inclusion.id, name: inclusion.name}

                         
                          ))}
                    
                      />


      )

  }


  renderCat(){




     if (this.props.CatQuery.loading) {
      return (<div></div>)

       }
       
       return(

               
               <Select
                        name="categoryId"
                        placeholder="Select Category"
                        value={this.state.categoryId}
                        onChange={this.handleChangex}
                        options={this.props.CatQuery.allPartnerCategories.map((category) => (
                           
                           {value: category.id, label: category.name}


                          ))}
                      />


       )

  }



renderArea(){




     if (this.props.AreaQuery.loading) {
      return (<div></div>)

       }
       
       return(

               
               <Select
                        name="areaId"
                        placeholder="Select Area / regional"
                        value={this.state.areaId}
                        onChange={this.handleChangez}
                        options={this.props.AreaQuery.allAreas.map((area) => (
                           
                           {value: area.id, label: area.name}


                          ))}
                      />


       )

  }




  renderEx(){

      const exList = this.state.exclusions || []

     if (this.props.ExQuery.loading) {
      return (<div></div>)

       }
      
      return(


       <Multiselect
                       onChange={this.handleChangeExc}
                        data={this.props.ExQuery.allExclusions.map((exclusion) => (
                           
                           {id: exclusion.id, name: exclusion.name}

                         
                          ))}
                        valueField='id'
                        textField='name'
                        placeholder="Select Exclusion Partner"
                       defaultValue={exList.map((exclusionx) => (
                           
                           {id: exclusionx.id, name: exclusionx.name}

                         
                          ))}
                      />


      )

  }

  renderSegment(){

      const secList = this.state.segments || []

     if (this.props.SecQuery.loading) {
      return (<div></div>)

       }
      
      return(


       <Multiselect
                       onChange={this.handleChangeSec}
                        data={this.props.SecQuery.allSegments.map((segmentx) => (
                           
                           {id: segmentx.id, name: segmentx.name}

                         
                          ))}
                        valueField='id'
                        textField='name'
                        placeholder="Select Segment Market"
                       defaultValue={secList.map((segment) => (
                           
                           {id: segment.id, name: segment.name}

                         
                          ))}
                      />


      )

  }


  renderVisit(){

      const viList = this.state.visitors || []

     if (this.props.ViQuery.loading) {
      return (<div></div>)

       }

      
      
      return(


       <Multiselect
                       onChange={this.handleChangeVit}
                        data={this.props.ViQuery.allVisitorTypes.map((visitorx) => (
                           
                           {id: visitorx.id, name: visitorx.name}

                         
                          ))}
                        valueField='id'
                        textField='name'
                        placeholder="Select Visitor Type"
                        defaultValue={viList.map((visitorx) => (
                           
                           {id: visitorx.id, name: visitorx.name}

                         
                          ))}
                      />


      )

  }

  renderFaciliti(){

      const faList = this.state.facilities || []

     if (this.props.FaQuery.loading) {
      return (<div></div>)

       }


      
      return(


      
                      <Multiselect
                       onChange={this.handleSelectChange}
                        data={this.props.FaQuery.allFacilities.map((facilityx) => (
                           
                           {id: facilityx.id, name: facilityx.name}

                         
                          ))}
                        valueField='id'
                        textField='name'
                        placeholder="Select Facility"
                        defaultValue={faList.map((facility) => (
                           
                           {id: facility.id, name: facility.name}

                         
                          ))}
                      />


      )

  }


  renderType(){

      const tyList = this.state.types || []

     if (this.props.TyQuery.loading) {
      return (<div></div>)

       }

      
      return(
             <Multiselect
                       onChange={this.handleSelectChangeEvent}
                        data={this.props.TyQuery.allEventTypes.map((eventx) => (
                           
                           {id: eventx.id, name: eventx.name}

                         
                          ))}
                        valueField='id'
                        textField='name'
                        placeholder="Select Event Types"
                        defaultValue={tyList.map((event) => (
                           
                           {id: event.id, name: event.name}

                         
                          ))}
                      />


      )

  }


  renderCo(){

      const coList = this.state.collabs || []

     if (this.props.CoQuery.loading) {
      return (<div></div>)

       }

      
      return(
             <Multiselect
                       onChange={this.handleSelectChangeCollab}
                        data={this.props.CoQuery.allCollabs.map((collabx) => (
                           
                           {id: collabx.id, name: collabx.name}

                         
                          ))}
                        valueField='id'
                        textField='name'
                        placeholder="Select Event Collabs"
                        defaultValue={coList.map((collab) => (
                           
                           {id: collab.id, name: collab.name}

                         
                          ))}
                      />


      )

  }


  renderDay(){

      const dayList = this.state.days || []

     if (this.props.DayQuery.loading) {
      return (<div></div>)

       }

      
      return(
             <Multiselect
                       onChange={this.handleSelectChangeDay}
                        data={this.props.DayQuery.allDays.map((dayx) => (
                           
                           {id: dayx.id, name: dayx.name}

                         
                          ))}
                        valueField='id'
                        textField='name'
                        placeholder="Select Busy Day"
                         defaultValue={dayList.map((day) => (
                           
                           {id: day.id, name: day.name}

                         
                          ))}
                      />


      )

  }




 

   render(){



      var sluger =  slugify(this.state.name , {
                replacement: '-',    // replace spaces with replacement
                remove: /[$*_+~.()'"!\-:@,]/g,        // regex to remove characters
                lower: true          // result in lower case
              })

         const inputProps = {
      type: 'text',
      value: this.state.address,
      onChange: this.handleChange,
      onBlur: () => {
        //console.log('Blur event!')
      },
      onFocus: () => {
        //console.log('Focused!')
      },
      autoFocus: true,
      placeholder: 'Address',
      name: 'Demo__input',
      id: 'my-input-id',
    }

     

     if (this.state.loading) {
      return (<div></div>)

       }
      
       




       return(
         
           <div className="animated fadeIn">
             <ToastContainer autoClose={2000} />
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <strong>Edit</strong> 
                    </div>
                    <div className="card-block">
                      
                       <form  className="form-horizontal">
                   <div className="row">
                   <div className="col-md-6">
                    <div className="form-group row" style={{display:'none'}}>
                    <label className="col-md-3 form-control-label" htmlFor="text-input"></label>
                    <div className="col-md-9">
                      <input type="hidden" id="slug" value={sluger} name="slug" className="form-control" placeholder="Slug"
                      />
                     
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Partner ID</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.uId} name="uId" className="form-control" placeholder="partner ID"
                      onChange={(e) => this.setState({uId: e.target.value})}

                      />
                    </div>
                  </div>
                           
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Partner Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.name} name="name" className="form-control" placeholder="partner name"
                      onChange={(e) => this.setState({name: e.target.value})}
                       onKeyUp={(e) => this.setState({slug: document.getElementById("slug").value})}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Pic Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.picName} name="picName" className="form-control" placeholder="pic name"
                      onChange={(e) => this.setState({picName: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Pic Phone</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.picPhone} name="picPhone" className="form-control" placeholder="pic Phone"
                      onChange={(e) => this.setState({picPhone: e.target.value})}
                      />
                    </div>
                  </div>
                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Owner Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.ownerName} name="ownerName" className="form-control" placeholder="owner name"
                      onChange={(e) => this.setState({ownerName: e.target.value})}
                      />
                    </div>
                  </div>
                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Owner Phone</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.ownerPhone} name="ownerPhone" className="form-control" placeholder="owner Phone"
                      onChange={(e) => this.setState({ownerPhone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Average Visitor</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.avgVisitor} name="avgVisitor" className="form-control" placeholder="average visitor"
                      onChange={(e) => this.setState({avgVisitor: e.target.value})}
                      />
                    </div>
                  </div>

                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Segment Market</label>
                    <div className="col-md-9">
                       {this.renderSegment()}
                      
                    </div>
                  </div>

                   
                  
                    <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">NearBy</label>
                    <div className="col-md-9">
                        <textarea className="form-control" rows="5" value={this.state.nearby} name="nearby"
                         onChange={(e) => this.setState({nearby: e.target.value})}></textarea>
                    
                    </div>
                  </div>


                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Inclusions</label>
                    <div className="col-md-9">
                    {this.renderInc()}
                     
                    </div>
                    
                  </div>
              

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Exclusion</label>
                    <div className="col-md-9">
                      {this.renderEx()}
                     
                    </div>
                  </div>
                    <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="file-input">Image Thumb</label>
                    <div className="col-md-9">
                      
                    <Dropzone
                        onDrop={this.onImageDrop.bind(this)}
                        multiple={false}
                        accept="image/*">
                        <div>Drop an image or click to select a file to upload.</div>
                      </Dropzone>
                       {this.state.imageUrl === '' ? null :
                      
                        <img src={this.state.imageUrl}  alt="avatar" width="200"/>
                      }
          
                    </div>
                  </div>
              
                   </div>
                   <div className="col-md-6">
   

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Category</label>
                    <div className="col-md-9">
                      {this.renderCat()}
                       
                    </div>
                  </div>
                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Address</label>
                    <div className="col-md-9">
                      <PlacesAutocomplete
                        renderSuggestion={renderSuggestion}
                        renderFooter={renderFooter}
                        inputProps={inputProps}
                        classNames={cssClasses}
                        onSelect={this.handleSelect}
                        onEnterKeyDown={this.handleSelect}
                        onError={onError}
                        shouldFetchSuggestions={shouldFetchSuggestions}
                      />
                      {this.state.loading && (
          <div>
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" />
          </div>
        )}
        {this.state.geocodeResults && (
           <div>
           <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Latitude</label>
                    <div className="col-md-9">
                      <input disabled type="text" id="text-input" value={this.state.lat} name="lat" className="form-control" placeholder="average spendding"
                      onChange={(e) => this.setState({lat: e.target.value})}
                      />
                    </div>
                  </div>

                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Longitude</label>
                    <div className="col-md-9">
                      <input  disabled type="text" id="text-input" value={this.state.lng} name="lng" className="form-control" placeholder="average spendding"
                      onChange={(e) => this.setState({lng: e.target.value})}
                      />
                    </div>
                  </div>
                 </div>
        )}
                    </div>
                  </div>


                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Area / Regional</label>
                    <div className="col-md-9">
                      
                    {this.renderArea()}
                      
                    </div>
                  </div>
                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Visitor Type</label>
                    <div className="col-md-9">
                         
                     {this.renderVisit()}
                      
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Facility</label>
                    <div className="col-md-9">
                      
                      {this.renderFaciliti()}
                      
                    </div>
                  </div>

                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Event Type</label>
                    <div className="col-md-9">
                      {this.renderType()}
                      
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Event Collabs</label>
                    <div className="col-md-9">
                      
                     {this.renderCo()}
                      
                    </div>
                  </div>
                    <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Busy Day</label>
                    <div className="col-md-9">

                    {this.renderDay()}
                                          
                                        </div>
                  </div>
    
                     <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Website</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.website} name="website" className="form-control" placeholder="http://www.example.com"
                      onChange={(e) => this.setState({website: e.target.value})}
                      />
                    </div>
                  </div>
                   
                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Facebook</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.facebook} name="facebook" className="form-control" placeholder="https://facebook.com/"
                      onChange={(e) => this.setState({facebook: e.target.value})}
                      />
                    </div>
                  </div>
                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Instagram</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.instagram} name="instagram" className="form-control" placeholder="https://instagram.com/"
                      onChange={(e) => this.setState({instagram: e.target.value})}
                      />
                    </div>
                  </div>
                
               <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Remarks</label>
                    <div className="col-md-9">
                        <textarea className="form-control" rows="5" value={this.state.remarks} name="remarks"
                         onChange={(e) => this.setState({remarks: e.target.value})}></textarea>
                    
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Status</label>
                    <div className="col-md-9">
                      <Input type="select" name="status"  value={this.state.status} size="sm"  onChange={(e) => this.setState({status: e.target.value})}>
                        <option >Please select</option>
                        <option value="0">Draft</option>
                        <option value="1">Publish</option>
                        <option value="2">Pending</option>
                        <option value="3">Expired</option>
                      </Input>
                       
                    </div>
                  </div>
                 
                  

                   </div>
                </div>
                 
              
      
                  
                </form>

                    </div>
                     <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.handleUpdate}><i className="fa fa-dot-circle-o"></i> Save</button>
                
                <Link to={'/partners/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
                   </div>
                  </div>
                </div>







          </div>


        )


   }


    handleUpdate = async () => {
  
      if (localStorage.getItem('uid') == null) {
        console.warn('only logged in users can create new posts')
        toast('only logged in users can create new posts', { type: toast.TYPE.ERROR, autoClose: 2000 })
        return
      }


       
      const userId = localStorage.getItem('uid');
      const { id, name, slug, areaId, categoryId, address, picName, picPhone, nearby, website, facebook, facilities, instagram,  avgVisitor, visitorsIds, facilitiesIds, lat, lng, collabsIds, typesIds, workingHour, inclusionsIds, exclusionsIds, ownerName, ownerPhone, remarks, daysIds, uId, segmentsIds, imageId, imageUrl, status } = this.state
    
      await this.props.updatePartnersMutation({variables: { 
        id, name, slug, areaId, categoryId, address, picName, picPhone, nearby, website, facebook, facilities, instagram, avgVisitor, userId, visitorsIds, facilitiesIds, lat, lng, collabsIds, typesIds, workingHour, inclusionsIds, exclusionsIds, ownerName, ownerPhone, remarks, daysIds, uId, segmentsIds, imageId, imageUrl,  status: parseInt(this.state.status, 10) }})
       toast('Update Success', { type: toast.TYPE.SUCCESS, autoClose: 2000 }, setTimeout("location.href = '/partners/all';", 2000))
  }




}

const SecQuery = gql`query allSegments {
  allSegments(orderBy:name_ASC) {
    id
    name
  }
}`


const ExQuery = gql`query allExclusions {
  allExclusions(orderBy:name_ASC) {
    id
    name
  }
}`

const IncQuery = gql`query allInclusions {
  allInclusions(orderBy:name_ASC) {
    id
    name
  }
}`

const CatQuery = gql`query allPartnerCategories {
  allPartnerCategories(orderBy:name_ASC) {
    id
    name
  }
}`

const AreaQuery = gql`query allAreas {
  allAreas(orderBy:name_ASC) {
    id
    name
  }
}`

const ViQuery = gql`query allVisitors {
  allVisitorTypes(orderBy:name_ASC) {
    id
    name
  }
}`

const FaQuery = gql`query allFacilities {
  allFacilities(orderBy:name_ASC) {
    id
    name
  }
}`


const TyQuery = gql`query allEventTypes {
  allEventTypes(orderBy:name_ASC) {
    id
    name
  }
}`


const CoQuery = gql`query allCollabs {
  allCollabs(orderBy:name_ASC) {
    id
    name
  }
}`



const DayQuery = gql`query allDays {
  allDays(orderBy:name_ASC) {
    id
    name
  }
}`



const UPDATE_PARTNERS_MUTATION = gql`
  mutation updatePartnersMutation (
      $id: ID!,
      $name: String,
      $uId: String,
      $slug: String,
      $address: String,
      $picName: String,
      $picPhone: String,
      $avgVisitor: String,
      $nearby: String,
      $website: String,
      $facebook: String,
      $instagram: String,
      $areaId: ID,
      $categoryId: ID,
      $userId:ID,
      $facilitiesIds: [ID!],
      $visitorsIds: [ID!],
      $lat: Float,
      $lng: Float,
      $collabsIds: [ID!], 
      $typesIds: [ID!],
      $workingHour: String,
      $exclusionsIds: [ID!],
      $inclusionsIds: [ID!],
      $ownerName: String,
      $ownerPhone: String,
      $remarks: String,
      $daysIds: [ID!],
      $segmentsIds:[ID!],
      $imageUrl: String,
      $imageId: String,
      $status: Int
  ) {
    updatePartner(
        id: $id,
        name: $name,
        uId:$uId,
        slug: $slug, 
        areaId: $areaId, 
        categoryId: $categoryId,
        address:$address,
        picName: $picName,
        picPhone: $picPhone,
        avgVisitor: $avgVisitor,
        nearby: $nearby,
        website: $website,
        facebook: $facebook,
        instagram: $instagram,
        inclusionsIds: $inclusionsIds,
        exclusionsIds: $exclusionsIds,
        userId: $userId
        visitorsIds: $visitorsIds,
        facilitiesIds:  $facilitiesIds,
        lat: $lat,
        lng: $lng,
        collabsIds: $collabsIds, 
        typesIds: $typesIds,
        workingHour: $workingHour,
        ownerName: $ownerName,
        ownerPhone: $ownerPhone,
        remarks: $remarks,
        daysIds: $daysIds,
        segmentsIds: $segmentsIds,
         imageUrl: $imageUrl,
        imageId: $imageId,
        status: $status

    ) {
      id
    }
  }
`





export default compose(
  graphql(ExQuery, { name: 'ExQuery' }),
   graphql(SecQuery, { name: 'SecQuery' }),
  graphql(IncQuery, { name: 'IncQuery' }),
  graphql(CatQuery, { name: 'CatQuery' }),
  graphql(AreaQuery, { name: 'AreaQuery' }),
  graphql(ViQuery, { name: 'ViQuery' }),
   graphql(FaQuery, { name: 'FaQuery' }),
   graphql(TyQuery, { name: 'TyQuery' }),
   graphql(CoQuery, { name: 'CoQuery' }),
   graphql(DayQuery, { name: 'DayQuery' }),
  graphql(UPDATE_PARTNERS_MUTATION, { name: 'updatePartnersMutation' }),
)(withRouter(EditPartners))
