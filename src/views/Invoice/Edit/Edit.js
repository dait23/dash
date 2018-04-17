import React, { Component } from 'react';
import { Link} from 'react-router-dom'

import {MainApi,  Cloudinary_Code, Cloudinary_Link} from '../../../views/Api/';
import request from 'superagent';
import ReactQuill from "react-quill";

import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';



//var fetch = require('graphql-fetch')('https://api.graph.cool/simple/v1/cj5nbkzhsejyd0122xngrnr17')

const CLOUDINARY_UPLOAD_PRESET = Cloudinary_Code;
const CLOUDINARY_UPLOAD_URL = Cloudinary_Link;


class EditInvoice extends Component {

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
    invoiceId: '',
    title: '',
    description: '',
    quantity: '',
    price: '',
    total:'',
    link:'',
    uploadedFile: null

    }
   
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeRe = this.handleChangeRe.bind(this)
    this.onUpdatePress = this.onUpdatePress.bind(this);
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
      
  }

  //componentWillUnmount() {
    // this.getData();
 //}




  ///////////////
 
  getData(){
     var that = this;
     that.setState({
          loading: true
      });
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            query Brand($id: ID!) {
              Invoice(id: $id){
               id
              invoiceId
              title
              description
              quantity
              price
              total
              user{
                id
                mdm{
                  firstName
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
              data : results.data.Invoice,
              id:results.data.Invoice.id,
              invoiceId:results.data.Invoice.invoiceId,
              title:results.data.Invoice.title,
              phone:results.data.Invoice.phone,
              description:results.data.Invoice.description,
              quantity:results.data.Invoice.quantity,
              price:results.data.Invoice.price,
              total:results.data.Invoice.total,
              userId:results.data.Invoice.user.id,
              loading:false
             });
            //...console.log(that.state.dataz);
           console.log(that.state.id);
          })

  }

  onUpdatePress() {

     var that = this;
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            mutation updateBrand (
              $id: ID!,
              $invoiceId: String, 
              $title: String, 
              $description: String, 
              $quantity: Int, 
              $price: String, 
              $total: String, 
              $userId: ID
            ){
              updateInvoice (
              id: $id,
              invoiceId: $invoiceId, 
              title: $title, 
              description: $description, 
              quantity: $quantity, 
              price: $price, 
              total: $total, 
              userId: $userId
              ){
                id           
              }
            }
          `
          var queryVars = {
            id: this.state.id,
            title: this.state.title,
            invoiceId: this.state.invoiceId,
            description: this.state.description,
            quantity: parseInt(this.state.quantity, 10),
            price: this.state.price,
            total: this.state.total,
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



  render() {
    //var total = this.state.total;
      var totaler= this.state.price * this.state.quantity;
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
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Invoice ID</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.invoiceId} name="invoiceId" className="form-control" placeholder=" Invoice Number"
                      onChange={(e) => this.setState({invoiceId: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Title</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.title} name="title" className="form-control" placeholder="Title"
                      onChange={(e) => this.setState({title: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Quantity</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.quantity} name="quantity" className="form-control" placeholder="Quantity"
                      onChange={(e) => this.setState({quantity: e.target.value})}
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
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Total</label>
                    <div className="col-md-9">
                      <input type="text" id="total" value={totaler} name="total" className="form-control" placeholder="Total Price"
                      onChange={(e) => this.setState({total: e.target.value})}
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
                    placeholder="Description"
                    onChange={this.handleChange}
                    >

                    </ReactQuill>
                    
                     
                    </div>
                  </div>
            
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.onUpdatePress}><i className="fa fa-dot-circle-o"></i> Update</button>
                
                <Link to={'/invoice/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }


}
export default EditInvoice;

