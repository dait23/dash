import React, { Component } from 'react';
import { Link} from 'react-router-dom'
import {MainApi, MainLink, Cloudinary_Code, Cloudinary_Link, Cloudinary_Name, No_Avatar} from '../../../views/Api/';
import Dropzone from 'react-dropzone'
import request from 'superagent';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import {Image} from 'cloudinary-react';



//var fetch = require('graphql-fetch')('https://api.graph.cool/simple/v1/cj5nbkzhsejyd0122xngrnr17')

const CLOUDINARY_UPLOAD_PRESET = Cloudinary_Code;
const CLOUDINARY_UPLOAD_URL = Cloudinary_Link;

class EditMdm extends Component {

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
    jabatan: 'Member',
    imageUrl: '',
    imageId: '',
    memberId:'',
    email:'',
    uploadedFile: null,
    loading: true
    }
    //this.handleChange = this.handleChange.bind(this)
    //this.handleSlug = this.handleSlug.bind(this)
    //this.handlePost = this.handlePost.bind(this)
    //this.handleNameChange = this.handleNameChange.bind(this)
    //this.handleDes = this.handleDes.bind(this)
    this.onUpdatePress = this.onUpdatePress.bind(this);
  }

  handleNameChange(e) {
     this.setState({title: e.target.value});
   }

   

    handleDes(value) {
    this.setState({ description: value});
  }

 
  componentDidMount() {
    //var that = this;
    this.getData();
      
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
              member{
                id
                firstName
                lastName
                imageUrl
                imageId
                phone
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
              data : results.data.User,
              id:results.data.User.id,
              email:results.data.User.email,
              firstName:results.data.User.member.firstName,
              lastName:results.data.User.member.lastName,
              imageId:results.data.User.member.imageId,
              imageUrl:results.data.User.member.imageUrl,
              phone:results.data.User.member.phone,
              memberId:results.data.User.member.id,
              loading:false
             });
            //...
          })

  }

  onUpdatePress() {

     //var that = this;
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            mutation($id: ID!, $firstName: String, $lastName: String, $email: String, $memberId: ID!, $imageId: String, $imageUrl: String, $phone: String){
  
              updateUser(id: $id, name: $firstName, email: $email){
                id
              }
              updateMember( id: $memberId, imageId: $imageId, imageUrl: $imageUrl, firstName: $firstName, lastName: $lastName, phone: $phone){
                id
              }
            }
          `
          var queryVars = {
            id: this.state.id,
            email: this.state.email,
            memberId: this.state.memberId,
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
            window.location= MainLink + "member/all";
            window.location.reload(true);
            //...
          })


  } 
   



renderAvatar(){

    if (!this.state.imageId){

        return(

              <img src={No_Avatar} alt="avatar"/>
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
                <strong>Edit </strong>
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
                
                <Link to={'/member/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }


}
export default EditMdm;

