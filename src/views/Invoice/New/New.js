import React, { Component } from 'react';
import { Link} from 'react-router-dom'
import ReactQuill from "react-quill";
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import request from 'superagent';

import PropTypes from 'prop-types';

import { MainLink, Cloudinary_Code, Cloudinary_Link} from '../../../views/Api/';


const CLOUDINARY_UPLOAD_PRESET = Cloudinary_Code;
const CLOUDINARY_UPLOAD_URL = Cloudinary_Link;

class NewInvoice extends Component {

  static propTypes = {
    router: PropTypes.object,
    addInvoice: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { 
    data:[],
    datax:[],
    invoiceId: '',
    title: '',
    description: '',
    quantity: '',
    price: '',
    total:'',
    userId: localStorage.getItem('uid'),
    link:'',
    uploadedFile: null
    }
    this.handleChangeRe = this.handleChangeRe.bind(this)
    this.handlePost = this.handlePost.bind(this)
  }

  


  handleChangeRe(value) {
    this.setState({ description: value })
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



  render() {
   
  
     // var total = this.state.total;
      var totaler= this.state.price * this.state.quantity;
     //var sluger = slugx.toLowerCase();
    return (
      <div className="animated fadeIn">
            <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong>Add </strong> New Invoice
              </div>
              <div className="card-block">
                <form className="form-horizontal">

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Invoice Id</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.invoiceId} name="invoiceId" className="form-control" placeholder="Invoice Number"
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
                       onKeyUp={(e) => this.setState({total: document.getElementById("total").value})}
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
                    onChange={this.handleChangeRe}
                    >

                    </ReactQuill>
                    
                     
                    </div>
                  </div>
      
                 
            
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.handlePost}><i className="fa fa-dot-circle-o"></i> Save</button>
                
                <Link to={'/invoice/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }

  handlePost = async () => {
    //const {title, invoiceId, description, quantity, price, total, userId} = this.state
    await this.props.addInvoice({variables: { 
      title : this.state.title, 
      invoiceId :this.state.invoiceId, 
      description :this.state.description, 
      quantity: parseInt(this.state.quantity, 10), 
      price: this.state.price, 
      total: this.state.total, 
      userId: this.state.userId

    }})

   window.location= MainLink + "invoice/all";
   //window.location.reload(true);
  }

}
const addMutation = gql`
  mutation addInvoice($title: String!, $invoiceId: String, $description: String, $quantity: Int, $price: String, $total: String, $userId: ID) {
    createInvoice(
    title: $title, 
    invoiceId:$invoiceId,
    description: $description, 
    quantity: $quantity,
    price :$price,
    total: $total,
    userId: $userId,
    
    ) {
      id
    }
  }
`


// const PageWithMutation = graphql(addMutation, { name: 'addBanner' })(NewBrand)

// export default withRouter(PageWithMutation)

export default compose(
  graphql(addMutation, { name: 'addInvoice' })
)(NewInvoice)



// const Container = compose(
//   graphql(EntitiesQuery, { name: 'EntitiesQuery' }),
//   graphql(MeQuery, { name: 'MeQuery' }),
// )(Component);