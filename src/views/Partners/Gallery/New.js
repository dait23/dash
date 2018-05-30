import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom'
import ReactQuill from "react-quill";
import { graphql, compose } from 'react-apollo'
//import {MainApi, Cloudinary_Code, Cloudinary_Link, Cloudinary_Name} from '../../../views/Api/';
import gql from 'graphql-tag'
import Dropzone from 'react-dropzone'
import request from 'superagent';
import slugify from 'slugify';
import PropTypes from 'prop-types';
import Select from 'react-select-plus';
import 'react-select-plus/dist/react-select-plus.css';

import { toast, ToastContainer } from 'react-toastify';
import {MainLink, Cloudinary_Code, Cloudinary_Link, MainApi} from '../../../views/Api/';


const CLOUDINARY_UPLOAD_PRESET = Cloudinary_Code;
const CLOUDINARY_UPLOAD_URL = Cloudinary_Link;

class AddGallery extends Component {

  static propTypes = {
    router: PropTypes.object,
    addBanner: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { 
    name: '',
    slug:'',
    imageUrl:'',
    imageId:'',
    partnerId: this.props.match.params.id,
    loading: true,
    uploadedFile: null
    }
    // this.handleChange = this.handleChange.bind(this)
    // this.handlePost = this.handlePost.bind(this)
    // this.handleChangex = this.handleChangex.bind(this)
    // this.handleChangez = this.handleChangez.bind(this)
    // this.handleChangeRent = this.handleChangeRent.bind(this)
    // this.handleChangeRule = this.handleChangeRule.bind(this)
    // this.handleChangeNearby = this.handleChangeNearby.bind(this)
    // this.handleChangeVisit = this.handleChangeVisit.bind(this)
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










  render() {
   

    return (
      <div className="animated fadeIn">
       <ToastContainer autoClose={2000} />
            <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong>Add </strong> New Gallery
              </div>
              <div className="card-block">
                <form className="form-horizontal">

                
                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.name} name="name" className="form-control" placeholder="Nama Image"
                      onChange={(e) => this.setState({name: e.target.value})}
                
                      />
                    </div>
                  </div>

                 
                 
                 

                
                 
                 
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="file-input">Image</label>
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
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.handlePost}><i className="fa fa-dot-circle-o"></i> Submit</button>
                
                <Link to={'/partners/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }

  handlePost = async () => {
    const partnerId = this.props.match.params.id;
    const {name, imageUrl, imageId } = this.state
    await this.props.addBanner({variables: { name, imageUrl, imageId,  partnerId}})


   toast('Add Gallery Success', { type: toast.TYPE.SUCCESS, autoClose: 2000 }, setTimeout("location.href = '/partners/all';",2000))
  }

}
const addMutation = gql`
  mutation addBanner(
  
  $name:String, 
  $imageUrl: String,
  $imageId: String,
  $partnerId: ID

  ) {
    createGallery(
  
    name: $name
    imageUrl: $imageUrl
    imageId: $imageId
    partnerId: $partnerId



    ) {
      id
    }
  }
`





export default compose(
  graphql(addMutation, { name: 'addBanner' }),
)(withRouter(AddGallery))
