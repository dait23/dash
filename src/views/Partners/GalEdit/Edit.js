import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom'
import {MainApi, Cloudinary_Code, Cloudinary_Link, Cloudinary_Name} from '../../../views/Api/';
import Dropzone from 'react-dropzone'
import request from 'superagent';
import ReactQuill from "react-quill";
//import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import {Image} from 'cloudinary-react';
import Select from 'react-select-plus';
import 'react-select-plus/dist/react-select-plus.css';
import slugify from 'slugify';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import { toast, ToastContainer } from 'react-toastify';
//const history = createBrowserHistory();


//var fetch = require('graphql-fetch')('https://api.graph.cool/simple/v1/cj5nbkzhsejyd0122xngrnr17')

const CLOUDINARY_UPLOAD_PRESET = Cloudinary_Code;
const CLOUDINARY_UPLOAD_URL = Cloudinary_Link;

// var pathArray = window.location.pathname.split( '/' );
// var secondLevelLocation = pathArray[4];


class AddEditGallery extends Component {

  static propTypes = {
    router: PropTypes.object,
    updateSliders: PropTypes.func,
    //refresh: PropTypes.func,
  }


  constructor(props) {
    super(props)
    this.state = { 
    id:'',
    name: '',
    imageUrl:'',
    imageId:'',
    partnerId: '',

    loading: true,
    uploadedFile: null

    }
   

    this.onUpdatePress = this.onUpdatePress.bind(this);

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

  }


  //componentWillUnmount() {
    // this.getData();
 //}
 
  getData(){
     var that = this;
     that.setState({
          loading: true
      });
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            query Banner($id: ID!) {
              Gallery(id: $id){
              id
              name
              imageId
              imageUrl
              partner{
                id
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
            //console.log(results)
            if (results.errors) {
              //...
              return
            }
            //var BlogCategory = results.data.BlogCategory

            that.setState({
              data : results.data.Gallery,
              id:results.data.Gallery.id,
              name:results.data.Gallery.name,
              imageUrl:results.data.Gallery.imageUrl,
              imageId:results.data.Gallery.imageId,
              partnerId:results.data.Gallery.partner.id,
              loading:false
             });
            //...

          })

  }

  onUpdatePress() {

     var that = this;
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            mutation updateBanner (
              $id: ID!, 
              $name: String, 
              $imageId: String, 
              $imageUrl: String, 
              $partnerId: ID, 
            ){
              updateGallery (
                id: $id, 
                name: $name, 
                imageId: $imageId, 
                imageUrl: $imageUrl, 
                partnerId: $partnerId,

                ){
                id           
              }
            }
          `
          var queryVars = {
            id: this.state.id,
            name: this.state.name,
            partnerId: this.state.partnerId,
            imageUrl: this.state.imageUrl,
            imageId: this.state.imageId,

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

              toast('Update Gallery Success', { type: toast.TYPE.SUCCESS, autoClose: 2000 }, setTimeout("location.href = '/partners/all';",2000))
            //...
          })


  } 
   

 


  render() {
    if (this.state.loading) {
      return (<div></div>)
    }

   
    
    return (

            <div className="animated fadeIn">
             <ToastContainer autoClose={2000} />
            <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong>Edit </strong> Spaces
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

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.onUpdatePress}><i className="fa fa-dot-circle-o"></i> Submit</button>
                
                <Link to={'/partners/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }


}



export default compose(
)(withRouter(AddEditGallery))

