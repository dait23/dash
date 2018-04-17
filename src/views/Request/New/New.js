import React, { Component } from 'react';
import { Link} from 'react-router-dom'
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

class NewRequest extends Component {

  static propTypes = {
    router: PropTypes.object,
    addBanner: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { 
    data:[],
    datax:[],
    dataz:[],
    title: '',
    periode:'',
    follower:'',
    categoryId: '',
    userId: localStorage.getItem('uid'),
    typeId: '',
    uploadedFile: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeRe = this.handleChangeRe.bind(this)
    this.handlePost = this.handlePost.bind(this)
     this.handleChangex = this.handleChangex.bind(this)
    this.handleChangez = this.handleChangez.bind(this)
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
    that.getArea();
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
  ///////
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
           console.log(that.state.dataz);
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


////////////


  render() {
   
   if ( this.props.CatQuery.loading ) {
      return (<div><Spinner name="double-bounce" /></div>)
    }
     
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

              
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Title</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.title} name="title" className="form-control" placeholder="Title"
                      onChange={(e) => this.setState({title: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Category</label>
                    <div className="col-md-9">

                      <Select
                        name="categoryId"
                        value={this.state.categoryId}
                        onChange={this.handleChangex}
                        placeholder="Brand Category"
                        options={this.props.CatQuery.allBrandCategories.map((category) => (
                           
                           {value: category.id, label: category.name}


                          ))}
                      />
                    </div>
                  </div>
                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Type</label>
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
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Periode</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.periode} name="periode" className="form-control" placeholder="Periode"
                      onChange={(e) => this.setState({periode: e.target.value})}
                      />
                    </div>
                  </div>
                    <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Brand Follower</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.follower} name="follower" className="form-control" placeholder="Follower"
                      onChange={(e) => this.setState({follower: e.target.value})}
                      />
                    </div>
                  </div>
      
                 
            
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.handlePost}><i className="fa fa-dot-circle-o"></i> Save</button>
                
                <Link to={'/request/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }

  handlePost = async () => {
    const {title, periode, follower, categoryId, typeId, userId} = this.state
    await this.props.addRequest({variables: { title, periode, follower, categoryId, typeId, userId }})

   window.location= MainLink + "request/all";
   //window.location.reload(true);
  }

}
const addMutation = gql`
  mutation addRequest($title: String!, $periode: String, $follower: String, $categoryId: ID, $typeId: ID,  $userId: ID) {
    createRequest(
    title: $title, 
    periode:$periode,
    follower: $follower, 
    categoryId :$categoryId,
    typeId: $typeId,
    userId: $userId
    ) {
      id
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
  graphql(addMutation, { name: 'addRequest' }),
)(NewRequest)



// const Container = compose(
//   graphql(EntitiesQuery, { name: 'EntitiesQuery' }),
//   graphql(MeQuery, { name: 'MeQuery' }),
// )(Component);