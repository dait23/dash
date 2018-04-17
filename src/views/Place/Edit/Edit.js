import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import {MainApi,Cloudinary_Code, Cloudinary_Link} from '../../../views/Api/';

import request from 'superagent';
import ReactQuill from "react-quill";
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import Select from 'react-select-plus';
import 'react-select-plus/dist/react-select-plus.css';



//var fetch = require('graphql-fetch')('https://api.graph.cool/simple/v1/cj5nbkzhsejyd0122xngrnr17')

const CLOUDINARY_UPLOAD_PRESET = Cloudinary_Code;
const CLOUDINARY_UPLOAD_URL = Cloudinary_Link;


class EditPlace extends Component {

  static propTypes = {
    router: PropTypes.object,
    updateSliders: PropTypes.func,
    //refresh: PropTypes.func,
  }


  constructor(props) {
    super(props)
    this.state = { 
    id: '',
    data:[],
    datax:[],
    dataz:[],
    address: '',
    title: '',
    name: '',
    source: '',
    picName: '',
    picEmail: '',
    picPhone: '',
    phone: '',
    email: '',
    categoryId: '',
    userId: localStorage.getItem('uid'),
    areaId: '',
    to: '',
    remarks: '',
    uploadedFile: null

    }
   
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeRe = this.handleChangeRe.bind(this)
    this.onUpdatePress = this.onUpdatePress.bind(this);
      this.handleChangex = this.handleChangex.bind(this)
    this.handleChangez = this.handleChangez.bind(this)
  }

  handleChangex = (categoryId) => {
    this.setState({ categoryId : categoryId.value});
    console.log(`category: ${categoryId.value}`);
  }
   handleChangez = (areaId) => {
    this.setState({ 
      areaId:areaId.value
    });
    console.log(`area: ${areaId.areaId}`);
  }
  
    handleChange(value) {
    this.setState({ description: value});
  }
  handleChangeRe(value) {
    this.setState({ remarks: value })
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
    that.getCategory();
    that.getArea();
      
  }

  //componentWillUnmount() {
    // this.getData();
 //}


 /////////////////////

  getCategory(){
     var that = this;
     
     var fetch = require('graphql-fetch')(MainApi)
      var query = `
            query allPartnerCategories{
              allPartnerCategories (orderBy: name_DESC) {
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
              datax : results.data.allPartnerCategories,
              loading: false

             });
            //...
           // console.log(that.state.datax);
          })
  }
  /////
   /////////////////////

  getArea(){
     var that = this;
     
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
              dataz : results.data.allAreas,
              loading: false

             });
            //...
           // console.log(that.state.dataz);
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
            query Place($id: ID!) {
              Place(id: $id){
              id
              title
              name
              picName
              email
              picEmail
              address
              phone
              source
              picPhone
              user{
                id
              name
            }
              area{
                id
                name
              }
              category{
                id
                name
              }
              remarks
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
              data : results.data.Place,
              id:results.data.Place.id,
              title:results.data.Place.title,
              name:results.data.Place.name,
              source:results.data.Place.source,
              picName:results.data.Place.picName,
              email:results.data.Place.email,
              picEmail:results.data.Place.picEmail,
              phone:results.data.Place.phone,
              picPhone:results.data.Place.picPhone,
              address:results.data.Place.address,
              remarks:results.data.Place.remarks,
              areaId:results.data.Place.area.id,
              userId:results.data.Place.user.id,
              areaName:results.data.Place.area.name,
              categoryId:results.data.Place.category.id,
              categoryName:results.data.Place.category.name,
              loading:false
             });
            //...console.log(that.state.dataz);
           // console.log(that.state.data);
          })

  }

  onUpdatePress() {

     var that = this;
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            mutation updatePlace (
              $id: ID!,
              $title: String,
              $name: String,
              $picName: String, 
              $email: String,
              $picEmail: String,
              $picPhone: String,   
              $address: String, 
              $phone: String, 
              $source: String, 
              $categoryId: ID, 
              $areaId: ID,
              $remarks: String, 
              $userId: ID,
              $status: Int
            ){
              updatePlace (
              id: $id,
              title: $title,
              name: $name,
              source: $source,
              picName: $picName,
              picEmail: $picEmail,
              picPhone: $picPhone, 
              email:$email,
              phone: $phone, 
              address: $address,
              categoryId :$categoryId,
              userId:$userId,
              areaId: $areaId,
              remarks: $remarks,
              status: $status
              ){
                id           
              }
            }
          `
          var queryVars = {
            id: this.state.id,
            title: this.state.title,
            name: this.state.name,
            source: this.state.source,
            picName: this.state.picName,
            picEmail: this.state.picEmail,
            picPhone: this.state.picPhone,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address,
            remarks: this.state.remarks,
            categoryId: this.state.categoryId,
            areaId: this.state.areaId, 
            userId: this.state.userId, 
            status: parseInt('1', 10)  
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

             that.getData();
            //...
          })


  } 
   

 
  modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ]
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]
/////////////////////////

renderKategori(){

  if (this.state.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }


      return(
      
        <select id="select" value={this.state.categoryId}  name="categoryId" className="form-control" onChange={(e) => this.setState({categoryId: e.target.value})}>
                        

            {this.state.datax.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                       ))}   
        </select>
      )
    
 }
////////////

renderArea(){

  if (this.state.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }


      return(
      
        <select id="select" value={this.state.areaId}  name="areaId" className="form-control" onChange={(e) => this.setState({areaId: e.target.value})}>
                        

            {this.state.dataz.map((area) => (
                        <option key={area.id} value={area.id}>{area.name}</option>
                       ))}   
        </select>
      )
    
 }
////////////

  render() {
   if (this.state.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }
    
    return (

            <div className="animated fadeIn">
            <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong>Edit </strong> Place
              </div>
              <div className="card-block">
                                <form className="form-horizontal">

              
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Place Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.title} name="title" className="form-control" placeholder="Place Name"
                      onChange={(e) => this.setState({title: e.target.value})}
                      />
                    </div>
                  </div>
                    <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Name Person</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.name} name="name" className="form-control" placeholder="Name Person"
                      onChange={(e) => this.setState({name: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Email</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.email} name="email" className="form-control" placeholder="email"
                      onChange={(e) => this.setState({email: e.target.value})}
                      onKeyUp={(e) => this.setState({slug: document.getElementById("to").value})}
                      />

                       <input disabled type="hidden" id="to" value={this.state.email} name="to" className="form-control" placeholder="Slug"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Phone</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.phone} name="phone" className="form-control" placeholder="Phone Number"
                      onChange={(e) => this.setState({phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Pic Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.picName} name="picName" className="form-control" placeholder="Pic Name"
                      onChange={(e) => this.setState({picName: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Pic Email</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.picEmail} name="picEmail" className="form-control" placeholder="Pic Email"
                      onChange={(e) => this.setState({picEmail: e.target.value})}
                      />
                    </div>
                  </div>
                    <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Pic Phone</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.picPhone} name="picPhone" className="form-control" placeholder="Pic Phone"
                      onChange={(e) => this.setState({picPhone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Category</label>
                    <div className="col-md-9">
                      
                         <Select
                        name="categoryId"
                        value={this.state.categoryId}
                        onChange={this.handleChangex}
                        options={this.state.datax.map((category) => (
                           
                           {value: category.id, label: category.name}


                          ))}
                      />
                      
                    </div>
                  </div>
                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Area</label>
                    <div className="col-md-9">
                      
                             
                      <Select
                        name="areaId"
                        value={this.state.areaId}
                        onChange={this.handleChangez}
                        options={this.state.dataz.map((area) => (
                           
                           {value: area.id, label: area.name}


                          ))}
                      />
                      
                    </div>
                  </div>
                 
                 
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="textarea-input">Address</label>
                    <div className="col-md-9">
                    
                    <ReactQuill theme="snow"
                    value={this.state.address}
                    modules={this.modules}
                    formats={this.formats}
                    placeholder="address"
                    onChange={this.handleChange}
                    >

                    </ReactQuill>
                    
                     
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="textarea-input">Remarks</label>
                    <div className="col-md-9">
                    
                    <ReactQuill theme="snow"
                    value={this.state.remarks}
                    modules={this.modules}
                    formats={this.formats}
                    placeholder="remarks"
                    onChange={this.handleChangeRe}
                    >

                    </ReactQuill>
                    
                     
                    </div>
                  </div>
      
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Source</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.source} name="source" className="form-control" placeholder="Source Scarppingl"
                      onChange={(e) => this.setState({source: e.target.value})}
                      />
                    </div>
                  </div>
            
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.onUpdatePress}><i className="fa fa-dot-circle-o"></i> Save</button>
                
                <Link to={'/place/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }


}
export default EditPlace;

