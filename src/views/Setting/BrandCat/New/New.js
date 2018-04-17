import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import PropTypes from 'prop-types';
import {MainLink, MainApi} from '../../../../views/Api/';
import Spinner from 'react-spinkit';


class NewBrandCategory extends Component {

  static propTypes = {
    router: PropTypes.object,
    addBrand: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { 
    slug: '',
    name: '',
    data:[],
    datax:[],

    }
    this.handleChange = this.handleChange.bind(this)
    this.handlePost = this.handlePost.bind(this)
  }

  
  componentDidMount() {
    var that = this;
    //that.getData();
    that.getMain();
      
  }


  handleChange(value) {
    this.setState({ description: value })
  }

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
  
renderKategori(){

  if (this.state.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }


      return(
      
        <select id="select" value={this.state.mainCategoryId}  name="mainCategoryId" className="form-control" onChange={(e) => this.setState({mainCategoryId: e.target.value})}>
                         <option>Parent Category</option>

            {this.state.datax.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                       ))}   
        </select>
      )
    
 }

  render() {
    
    var slugg = this.state.name;
    var slugx = slugg.replace(/\s+/g,"-");
    var sluger = slugx.toLowerCase();

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
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Name Category</label>
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
                    <label className="col-md-3 form-control-label" htmlFor="text-input"></label>
                    <div className="col-md-9">
                      <input type="hidden" id="slug" value={sluger} name="slug" className="form-control" placeholder="Slug"
                      />
                     
                    </div>
                  </div>
      
                 
                
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.handlePost}><i className="fa fa-dot-circle-o"></i> Submit</button>
                
                <Link to={'/setting/brand-category/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }

  handlePost = async () => {
    const {name, slug, mainCategoryId} = this.state
    await this.props.addBrand({variables: {name, slug, mainCategoryId}})

   window.location= MainLink + "setting/brand-category/all";
   //window.location.reload(true);
  }

}
const addMutation = gql`
  mutation addBrand($name: String!, $slug: String!, $mainCategoryId: ID) {
    createBrandCategory(name: $name, slug: $slug, mainCategoryId: $mainCategoryId) {
      id
    }
  }
`

const PageWithMutation = graphql(addMutation, { name: 'addBrand' })(NewBrandCategory)
export default withRouter(PageWithMutation)
