import React, { Component } from 'react';
import { Link} from 'react-router-dom'
import {MainApi, Cloudinary_Code, Cloudinary_Link} from '../../../views/Api/';
import request from 'superagent';
import ReactQuill from "react-quill";
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import Select from 'react-select-plus';
import 'react-select-plus/dist/react-select-plus.css';



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
    source: '',
    follower: '',
    picName:'',
    picPhone:'',
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
     this.handleChangex = this.handleChangex.bind(this)
    this.handleChangez = this.handleChangez.bind(this)
  }

    handleChangex = (categoryId) => {
    this.setState({ categoryId : categoryId.value});
    console.log(`category: ${categoryId.value}`);
  }
   handleChangez = (typeId) => {
    this.setState({ 
      typeId:typeId.value
    });
    console.log(`tipe: ${typeId.typeId}`);
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
              picName
              picPhone
              follower
              phone
              address
              email
              source
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
              source:results.data.Brand.source,
              follower:results.data.Brand.follower,
              picName:results.data.Brand.picName,
              picPhone:results.data.Brand.picPhone,
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
           
          })
          console.log(this.state.id);

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
              $follower: String, 
              $picName: String,
              $picPhone: String, 
              $categoryId: ID, 
              $typeId: ID, 
              $facebook: String, 
              $instagram: String, 
              $website: String,
              $twitter: String,
              $remarks: String, 
              $source: String, 
              $userId: ID,
              $status: Int
            ){
              updateBrand (
              id: $id,
              name: $name, 
              email:$email,
              phone: $phone,
              source: $source,
              follower: $follower, 
              picName:$picName,
              picPhone:$picPhone,
              address: $address,
              categoryId :$categoryId,
              userId:$userId,
              typeId: $typeId,
              facebook: $facebook,
              instagram: $instagram,
              twitter: $twitter,
              website: $website,
              remarks: $remarks,
              status: $status
              ){
                id           
              }
            }
          `
          var queryVars = {
            id: this.state.id,
            name: this.state.name,
            picName: this.state.picName,
            picPhone: this.state.picPhone,
            email: this.state.email,
            follower: this.state.follower,
            phone: this.state.phone,
            source: this.state.source,
            address: this.state.address,
            remarks: this.state.remarks,
            categoryId: this.state.categoryId,
            typeId: this.state.typeId, 
            facebook: this.state.facebook, 
            instagram: this.state.instagram,
            twitter: this.state.twitter,
            website: this.state.website, 
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
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Brand Name</label>
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
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Brand Follower</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.follower} name="follower" className="form-control" placeholder="brand follower"
                      onChange={(e) => this.setState({follower: e.target.value})}
                      />
                    </div>
                  </div>
                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Pic Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.picName} name="picName" className="form-control" placeholder="PIC Name"
                      onChange={(e) => this.setState({picName: e.target.value})}
                      />
                    </div>
                  </div>
                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Pic Phone</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.picPhone} name="picPhone" className="form-control" placeholder="PIC Phone Number"
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
                    <label className="col-md-3 form-control-label" htmlFor="select">Type</label>
                    <div className="col-md-9">
                      
                      <Select
                        name="typeId"
                        value={this.state.typeId}
                        onChange={this.handleChangez}
                        options={this.state.dataz.map((tipe) => (
                           
                           {value: tipe.id, label: tipe.name}


                          ))}
                      />
                      
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
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Source</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.source} name="source" className="form-control" placeholder="Source scraping"
                      onChange={(e) => this.setState({source: e.target.value})}
                      />
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

