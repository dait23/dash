import React, { Component } from 'react';
import { Link} from 'react-router-dom'

import {MainApi, MainLink, Cloudinary_Code, Cloudinary_Link} from '../../../views/Api/';

import request from 'superagent';


import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import Select from 'react-select-plus';
import 'react-select-plus/dist/react-select-plus.css';



//var fetch = require('graphql-fetch')('https://api.graph.cool/simple/v1/cj5nbkzhsejyd0122xngrnr17')

const CLOUDINARY_UPLOAD_PRESET = Cloudinary_Code;
const CLOUDINARY_UPLOAD_URL = Cloudinary_Link;


class EditRequest extends Component {

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
    title: '',
    periode:'',
    follower:'',
    categoryId: '',
    categoryName:'',
    userId: localStorage.getItem('uid'),
    typeId: '',
    typeName:'',
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
    that.getType();
    that.getCategory();
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
 /////////////////////

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
            query Request($id: ID!) {
              Request(id: $id){
              id
              title
              status
              periode
              follower
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
              data : results.data.Request,
              id:results.data.Request.id,
              title:results.data.Request.title,
              periode:results.data.Request.periode,
              follower:results.data.Request.follower,
              typeId:results.data.Request.type.id,
              userId:results.data.Request.user.id,
              typeName:results.data.Request.type.name,
              categoryId:results.data.Request.category.id,
              categoryName:results.data.Request.category.name,
              loading:false
             });
            //...console.log(that.state.dataz);
           // console.log(that.state.data);
          })

  }

  onUpdatePress() {

     //var that = this;
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            mutation updateRequest (
              $id: ID!,
              $title: String, 
              $periode: String, 
              $follower: String, 
              $categoryId: ID, 
              $typeId: ID,
              $userId: ID
            ){
              updateRequest (
              id: $id,
              title: $title, 
              periode:$periode,
              follower: $follower, 
              categoryId :$categoryId,
              userId:$userId,
              typeId: $typeId,
              ){
                id           
              }
            }
          `
          var queryVars = {
            id: this.state.id,
            title: this.state.title,
            periode: this.state.periode,
            follower: this.state.follower,
            categoryId: this.state.categoryId,
            typeId: this.state.typeId,
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
            
            // history.push('/request/all');
             //that.getData();
             //window.history.back();
              window.location= MainLink + "request/all";
             // <Redirect push to="/request/all"/>
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
                        name="typeIdId"
                        value={this.state.typeId}
                        onChange={this.handleChangez}
                        options={this.state.dataz.map((tipe) => (
                           
                           {value: tipe.id, label: tipe.name}


                          ))}
                      />
                      
                    </div>
                  </div>
                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Periode</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.periode} name="periode" className="form-control" placeholder="Periode"
                      onChange={(e) => this.setState({periode: e.target.value})}
                      />
                    </div>
                  </div>
                    <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Brand Follower</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.follower} name="follower" className="form-control" placeholder="Brand Follower"
                      onChange={(e) => this.setState({follower: e.target.value})}
                      />
                    </div>
                  </div>
      
                 
            
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.onUpdatePress}><i className="fa fa-dot-circle-o"></i> Save</button>
                
                <Link to={'/request/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }


}
export default EditRequest;

