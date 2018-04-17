import React, { Component } from 'react';
import { Link, withRouter, Redirect} from 'react-router-dom'
import { Button} from 'reactstrap';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {MainApi, MainLink, Cloudinary_Code, Cloudinary_Link, Cloudinary_Name, No_Avatar} from '../../../views/Api/';
import ReactQuill from "react-quill";
import Dropzone from 'react-dropzone'
import request from 'superagent';
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import Select from 'react-select-plus';
import 'react-select-plus/dist/react-select-plus.css';
import {Image} from 'cloudinary-react';
const history = createBrowserHistory();


//var fetch = require('graphql-fetch')('https://api.graph.cool/simple/v1/cj5nbkzhsejyd0122xngrnr17')

const CLOUDINARY_UPLOAD_PRESET = Cloudinary_Code;
const CLOUDINARY_UPLOAD_URL = Cloudinary_Link;

class EditBde extends Component {

  static propTypes = {
    router: PropTypes.object,
    updatUser: PropTypes.func,
    //refresh: PropTypes.func,
  }


  constructor(props) {
    super(props)
    this.state = { 
    id: '',
    firstName: '',
    lastName: '',
    jabatan: 'Bde',
    imageUrl: '',
    imageId: '',
    mdeId:'',
    email:'',
    data:[],
    dataz:[],
    areas:[],
    uploadedFile: null,
    loading: true,
    removeSelected: true,
      disabled: false,
      crazy: false,
      stayOpen: false,
      value: [],
      rtl: false,
    }
    this.handleSelectChange = this.handleSelectChange.bind(this)
    //this.handleSlug = this.handleSlug.bind(this)
    //this.handlePost = this.handlePost.bind(this)
    //this.handleNameChange = this.handleNameChange.bind(this)
    //this.handleDes = this.handleDes.bind(this)
    this.onUpdatePress = this.onUpdatePress.bind(this);
  }

  handleSelectChange (value) {
    console.log('You\'ve selected:', value);
    this.setState({ value });
  }

  handleNameChange(e) {
     this.setState({title: e.target.value});
   }

   

    handleDes(value) {
    this.setState({ description: value});
  }

 
  componentDidMount() {
    var that = this;
    this.getData();
    this.getArea();

      
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
  ////

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

  //////////////////////
 
  getData(){
     var that = this;
     that.setState({
          loading: true
      });
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            query User($id: ID!) {
              User(id: $id){
              id
              email
              bde{
                id
                firstName
                lastName
                imageUrl
                imageId
                phone
                areas{
                  id
                  name
                }
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
              datax : results.data.User,
              id:results.data.User.id,
              email:results.data.User.email,
              areas:results.data.User.bde.areas,
              firstName:results.data.User.bde.firstName,
              lastName:results.data.User.bde.lastName,
              imageId:results.data.User.bde.imageId,
              imageUrl:results.data.User.bde.imageUrl,
              phone:results.data.User.bde.phone,
              bdeId:results.data.User.bde.id,
              loading:false
             });
            //...
            
          })

  }

  onUpdatePress() {

     var that = this;
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            mutation($id: ID!, $firstName: String, $lastName: String, $email: String, $bdeId: ID!, $imageId: String, $imageUrl: String, $phone: String){
  
              updateUser(id: $id, name: $firstName, email: $email){
                id
              }
              updateBDE( id: $bdeId, imageId: $imageId, imageUrl: $imageUrl, firstName: $firstName, lastName: $lastName, phone: $phone){
                id
              }
            }
          `
          var queryVars = {
            id: this.state.id,
            email: this.state.email,
            bdeId: this.state.bdeId,
            phone: this.state.phone,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            imageId: this.state.imageId,
            imageUrl: this.state.imageUrl
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
            
            //that.getData();
            window.location= MainLink + "bde/all";
            window.location.reload(true);
            //...
          })


  } 
   



renderAvatar(){

    if (!this.state.imageId){

        return(

              <img src={No_Avatar} />
          )
                        
      }
      else{

        return(

             <Image cloudName={Cloudinary_Name} publicId={this.state.imageId} width="80" crop="scale"/>

          )
      }                 
                      
  }

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
                <strong>Edit </strong> Customer
              </div>
              <div className="card-block">
                <form className="form-horizontal">

                <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input"></label>
                    <div className="col-md-9">
                      {this.renderAvatar()}
                    </div>
                  </div>

                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">First Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.firstName} name="firstName" className="form-control" placeholder="First Name"
                       onChange={(e) => this.setState({firstName: e.target.value})}
          
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Last Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.lastName} name="lastName" className="form-control" placeholder="Last Name"
                       onChange={(e) => this.setState({lastName: e.target.value})}
          
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
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Area / Regional</label>
                    <div className="col-md-9">
                      <Select
                          multi
                          onChange={this.handleSelectChange}
                          placeholder="Area"
                          removeSelected={this.state.removeSelected}
                          simpleValue
                          options={this.state.dataz.map((area) => (
                           
                           {value: area.id, label: area.name}


                          ))}
                          value={this.state.areas.map((area) => (
                           
                           {value: area.id, label: area.name}


                          ))}
                        
          
                      />
                    </div>
                  </div>
                  
                    <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="file-input">Avatar</label>
                    <div className="col-md-9">
                     <Dropzone
                      onDrop={this.onImageDrop.bind(this)}
                      multiple={false}
                      accept="image/*">
                      <div>Drop an image or click to select a file to upload.</div>
                    </Dropzone><br/>
                    </div>
                  </div>
                 
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.onUpdatePress}><i className="fa fa-dot-circle-o"></i> Submit</button>
                
                <Link to={'/bde/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }


}
export default EditBde;

