import React, { Component } from 'react';
import { Link} from 'react-router-dom'
import {MainApi, Cloudinary_Code, Cloudinary_Link} from '../../../views/Api/';
import request from 'superagent';
import slugify from 'slugify';
import ReactQuill from "react-quill";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import Select from 'react-select-plus';
import { Multiselect } from 'react-widgets'
import 'react-widgets/dist/css/react-widgets.css';
import 'react-select-plus/dist/react-select-plus.css';



//var fetch = require('graphql-fetch')('https://api.graph.cool/simple/v1/cj5nbkzhsejyd0122xngrnr17')

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
    router: PropTypes.object,
    updateSliders: PropTypes.func,
    //refresh: PropTypes.func,
  }


  constructor(props) {
    super(props)
    this.state = { 
    id: '',
     address: '',
        geocodeResults: null,
        loading: false,
        name: '',
        slug:'',
        picName: '',
        picPhone: '',
        avgVisitor: '',
        avgSpending: '',
        lat: '',
        lng: '',
        peakHour: '',
       // partnerId: 'cjdysomf1sf0h0159w4r1erz3',
        inclusions: '',
        exclusions: '',
        categoryId: '',
        userId: localStorage.getItem('uid'),
        areaId: '',
        visitorsIds: [],
        facilitiesIds: [],
         facilities: [],
        typesIds:[],
        collabsIds:[],
        collabs:[],
        types:[],
        events:[],
        collab:[],
         areas:[],
         category:[],
         visitorsx:[],
          visitors:[],
           datax:[],
           facility:[],
        nearby: '',
        workingHour:'',
        facebook: '',
        instagram: '',
        website: '',
        imageUrl:'',
        imageId:'',
        selectedOption: '',
        uploadedFile: null
    }
   


  }

   

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
 
  componentDidMount() {
    var that = this;
    that.getData();
    that.getArea();
     that.getCategory();
     that.getVisitor();
     that.getFacility();
      that.getEvent();

    that.getCollab();      
  }
  //////////////////////////////

  getArea(){
     var that = this;
      that.setState({
          loading: true
      });
     
     var fetch = require('graphql-fetch')(MainApi)
      var query = `
            query allAreas{
              allAreas (orderBy: name_DESC) {
                id
                name

              }
            }
          `
          var queryVars = {
            
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
              areas : results.data.allAreas,
              loading: false

             });
            //...
           // console.log(that.state.dataz);
          })
  }


 
  ///////////////


  //////////////////////////////

  getCategory(){
     var that = this;
      that.setState({
          loading: true
      });
     
     var fetch = require('graphql-fetch')(MainApi)
      var query = `
            query allPartnerCategories{
              allPartnerCategories  {
                id
                name

              }
            }
          `
          var queryVars = {
            
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
              category : results.data.allPartnerCategories,
              loading: false

             });
            //...

          })
  }


  //////////////////////////////

  getVisitor(){
     var that = this;
      that.setState({
          loading: true
      });
     
     var fetch = require('graphql-fetch')(MainApi)
      var query = `
            query allVisitorTypes{
              allVisitorTypes  {
                id
                name

              }
            }
          `
          var queryVars = {
            
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
              visitorsx: results.data.allVisitorTypes,
              loading: false

             });
            //...

          })
  }


   //////////////////////////////

  getFacility(){
     var that = this;
      that.setState({
          loading: true
      });
     
     var fetch = require('graphql-fetch')(MainApi)
      var query = `
            query allFacilities{
              allFacilities  {
                id
                name

              }
            }
          `
          var queryVars = {
            
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
              facility: results.data.allFacilities,
              loading: false

             });
            //...

          })
  }


 //////////////////////////////

  getEvent(){
     var that = this;
      that.setState({
          loading: true
      });
     
     var fetch = require('graphql-fetch')(MainApi)
      var query = `
            query  allEventTypes{
               allEventTypes  {
                id
                name

              }
            }
          `
          var queryVars = {
            
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
              events: results.data.allEventTypes,
              loading: false

             });
            //...

          })
  }



  //////////////////////////////

  getCollab(){
     var that = this;
      that.setState({
          loading: true
      });
     
     var fetch = require('graphql-fetch')(MainApi)
      var query = `
            query  allCollabs{
               allCollabs{
                id
                name

              }
            }
          `
          var queryVars = {
            
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
              collab: results.data.allCollabs,
              loading: false

             });
            //...

          })
  }
 
  ///////////////
 
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
              name
              address
              avgVisitor
              avgSpending
              nearby
              peakHour
              picName
              picPhone
              inclusions
              exclusions
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
              name:results.data.Partner.name,
              address:results.data.Partner.address,
              lat:results.data.Partner.lat,
              lng:results.data.Partner.lng,
              avgVisitor:results.data.Partner.avgVisitor,
              avgSpending:results.data.Partner.avgSpending,
              nearby:results.data.Partner.nearby,
              peakHour:results.data.Partner.peakHour,
              picName:results.data.Partner.picName,
              picPhone:results.data.Partner.picPhone,
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
              categoryId:results.data.Partner.category.id,
              typesIds:results.data.Partner.types.id,
              types:results.data.Partner.types,
              collabsIds:results.data.Partner.collabs.id,
              collabs:results.data.Partner.collabs,
              loading:false
             });
            
           
           
          })
       

  }

 renderArea(){



const  areasx=this.state.areas.map((area) => ({value: area.id, label: area.name}));


  if (this.state.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }


      return(
      
        
                        
                      <Select
                        name="areaId"
                        placeholder="Select Area / regional"
                        value={this.state.areaId}
                        onChange={this.handleChangez}
                        options={areasx}
                      />
                      
                    
      )
    
 }

renderCategory(){


const  category=this.state.category.map((categori) => ({value: categori.id, label: categori.name}));

  if (this.state.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }


      return(
      
        
                        
                      <Select
                        name="categoryId"
                        placeholder="Select Category"
                        value={this.state.categoryId}
                        onChange={this.handleChangex}
                        options={category}
                      />
                      
                    
      )
    
 }

 renderVisitor(){


const  visitor = this.state.visitorsx.map((visit) => ({id: visit.id, name: visit.name}));
const  visitorValue = this.state.visitors.map((visit) => ({id: visit.id, name: visit.name}));


  if (this.state.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }


      return(
      
        <Multiselect
                       onChange={this.handleChangeVit}
                        data={visitor}
                        valueField='id'
                        textField='name'
                        placeholder="Select Visitor Type"
                        defaultValue={visitorValue}
                      />
                      
                    
      )
    
 }


 renderFacility(){


const  facility = this.state.facility.map((facility) => ({id: facility.id, name: facility.name}));
const  facilityValue = this.state.facilities.map((facility) => ({id: facility.id, name: facility.name}));


  if (this.state.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }


      return(
      
         
                      <Multiselect
                       onChange={this.handleSelectChange}
                        data={facility}
                        valueField='id'
                        textField='name'
                        placeholder="Select Facility"
                        defaultValue={facilityValue}
                      />
                      
                    
      )
    
 }



renderEvent(){


const  eventx = this.state.events.map((event) => ({id: event.id, name: event.name}));
const  type = this.state.types.map((type) => ({id: type.id, name: type.name}));


  if (this.state.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }


      return(
      
         
                    <Multiselect
                       onChange={this.handleSelectChangeEvent}
                        data={eventx}
                        valueField='id'
                        textField='name'
                        placeholder="Select Event Types"
                         defaultValue={type}
                      />
                      
                    
      )
    
 }


 renderCollab(){


const  collabx = this.state.collabs.map((collab) => ({id: collab.id, name: collab.name}));
const  collab = this.state.collab.map((collab) => ({id: collab.id, name: collab.name}));


  if (this.state.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }


      return(
      
         
                    <Multiselect
                       onChange={this.handleSelectChangeEvent}
                        data={collab}
                        valueField='id'
                        textField='name'
                        placeholder="Select Event Types"
                         defaultValue={collabx}
                      />
                      
                    
      )
    
 }

 
 


  render() {
   if (this.state.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }

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

    var sluger =  slugify(this.state.name , {
                replacement: '-',    // replace spaces with replacement
                remove: /[$*_+~.()'"!\-:@,]/g,        // regex to remove characters
                lower: true          // result in lower case
              })

    return (

            <div className="animated fadeIn">
            <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong>Edit </strong> Banner
              </div>
              <div className="card-block">
                <form  className="form-horizontal">
                   <div className="row">
                   <div className="col-md-6">
                   
                           
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
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Average Visitor</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.avgVisitor} name="avgVisitor" className="form-control" placeholder="average visitor"
                      onChange={(e) => this.setState({avgVisitor: e.target.value})}
                      />
                    </div>
                  </div>

                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Average Spending</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.avgSpending} name="avgSpending" className="form-control" placeholder="average spendding"
                      onChange={(e) => this.setState({avgSpending: e.target.value})}
                      />
                    </div>
                  </div>

                    <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Peak Hours</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.peakHour} name="peakHour" className="form-control" placeholder="peak hours"
                      onChange={(e) => this.setState({peakHour: e.target.value})}
                      />
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
                    
                      <textarea className="form-control" rows="5" value={this.state.inclusions} name="inclusions"
                         onChange={(e) => this.setState({inclusions: e.target.value})}></textarea>
                    </div>
                  </div>
              

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Exclusion</label>
                    <div className="col-md-9">
                    
                      <textarea className="form-control" rows="5" value={this.state.exclusions} name="exclusions"
                         onChange={(e) => this.setState({exclusions: e.target.value})}></textarea>
                    </div>
                  </div>
              
                   </div>
                   <div className="col-md-6">
   

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Category</label>
                    <div className="col-md-9">
                        
                        {this.renderCategory()}
                       
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
                    
                       {this.renderVisitor()}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Facility</label>
                    <div className="col-md-9">
                      
                      {this.renderFacility()}
                      
                    </div>
                  </div>

                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Event Type</label>
                    <div className="col-md-9">
                       {this.renderEvent()}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Event Collabs</label>
                    <div className="col-md-9">
                      
                      {this.renderCollab()}
                      
                    </div>
                  </div>
                    <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Working Hour</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.workingHour} name="workingHour" className="form-control" placeholder="Working Hour"
                      onChange={(e) => this.setState({workingHour: e.target.value})}
                      />
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
                
              
                  

                   </div>
                </div>
                
                 
      
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.onUpdatePress}><i className="fa fa-dot-circle-o"></i> Save</button>
                
                <Link to={'/partners/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }


}
export default EditPartners;

