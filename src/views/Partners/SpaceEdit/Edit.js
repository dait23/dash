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
     remarks:'',
    title: '',
    slug:'',
    imageUrl:'',
    imageId:'',
      wideId:'',
      rentId:'',
    partnerId: '',
    price1:'',
    price7:'',
    price30:'',
    datax:[],
    loading: true,
    uploadedFile: null

    }
   
    this.handleDes = this.handleDes.bind(this)
    this.onUpdatePress = this.onUpdatePress.bind(this);
    this.handleChangex = this.handleChangex.bind(this)
     this.handleChangez = this.handleChangez.bind(this)
     this.handleChangeRent = this.handleChangeRent.bind(this)
  }
  
 getRent(){
     var that = this;
     
     var fetch = require('graphql-fetch')(MainApi)
      var query = `
            query allBrandTypes{
              allRentTypes (orderBy: createdAt_DESC) {
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
              datax : results.data.allRentTypes,
              loading: false

             });
            //...
           console.log(that.state.datax);
          })
  }
  //////////
       handleChangex = (wideId) => {
        this.setState({ wideId : wideId.value});
        //console.log(`category: ${categoryId.value}`);
      }
  
    handleDes(value) {
    this.setState({ description: value});
  }
   handleChangez(value) {
    this.setState({ remarks: value })
  }
 
 handleChangeRent = (rentId) => {
        this.setState({ rentId : rentId.value});
        //console.log(`rent: ${rentId.value}`);
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
    that.getRent();
      
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
              remarks
              price1
              price7
              price30
              imageId
              imageUrl
              partner{
                id
              }
              rent{
                id
                name
              }
              wide{
                id
                size
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
              price1:results.data.Space.price1,
              price7:results.data.Space.price7,
              price30:results.data.Space.price30,
              imageUrl:results.data.Space.imageUrl,
              imageId:results.data.Space.imageId,
              description:results.data.Space.description,
              remarks:results.data.Space.remarks,
              partnerId:results.data.Space.partner.id,
              wideId:results.data.Space.wide.id,
              // rentId:results.data.Space.rent.id,
              loading:false
             });
            //...

          })

  }

  onUpdatePress() {

     var that = this;
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            mutation updateBanner ($id: ID!, $title: String, $slug: String, $price1: String, $price7: String, $price30: String, $imageId: String, $imageUrl: String, $description: String, $remarks: String,  $partnerId: ID){
              updateSpace (id: $id, title: $title, slug: $slug, price1: $price1, price7: $price7, price30: $price30, imageId: $imageId, imageUrl: $imageUrl, description: $description, remarks: $remarks, partnerId: $partnerId){
                id           
              }
            }
          `
          var queryVars = {
            id: this.state.id,
            title: this.state.title,
            slug: this.state.slug,
            price1: this.state.price1,
            price7: this.state.price7,
            price30: this.state.price30,
            partnerId: this.state.partnerId,
            imageUrl: this.state.imageUrl,
            imageId: this.state.imageId,
            description: this.state.description,
            remarks: this.state.remarks
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



renderRent(){

  if (this.state.loading) {
      return (<div></div>)
    }

    return(

      <Select
                        name="rentId"
                        placeholder="Waktu Sewa"
                        value={this.state.rentId}
                        onChange={this.handleChangeRent}
                        options={this.state.datax.map((rent) => (
                           
                           {value: rent.id, label: rent.name}


                          ))}
                      />

    )

}

  render() {
    if (this.props.data.loading) {
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
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Size</label>
                    <div className="col-md-9">
                      <Select
                        name="wideId"
                        placeholder="Select Size"
                        value={this.state.wideId}
                        onChange={this.handleChangex}
                        options={this.props.data.allWideSpaces.map((wide) => (
                           
                           {value: wide.id, label: wide.size}


                          ))}
                      />
                    </div>
                  </div>



                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Harga / hari</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.price1} name="price1" className="form-control" placeholder="Harga / hari"
                      onChange={(e) => this.setState({price1: e.target.value})}
                      />
                    </div>
                  </div>
                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Harga / minggu</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.price7} name="price7" className="form-control" placeholder="Harga / minggu"
                      onChange={(e) => this.setState({price7: e.target.value})}
                      />
                    </div>
                  </div>
                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Harga / bulan</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.price30} name="price30" className="form-control" placeholder="Harga / bulan"
                      onChange={(e) => this.setState({price30: e.target.value})}
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
                    <label className="col-md-3 form-control-label" htmlFor="textarea-input">Remarks</label>
                    <div className="col-md-9">
                    
                    <ReactQuill theme="snow"
                    value={this.state.remarks}
                    modules={this.modules}
                    formats={this.formats}
                    placeholder="remarks"
                    onChange={this.handleChangez}
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

const FeedQuery = gql`query allTopics {
  allWideSpaces {
    id
    size
  }
}
`


export default compose(
  graphql(FeedQuery)
)(withRouter(AddEditSpace))

