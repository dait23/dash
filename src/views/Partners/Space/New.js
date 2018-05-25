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

class AddSpace extends Component {

  static propTypes = {
    router: PropTypes.object,
    addBanner: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { 
    description: '',
    remarks:'',
    title: '',
    slug:'',
    imageUrl:'',
    imageId:'',
    partnerId: this.props.match.params.id,
    wideId:'',
    rentId:'',
    total:'',
    rules:'',
    nearby:'',
    visitor:'',
    price1:'',
    price7:'',
    price30:'',
    loading: true,
    datax: [],
    uploadedFile: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handlePost = this.handlePost.bind(this)
    this.handleChangex = this.handleChangex.bind(this)
    this.handleChangez = this.handleChangez.bind(this)
    this.handleChangeRent = this.handleChangeRent.bind(this)
    this.handleChangeRule = this.handleChangeRule.bind(this)
    this.handleChangeNearby = this.handleChangeNearby.bind(this)
    this.handleChangeVisit = this.handleChangeVisit.bind(this)
  }


 componentDidMount() {
    var that = this;
    that.getRent();
      
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

   handleChangeRent = (rentId) => {
        this.setState({ rentId : rentId.value});
        //console.log(`rent: ${rentId.value}`);
  }

  handleChange(value) {
    this.setState({ description: value })
  }
   handleChangeRule(value) {
    this.setState({ rules: value })
  }
   handleChangeNearby(value) {
    this.setState({ nearby: value })
  }
  handleChangeVisit(value) {
    this.setState({ visitor: value })
  }
   handleChangez(value) {
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


renderSize(){


 if (this.props.data.loading) {
      return (<div></div>)
    }

    return(

      <Select
                        name="wideId"
                        placeholder="Select Size"
                        value={this.state.wideId}
                        onChange={this.handleChangex}
                        options={this.props.data.allWideSpaces.map((wide) => (
                           
                           {value: wide.id, label: wide.size}


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
   // const { content } = this.state
    return (
      <div className="animated fadeIn">
       <ToastContainer autoClose={2000} />
            <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong>Add </strong> New Spaces
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
                     {this.renderSize()}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Total Space</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.total} name="total" className="form-control" placeholder="Total"
                      onChange={(e) => this.setState({total: e.target.value})}
                     
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
                    <label className="col-md-3 form-control-label" htmlFor="textarea-input">Peraturan Space</label>
                    <div className="col-md-9">
                    
                    <ReactQuill theme="snow"
                    value={this.state.rules}
                    modules={this.modules}
                    formats={this.formats}
                    placeholder="Peraturan Space"
                    onChange={this.handleChangeRule}
                    >

                    </ReactQuill>
                    
                     
                    </div>
                  </div>


                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="textarea-input">Nearby Space</label>
                    <div className="col-md-9">
                    
                    <ReactQuill theme="snow"
                    value={this.state.nearby}
                    modules={this.modules}
                    formats={this.formats}
                    placeholder="Nearby Space"
                    onChange={this.handleChangeNearby}
                    >

                    </ReactQuill>
                    
                     
                    </div>
                  </div>


                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="textarea-input">Visitor Space</label>
                    <div className="col-md-9">
                    
                    <ReactQuill theme="snow"
                    value={this.state.visitor}
                    modules={this.modules}
                    formats={this.formats}
                    placeholder="Visitor Space"
                    onChange={this.handleChangeVisit}
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
    const {title, slug, price1, price7, price30, description, remarks, imageUrl, imageId,  partnerId, wideId, visitor, rules, total, nearby} = this.state
    await this.props.addBanner({variables: { title, slug,  description, remarks, imageUrl, imageId,  partnerId, wideId, price1, price7, price30, visitor, rules, total, nearby}})


   toast('Add Space Success', { type: toast.TYPE.SUCCESS, autoClose: 2000 }, setTimeout("location.href = '/partners/all';",2000))
  }

}
const addMutation = gql`
  mutation addBanner(
  
  $title:String, 
  $slug:String, 
  $description: String, 
  $remarks: String, 
  $price1: String, 
  $price7: String,
  $price30: String,  
  $partnerId: ID,
  $wideId: ID,
  $imageUrl: String,
  $imageId: String,
  $visitor: String,
  $rules: String, 
  $total: String, 
  $nearby: String



  ) {
    createSpace(
  
    title: $title
    slug: $slug
    description:$description
    remarks:$remarks
    price1: $price1
    price7: $price7
    price30: $price30
    partnerId:$partnerId
    imageUrl: $imageUrl
    imageId: $imageId
    wideId: $wideId
    visitor: $visitor, 
    rules: $rules, 
    total: $total, 
    nearby: $nearby



    ) {
      id
    }
  }
`

const FeedQuery = gql`query allTopics {
  allWideSpaces {
    id
    size
  }
}
`



export default compose(
  graphql(FeedQuery),
  graphql(addMutation, { name: 'addBanner' }),
)(withRouter(AddSpace))
