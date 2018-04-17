import React, { Component } from 'react';
import { Link} from 'react-router-dom'
import {MainApi, Cloudinary_Code, Cloudinary_Link, Cloudinary_Name} from '../../../views/Api/';
import Dropzone from 'react-dropzone'
import request from 'superagent';
import ReactQuill from "react-quill";
//import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import {Image} from 'cloudinary-react';

import slugify from 'slugify';


import { toast, ToastContainer } from 'react-toastify';
//const history = createBrowserHistory();


//var fetch = require('graphql-fetch')('https://api.graph.cool/simple/v1/cj5nbkzhsejyd0122xngrnr17')

const CLOUDINARY_UPLOAD_PRESET = Cloudinary_Code;
const CLOUDINARY_UPLOAD_URL = Cloudinary_Link;

// var pathArray = window.location.pathname.split( '/' );
// var secondLevelLocation = pathArray[4];


class AddEditSpace extends Component {

  static propTypes = {
    router: PropTypes.object,
    updateSliders: PropTypes.func,
    //refresh: PropTypes.func,
  }


  constructor(props) {
    super(props)
    this.state = { 
      id:'',
    description: '',
    title: '',
    slug:'',
    imageUrl:'',
    imageId:'',
    partnerId: '',
    price:'',
    uploadedFile: null

    }
   
    this.handleDes = this.handleDes.bind(this)
    this.onUpdatePress = this.onUpdatePress.bind(this);
  }

  
    handleDes(value) {
    this.setState({ description: value});
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
              Space(id: $id){
              id
              title
              slug
              description
              price
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
              data : results.data.Space,
              id:results.data.Space.id,
              title:results.data.Space.title,
              slug:results.data.Space.slug,
              price:results.data.Space.price,
              imageUrl:results.data.Space.imageUrl,
              imageId:results.data.Space.imageId,
              description:results.data.Space.description,
              partnerId:results.data.Space.partner.id,
              loading:false
             });
            //...

          })

  }

  onUpdatePress() {

     var that = this;
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            mutation updateBanner ($id: ID!, $title: String, $slug: String, $price: String, $imageId: String, $imageUrl: String, $description: String, $partnerId: ID){
              updateSpace (id: $id, title: $title, slug: $slug, price: $price, imageId: $imageId, imageUrl: $imageUrl, description: $description, partnerId: $partnerId,){
                id           
              }
            }
          `
          var queryVars = {
            id: this.state.id,
            title: this.state.title,
            slug: this.state.slug,
            price: this.state.price,
            partnerId: this.state.partnerId,
            imageUrl: this.state.imageUrl,
            imageId: this.state.imageId,
            description: this.state.description 
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

              toast('Update Space Success', { type: toast.TYPE.SUCCESS, autoClose: 2000 }, setTimeout("location.href = '/partners/all';",2000))
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

  render() {
   if (this.state.loading) {
      return (<div></div>)
    }

    var sluger =  slugify(this.state.title , {
                replacement: '-',    // replace spaces with replacement
                remove: /[$*_+~.()'"!\-:@,]/g,        // regex to remove characters
                lower: true          // result in lower case
              })
    
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

                 <div className="form-group row" style={{display:'none'}}>
                    <label className="col-md-3 form-control-label" htmlFor="text-input"></label>
                    <div className="col-md-9">
                      <input type="hidden" id="slug" value={sluger} name="slug" className="form-control" placeholder="Slug"
                      />
                     
                    </div>
                  </div>
                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Title</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.title} name="title" className="form-control" placeholder="Title"
                      onChange={(e) => this.setState({title: e.target.value})}
                      onKeyUp={(e) => this.setState({slug: document.getElementById("slug").value})}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Price</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.price} name="price" className="form-control" placeholder="price space"
                      onChange={(e) => this.setState({price: e.target.value})}
                      />
                    </div>
                  </div>
                 
                 
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="textarea-input">Description</label>
                    <div className="col-md-9">
                    
                    <ReactQuill theme="snow"
                    value={this.state.description}
                    modules={this.modules}
                    formats={this.formats}
                    placeholder="description"
                    onChange={this.handleChange}
                    >

                    </ReactQuill>
                    
                     
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
          
            <img src={this.state.imageUrl}  alt="avatar"/>
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
export default AddEditSpace;

