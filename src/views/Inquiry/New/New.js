import React, { Component } from 'react';
import { Link} from 'react-router-dom'

import ReactQuill from "react-quill";
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'


import request from 'superagent';

import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import { Multiselect, Combobox } from 'react-widgets'
import {MainApi, MainLink, Cloudinary_Code, Cloudinary_Link} from '../../../views/Api/';


const CLOUDINARY_UPLOAD_PRESET = Cloudinary_Code;
const CLOUDINARY_UPLOAD_URL = Cloudinary_Link;

class NewInquiry extends Component {

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
    datay:[],
    title: '',
    wide:'',
    price: '',
    facilitiesIds:'',
    categoryId: '',
    userId: localStorage.getItem('uid'),
    typeId: '',
    areaId:'',
    remarks: '',
    uploadedFile: null
    }
    this.handleSelectChange = this.handleSelectChange.bind(this)
     this.handleFaciChange = this.handleFaciChange.bind(this)
    this.handleTipeChange = this.handleTipeChange.bind(this)
     this.handleCatChange = this.handleCatChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeRe = this.handleChangeRe.bind(this)
    this.handlePost = this.handlePost.bind(this)
  }

  handleFaciChange (value) {

    const map1 = value.map(x => x.id);
    //const xxx = map1.toString();
     //const xxx = map1.join();
    //console.log('You\'ve selected:', map1);
    this.setState({ facilitiesIds: map1 });


     console.log('You\'ve selected fasilitas:', map1);
  }

   handleSelectChange (value) {

    //const map1 = value.map(x => x.id);
    //const xxx = map1.toString();
     //const xxx = map1.join();
    console.log('You\'ve area:', value.id);
    this.setState({ areaId: value.id });


     //console.log('You\'ve selectedxx:', map1);
  }
   handleTipeChange (value) {

    //const map1 = value.map(x => x.id);
    //const xxx = map1.toString();
     //const xxx = map1.join();
    console.log('You\'ve tipe:', value.id);
    this.setState({ typeId: value.id });


     //console.log('You\'ve selectedxx:', map1);
  }

   handleCatChange (value) {

    console.log('You\'ve tipe:', value.id);
    this.setState({ categoryId: value.id });
  }

  componentDidMount() {
    var that = this;
    //that.getData();
    that.getArea();
    that.getType();
    that.getFasilitas();
      
  }

//////////////////////////////// Fasilitas
getFasilitas(){
     var that = this;
     
     var fetch = require('graphql-fetch')(MainApi)
      var query = `
            query allFacilities{
              allFacilities (orderBy: name_ASC) {
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
              datay : results.data.allFacilities,
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
//////////////////////////////// Tipe
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


renderArea(){

   if (this.state.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }


      return(
      
        <select id="select" value={this.state.areaId}  name="areaId" className="form-control" onChange={(e) => this.setState({areaId: e.target.value})}>
                        
             <option>Area / Region</option>
            {this.state.dataz.map((tipe) => (
                        <option key={tipe.id} value={tipe.id}>{tipe.name}</option>
                       ))}   
        </select>
      )
   
}

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
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Project Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.title} name="title" className="form-control" placeholder="Title"
                      onChange={(e) => this.setState({title: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Budget</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.price} name="price" className="form-control" placeholder="Price"
                      onChange={(e) => this.setState({price: e.target.value})}
                      />
                    </div>
                  </div>
                    <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Wide Space</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.wide} name="wiede" className="form-control" placeholder="Wide Space"
                      onChange={(e) => this.setState({wide: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Area / Region</label>
                    <div className="col-md-9">
                      
                         <Combobox
                            onChange={this.handleSelectChange}
                            data={this.state.dataz.map((area) => (
                           
                           {id: area.id, name: area.name}

                         
                          ))}
                            valueField='id'
                            textField='name'
                            placeholder="area / regional"
                          />
                      
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Category</label>
                    <div className="col-md-9">
                     


                      <Combobox
                            onChange={this.handleCatChange}
                            data={this.props.CatQuery.allBrandCategories.map((category) => (
                           
                           {id: category.id, name: category.name}

                         
                          ))}
                            valueField='id'
                            textField='name'
                            placeholder="brand category"
                          />
                    </div>
                  </div>
                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Type</label>
                    <div className="col-md-9">
                      
                        <Combobox
                            onChange={this.handleTipeChange}
                            data={this.state.datax.map((tipe) => (
                           
                           {id: tipe.id, name: tipe.name}

                         
                          ))}
                            valueField='id'
                            textField='name'
                            placeholder="brand type"
                          />
                      
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Facility</label>
                    <div className="col-md-9">
                      <Multiselect
                       onChange={this.handleFaciChange}
                        data={this.state.datay.map((fasilitas) => (
                           
                           {id: fasilitas.id, name: fasilitas.name}

                         
                          ))}
                        valueField='id'
                        textField='name'
                        placeholder="Facility"
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
                    placeholder="description"
                    onChange={this.handleChangeRe}
                    >

                    </ReactQuill>
                    
                     
                    </div>
                  </div>
      
                 
            
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.handlePost}><i className="fa fa-dot-circle-o"></i> Save</button>
                
                <Link to={'/inquiry/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }

  handlePost = async () => {
    const {title, wide, price, categoryId, typeId, areaId, userId, remarks, facilitiesIds} = this.state
    await this.props.addBanner({variables: { title, wide, price, categoryId, typeId, areaId, userId, remarks, facilitiesIds }})

   window.location= MainLink + "inquiry/all";
   //window.location.reload(true);
  }

}
const addMutation = gql`
  mutation addBanner($title: String , $wide: String, $price: String, $categoryId: ID, $typeId: ID, $areaId: ID, $userId: ID, $remarks: String, $facilitiesIds: [ID!]) {
    createInquiry(
    title: $title, 
    wide:$wide,
    price: $price, 
    remarks: $remarks,
    categoryId :$categoryId,
    typeId: $typeId,
    areaId: $areaId,
    userId: $userId,
    facilitiesIds: $facilitiesIds
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
  graphql(addMutation, { name: 'addBanner' }),
)(NewInquiry)



// const Container = compose(
//   graphql(EntitiesQuery, { name: 'EntitiesQuery' }),
//   graphql(MeQuery, { name: 'MeQuery' }),
// )(Component);