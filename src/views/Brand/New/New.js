import React, { Component } from 'react';
import { Link} from 'react-router-dom'
import ReactQuill from "react-quill";
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import request from 'superagent';

import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import Select from 'react-select-plus';
import 'react-select-plus/dist/react-select-plus.css';
import {MainApi, MainLink, Cloudinary_Code, Cloudinary_Link} from '../../../views/Api/';


const CLOUDINARY_UPLOAD_PRESET = Cloudinary_Code;
const CLOUDINARY_UPLOAD_URL = Cloudinary_Link;

class NewBrand extends Component {

  static propTypes = {
    router: PropTypes.object,
    addBanner: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { 
    data:[],
    datax:[],
    address: '',
    name: '',
    phone: '',
    company:'',
    source: '',
    email: '',
    categoryId: '',
    userId: localStorage.getItem('uid'),
    typeId: '',
    remarks: '',
    facebook: '',
    follower: '',
    instagram: '',
    twitter: '',
    website: '',
    imageUrl:'',
    imageId:'',
    link:'',
    selectedOption: '',
    uploadedFile: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangex = this.handleChangex.bind(this)
    this.handleChangez = this.handleChangez.bind(this)
    this.handleChangeRe = this.handleChangeRe.bind(this)
    this.handlePost = this.handlePost.bind(this)
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
  componentDidMount() {
    var that = this;
    //that.getData();
    //that.getCategory();
    that.getType();
      
  }

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
              datax : results.data.allBrandTypes,
              loading: false

             });
            //...
           // console.log(that.state.dataz);
          })
  }

  handleChange(value) {
    this.setState({ address: value })
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


  modules = {
  toolbar: [
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    ['link', 'image']
  ]
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
formats = [
  'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet',
  'link', 'image', 
]




////////////

renderTipe(){

  if (this.state.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }


      return(
      
        <select id="select" value={this.state.typeId}  name="typeId" className="form-control" onChange={(e) => this.setState({typeId: e.target.value})}>
                        
             <option>Brand Type</option>
            {this.state.datax.map((tipe) => (
                        <option key={tipe.id} value={tipe.id}>{tipe.name}</option>
                       ))}   
        </select>
      )
    
 }


  render() {
   
   if ( this.props.CatQuery.loading ) {
      return (<div><Spinner name="double-bounce" /></div>)
    }
     //const { content } = this.state
    return (
      <div className="animated fadeIn">
            <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong>Add </strong> New 
              </div>
              <div className="card-block">
                <form className="form-horizontal">
                   <div className="row">
                   <div className="col-md-6">
                           
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Brand Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.name} name="name" className="form-control" placeholder="brand name"
                      onChange={(e) => this.setState({name: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Company Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.company} name="company" className="form-control" placeholder="company name"
                      onChange={(e) => this.setState({company: e.target.value})}
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
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Brand Follower</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.followere} name="follower" className="form-control" placeholder="brand follower"
                      onChange={(e) => this.setState({follower: e.target.value})}
                      />
                    </div>
                  </div>
                  
                     <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Website</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.website} name="website" className="form-control" placeholder="http://www.example.com"
                      onChange={(e) => this.setState({website: e.target.value})}
                      />
                    </div>
                  </div>
                       
                  <div className="form-group row">
                     <label className="col-md-3 form-control-label" htmlFor="textarea-input">Address</label>
                    <div className="col-md-9">
                    
                    <ReactQuill theme="snow"
                    value={this.state.address}
                    modules={this.modules}
                    formats={this.formats}
                    placeholder="address"
                    onChange={this.handleChange}
                    >

                    </ReactQuill>
                    
                     
                    </div>
                  </div>
              
                   </div>
                   <div className="col-md-6">


                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Brand Category</label>
                    <div className="col-md-9">
                       <Select
                        name="categoryId"
                        value={this.state.categoryId}
                        onChange={this.handleChangex}
                        options={this.props.CatQuery.allBrandCategories.map((category) => (
                           
                           {value: category.id, label: category.name}


                          ))}
                      />
                       
                    </div>
                  </div>
                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Brand Type</label>
                    <div className="col-md-9">
                      
                      <Select
                        name="typeIdId"
                        value={this.state.typeId}
                        onChange={this.handleChangez}
                        options={this.state.datax.map((tipe) => (
                           
                           {value: tipe.id, label: tipe.name}


                          ))}
                      />
                      
                    </div>
                  </div>

                   
                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Facebook</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.facebook} name="facebook" className="form-control" placeholder="https://facebook.com/"
                      onChange={(e) => this.setState({facebook: e.target.value})}
                      />
                    </div>
                  </div>
                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Instagram</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.instagram} name="instagram" className="form-control" placeholder="https://instagram.com/"
                      onChange={(e) => this.setState({instagram: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Twitter</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.twitter} name="twitter" className="form-control" placeholder="https://twitter.com/"
                      onChange={(e) => this.setState({twitter: e.target.value})}
                      />
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
                    onChange={this.handleChangeRe}
                    >

                    </ReactQuill>
                    
                     
                    </div>
                  </div>
                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Source</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.source} name="source" className="form-control" placeholder="Source scraping"
                      onChange={(e) => this.setState({source: e.target.value})}
                      />
                    </div>
                  </div>

                   </div>
                </div>
                
                 
      
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.handlePost}><i className="fa fa-dot-circle-o"></i> Save</button>
                
                <Link to={'/brand/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }

  handlePost = async () => {
   // const {name, email, phone, address, website, categoryId, typeId, facebook, instagram, twitter, remarks, userId, source, follower, company} = this.state
    await this.props.addBanner({variables: { 
       name : this.state.name,
       company : this.state.company,
       email: this.state.email,
       follower: this.state.follower,
       source: this.state.source, 
       phone: this.state.phone, 
       address: this.state.address, 
       website: this.state.website, 
       categoryId: this.state.categoryId, 
       typeId: this.state.typeId, 
       facebook: this.state.facebook, 
       instagram: this.state.instagram, 
       twitter: this.state.twitter, 
       remarks: this.state.remarks, 
       userId: this.state.userId,
      // to: this.state.email,
      // text: "Hai",
      // html: "<html> Hai, Apakah Kamu Brand / Merchant Owner dari <strong>"  + this.state.name+ "</strong> <br /> Apakah bisa minta kontaknya! Thanks </html>"

}})

   window.location= MainLink + "brand/all";
   //window.location.reload(true);
  }

}
const addMutation = gql`
  mutation addBanner($name: String!, $email: String, $address: String, $phone: String, $categoryId: ID, $typeId: ID, $facebook: String, $instagram: String, $website: String, $twitter: String, $remarks: String, $userId: ID,  $source: String, $follower: String, $company: String) {
    createBrand(
    name: $name, 
    company: $company,
    email:$email,
    follower:$follower,
    phone: $phone, 
    address: $address,
    categoryId :$categoryId,
    typeId: $typeId,
    userId: $userId,
    facebook: $facebook,
    source: $source,
    instagram: $instagram,
    twitter: $twitter,
    website: $website
    remarks: $remarks
    
    ) {
      id
      name
    }
  
  }
`
const CatQuery = gql`query allBrandCategories {
  allBrandCategories (orderBy: createdAt_DESC) {
    id
    name

  }
}
`

// const PageWithMutation = graphql(addMutation, { name: 'addBanner' })(NewBrand)

// export default withRouter(PageWithMutation)

export default compose(
  graphql(CatQuery, { name: 'CatQuery' }),
  graphql(addMutation, { name: 'addBanner' }),
)(NewBrand)



// const Container = compose(
//   graphql(EntitiesQuery, { name: 'EntitiesQuery' }),
//   graphql(MeQuery, { name: 'MeQuery' }),
// )(Component);