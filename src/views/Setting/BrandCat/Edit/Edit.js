import React, { Component } from 'react';
import { Link} from 'react-router-dom'
//import fetchCategory from './query';
import {MainApi} from '../../../../views/Api/';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
//const history = createBrowserHistory();




class EditBrandCategory extends Component {

  static propTypes = {
    router: PropTypes.object,
    //refresh: PropTypes.func,
  }


  constructor(props) {
    super(props)
    this.state = { 
    id: '',
    name: '',
     slug: '',
     datax:[],
     categoryId:'',
    loading: true
    }
   
    this.onUpdatePress = this.onUpdatePress.bind(this);
  }

 
  componentDidMount() {
    var that = this;
    that.getData();
    that.getMain();
      
  }

 ////////////////////
  getData(){
     var that = this;
     that.setState({
          loading: true
      });
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            query Brand($id: ID!) {
              BrandCategory(id: $id){
              id
              name
              slug
              mainCategory{
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
            if (results.errors) {
              //...
              return
            }
            //var BlogCategory = results.data.BlogCategory

            that.setState({
              data : results.data.BrandCategory,
              id:results.data.BrandCategory.id,
              name:results.data.BrandCategory.name,
              categoryId:results.data.BrandCategory.mainCategory.id,
              slug:results.data.BrandCategory.slug,
              loading:false
             });
            //...
          })

  }/////////////////


   getMain(){
     var that = this;
     that.setState({
          loading: true
      });
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            query Brand {
              allMainCategories{
              id
              name
            }
            }
          `
          var queryVars = {
           // id: this.props.match.params.id
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
              datax : results.data.allMainCategories,
              loading:false
             });
            //...
          })

  }/////////////////


  onUpdatePress() {

     var that = this;
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            mutation updateBrandCategory ($id: ID!, $name: String!, $slug: String!){
              updateBrandCategory (id: $id, name: $name, slug: $slug){
                id
                name
                slug              
              }
            }
          `
          var queryVars = {
            id: this.state.id,
            name: this.state.name,
            slug: this.state.slug 
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
   

 
renderKategori(){

  if (this.state.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }


      return(
      
        <select id="select" value={this.state.categoryId}  name="categoryId" className="form-control" onChange={(e) => this.setState({categoryId: e.target.value})}>
                        

            {this.state.datax.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                       ))}   
        </select>
      )
    
 }
////////////
 

  render() {
   
    if (this.state.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }

    var slugg = this.state.name;
    var slugx = slugg.replace(/\s+/g,"-");
    var sluger = slugx.toLowerCase();
  
    return (

            <div className="animated fadeIn">
            <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong>Edit </strong> Brand Category
              </div>
              <div className="card-block">
                <form className="form-horizontal">

                 
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.name} name="name" className="form-control" placeholder="Name"
                      onChange={(e) => this.setState({name: e.target.value})}
                      onKeyUp={(e) => this.setState({slug: document.getElementById("slug").value})}
                      />
                     
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Parent Category</label>
                    <div className="col-md-9">
                      
                         {this.renderKategori()}
                      
                    </div>
                  </div>
                 
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Slug</label>
                    <div className="col-md-9">
                      <input disabled type="text" id="slug" value={sluger} name="slug" className="form-control" placeholder="Slug"
                      />
                     
                    </div>
                  </div>
      
          
      
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.onUpdatePress}><i className="fa fa-dot-circle-o"></i> Submit</button>
                
                <Link to={'/setting/brand-category/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }


}
export default EditBrandCategory;
