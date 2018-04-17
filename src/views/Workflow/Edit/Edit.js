import React, { Component } from 'react';
import { Link, withRouter, Redirect} from 'react-router-dom'
import { Button} from 'reactstrap';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {MainApi, MainLink, Cloudinary_Code, Cloudinary_Link, Cloudinary_Name} from '../../../views/Api/';
import Dropzone from 'react-dropzone'
import request from 'superagent';
import ReactQuill from "react-quill";
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import {Image} from 'cloudinary-react';
const history = createBrowserHistory();


//var fetch = require('graphql-fetch')('https://api.graph.cool/simple/v1/cj5nbkzhsejyd0122xngrnr17')

const CLOUDINARY_UPLOAD_PRESET = Cloudinary_Code;
const CLOUDINARY_UPLOAD_URL = Cloudinary_Link;


class EditBrand extends Component {

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
    name: '',
    phone: '',
    email: '',
    categoryId: '',
    categoryName: '',
    userId: localStorage.getItem('uid'),
    typeId: '',
    typeName: '',
    remarks: '',
    facebook: '',
    instagram: '',
    twitter: '',
    website: '',
    imageUrl:'',
    imageId:'',
    link:'',
    uploadedFile: null,
    loading: true,
    datax:[],
     dataz:[],

    }
   
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeRe = this.handleChangeRe.bind(this)
    this.onUpdatePress = this.onUpdatePress.bind(this);
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
    that.getType();
      
  }

  //componentWillUnmount() {
    // this.getData();
 //}


 /////////////////////

  getCategory(){
     var that = this;
     
     var fetch = require('graphql-fetch')(MainApi)
      var query = `
            query allBrandCategories{
              allBrandCategories (orderBy: createdAt_DESC) {
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
              datax : results.data.allBrandCategories,
              loading: false

             });
            //...
           // console.log(that.state.datax);
          })
  }
  /////
   /////////////////////

  getType(){
     var that = this;
     
     var fetch = require('graphql-fetch')(MainApi)
      var query = `
            query allBrandTypes{
              allBrandTypes (orderBy: createdAt_DESC) {
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
              dataz : results.data.allBrandTypes,
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
            query Brand($id: ID!) {
              Brand(id: $id){
              id
              name
              phone
              address
              email
              facebook
              instagram
              twitter
              website
              remarks
              user{
                id
              }
              type{
                id
                name
              }
              category{
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
              data : results.data.Brand,
              id:results.data.Brand.id,
              name:results.data.Brand.name,
              email:results.data.Brand.email,
              phone:results.data.Brand.phone,
              address:results.data.Brand.address,
              remarks:results.data.Brand.remarks,
              website:results.data.Brand.website,
              facebook:results.data.Brand.facebook,
              instagram:results.data.Brand.instagram,
              twitter:results.data.Brand.twitter,
              typeId:results.data.Brand.type.id,
              userId:results.data.Brand.user.id,
              typeName:results.data.Brand.type.name,
              categoryId:results.data.Brand.category.id,
              categoryName:results.data.Brand.category.name,
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
            mutation updateBrand (
              $id: ID!,
              $name: String!, 
              $email: String, 
              $address: String, 
              $phone: String, 
              $categoryId: ID, 
              $typeId: ID, 
              $facebook: String, 
              $instagram: String, 
              $website: String,
              $twitter: String,
              $remarks: String, 
              $userId: ID
            ){
              updateBrand (
              id: $id,
              name: $name, 
              email:$email,
              phone: $phone, 
              address: $address,
              categoryId :$categoryId,
              userId:$userId,
              typeId: $typeId,
              facebook: $facebook,
              instagram: $instagram,
              twitter: $twitter,
              website: $website,
              remarks: $remarks
              ){
                id           
              }
            }
          `
          var queryVars = {
            id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address,
            remarks: this.state.remarks,
            categoryId: this.state.categoryId,
            typeId: this.state.typeId, 
            facebook: this.state.facebook, 
            instagram: this.state.instagram,
            twitter: this.state.twitter,
            website: this.state.website, 
            userId: this.state.userId,   
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

renderTipe(){

  if (this.state.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }


      return(
      
        <select id="select" value={this.state.typeId}  name="typeId" className="form-control" onChange={(e) => this.setState({typeId: e.target.value})}>
                        

            {this.state.dataz.map((tipe) => (
                        <option key={tipe.id} value={tipe.id}>{tipe.name}</option>
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
                <strong>Edit </strong> Banner
              </div>
              <div className="card-block">
                <form className="form-horizontal">

                 
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.name} name="name" className="form-control" placeholder="Name"
                      onChange={(e) => this.setState({name: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Email</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.email} name="email" className="form-control" placeholder="email"
                      onChange={(e) => this.setState({email: e.target.value})}
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
                    <label className="col-md-3 form-control-label" htmlFor="select">Category</label>
                    <div className="col-md-9">
                      
                         {this.renderKategori()}
                      
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Type</label>
                    <div className="col-md-9">
                      
                         {this.renderTipe()}
                      
                    </div>
                  </div>
                 
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Website</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.website} name="website" className="form-control" placeholder="Website"
                      onChange={(e) => this.setState({website: e.target.value})}
                      />
                    </div>
                  </div>
                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Facebook</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.facebook} name="facebook" className="form-control" placeholder="facebook link"
                      onChange={(e) => this.setState({facebook: e.target.value})}
                      />
                    </div>
                  </div>
                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Instagram</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.instagram} name="instagram" className="form-control" placeholder="Instagram link"
                      onChange={(e) => this.setState({instagram: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Twitter</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.twitter} name="twitter" className="form-control" placeholder="twitter link"
                      onChange={(e) => this.setState({twitter: e.target.value})}
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
      
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.onUpdatePress}><i className="fa fa-dot-circle-o"></i> Save</button>
                
                <Link to={'/brand/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }


}
export default EditBrand;

