import React, { Component } from 'react';
import { Link} from 'react-router-dom'
import {MainApi,Cloudinary_Code, Cloudinary_Link} from '../../../views/Api/';
import request from 'superagent';
import ReactQuill from "react-quill";

import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import { Multiselect } from 'react-widgets'



//var fetch = require('graphql-fetch')('https://api.graph.cool/simple/v1/cj5nbkzhsejyd0122xngrnr17')

const CLOUDINARY_UPLOAD_PRESET = Cloudinary_Code;
const CLOUDINARY_UPLOAD_URL = Cloudinary_Link;


class EditInquiry extends Component {

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
    datav:[],
     datay:[],
      facilities:[],
    title: '',
    wide:'',
     facilitiesIds:'',
    price: '',
    categoryId: '',
    categoryName:'',
    userId: localStorage.getItem('uid'),
    typeId: '',
    typeName:'',
    areaId:'',
    areaName:'',
    remarks: '',
    uploadedFile: null,
    loading: true,

    }
   
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeRe = this.handleChangeRe.bind(this)
    this.onUpdatePress = this.onUpdatePress.bind(this);
     this.handleFaciChange = this.handleFaciChange.bind(this)
  }

   handleFaciChange (value) {

    const map1 = value.map(x => x.id);
    //const xxx = map1.toString();
     //const xxx = map1.join();
    //console.log('You\'ve selected:', map1);
    this.setState({ facilitiesIds: map1 });


     console.log('You\'ve selected fasilitas:', map1);
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
    that.getArea();
    that.getType();
      that.getCategory();
       that.getFasilitas();
  }

  //componentWillUnmount() {
    // this.getData();
 //}

 //////////////////////////////// Fasilitas
getFasilitas(){
     var that = this;
      that.setState({
          loading: true
      });
     
     var fetch = require('graphql-fetch')(MainApi)
      var query = `
            query allFacilities{
              allFacilities (orderBy: name_ASC) {
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
              datay : results.data.allFacilities,
              loading: false

             });
            //...
           // console.log(that.state.dataz);
          })
  }

/////////////////////

  getCategory(){
     var that = this;
     that.setState({
          loading: true
      });
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
              datav : results.data.allAreas,
              loading: false

             });
            //...
           console.log(that.state.dataz);
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
            query Inquiry($id: ID!) {
              Inquiry(id: $id){
              id
              title
              wide
              price
              remarks
              user{
                id
              }
              type{
                id
                name
              }
              facilities{
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
              data : results.data.Inquiry,
              id:results.data.Inquiry.id,
              title:results.data.Inquiry.title,
              wide:results.data.Inquiry.wide,
              price:results.data.Inquiry.price,
              facilities:results.data.Inquiry.facilities,
              remarks:results.data.Inquiry.remarks,
              typeId:results.data.Inquiry.type.id,
              userId:results.data.Inquiry.user.id,
              typeName:results.data.Inquiry.type.name,
              categoryId:results.data.Inquiry.category.id,
              categoryName:results.data.Inquiry.category.name,
              areaId:results.data.Inquiry.area.id,
              areName:results.data.Inquiry.area.name,
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
              $title: String, 
              $wide: String, 
              $price: String, 
              $areaId: ID,  
              $categoryId: ID, 
              $typeId: ID, 
              $remarks: String, 
              $userId: ID,
              $facilitiesIds: [ID!]
            ){
              updateInquiry (
              id: $id,
              title: $title, 
              wide:$wide,
              price: $price, 
              areaId :$areaId,
              categoryId :$categoryId,
              userId:$userId,
              typeId: $typeId,
              remarks: $remarks,
              facilitiesIds: $facilitiesIds
              ){
                id           
              }
            }
          `
          var queryVars = {
            id: this.state.id,
            title: this.state.title,
            wide: this.state.wide,
            price: this.state.price,
            remarks: this.state.remarks,
            categoryId: this.state.categoryId,
            facilitiesIds: this.state.facilitiesIds,
            typeId: this.state.typeId,
            areaId: this.state.areaId,  
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

 /////
 renderArea(){

   if (this.state.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }


      return(
      
        <select id="select" value={this.state.areaId}  name="areaId" className="form-control" onChange={(e) => this.setState({areaId: e.target.value})}>
                        
             <option>Area / Region</option>
            {this.state.datav.map((tipe) => (
                        <option key={tipe.id} value={tipe.id}>{tipe.name}</option>
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
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Title</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.title} name="title" className="form-control" placeholder="Title"
                      onChange={(e) => this.setState({title: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Price</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.price} name="price" className="form-control" placeholder="Price"
                      onChange={(e) => this.setState({price: e.target.value})}
                      />
                    </div>
                  </div>
                    <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Wide Space</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.wide} name="wiede" className="form-control" placeholder="Wide Space"
                      onChange={(e) => this.setState({wide: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Area / Region</label>
                    <div className="col-md-9">
                      
                         {this.renderArea()}
                      
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
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Facility</label>
                    <div className="col-md-9">
                      <Multiselect
                       onChange={this.handleFaciChange}
                        data={this.state.datay.map((fasilitas) => (
                           
                           {id: fasilitas.id, name: fasilitas.name}

                         
                          ))}
                        valueField='id'
                        textField='name'
                        placeholder="Facility"
                         defaultValue={this.state.facilities.map((area) => (
                           
                           {id: area.id, name: area.name}

                         
                          ))}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="textarea-input">Remarks</label>
                    <div className="col-md-9">
                    
                    <ReactQuill theme="snow"
                    value={this.state.remarks}
                    modules={this.modules}
                    formats={this.formats}
                    placeholder="description"
                    onChange={this.handleChangeRe}
                    >

                    </ReactQuill>
                    
                     
                    </div>
                  </div>
      
                 
            
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.onUpdatePress}><i className="fa fa-dot-circle-o"></i> Save</button>
                
                <Link to={'/inquiry/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }


}
export default EditInquiry;

