import React, { Component } from 'react';
import { Link} from 'react-router-dom'
import {MainApi} from '../../../../views/Api/';
import ReactQuill from "react-quill";
//import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
//const history = createBrowserHistory();


//var fetch = require('graphql-fetch')('https://api.graph.cool/simple/v1/cj5nbkzhsejyd0122xngrnr17')



class EditPage extends Component {

  static propTypes = {
    router: PropTypes.object,
    updatePages: PropTypes.func,
    //refresh: PropTypes.func,
  }


  constructor(props) {
    super(props)
    this.state = { 
    id: '',
    title: '',
    description: '',
    slug: '',
    loading: true
    }
    this.handleChange = this.handleChange.bind(this)
    //this.handleSlug = this.handleSlug.bind(this)
    //this.handlePost = this.handlePost.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
     this.handleDes = this.handleDes.bind(this)
    this.onUpdatePress = this.onUpdatePress.bind(this);
  }

  handleNameChange(e) {
     this.setState({title: e.target.value});
   }

   

   
    handleChange(value) {
      this.setState({slug: document.getElementById("slug").value });
    }

    handleDes(value) {
    this.setState({ description: value});
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
            query Page($id: ID!) {
              Page(id: $id){
              id
              title
              description
              slug
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
              data : results.data.Page,
              id:results.data.Page.id,
              title:results.data.Page.title,
              slug:results.data.Page.slug,
              description:results.data.Page.description,
              loading:false
             });
            //...
          })

  }

  onUpdatePress() {

     var that = this;
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            mutation updatePages ($id: ID!, $title: String!, $slug: String!, $description: String!){
              updatePage (id: $id, title: $title, slug: $slug, description: $description){
                id
                title
                slug 
                description              
              }
            }
          `
          var queryVars = {
            id: this.state.id,
            title: this.state.title,
            slug: this.state.slug,
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

  render() {
    if (this.state.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }

    var slugg = this.state.title;
    var slugx = slugg.replace(/\s+/g,"-");
    var sluger = slugx.toLowerCase();
 
   //if (!BlogCategory) { 

    //return <div><Loader color="#26A65B" size="12px" margin="4px"/></div>; 


   //}
    
    return (

            <div className="animated fadeIn">
            <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong>Edit </strong> Pages
              </div>
              <div className="card-block">
                <form className="form-horizontal">
                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Title Page</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.title} name="title" className="form-control" placeholder="Title"
                       onChange={this.handleNameChange}
                       onKeyUp={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Slug</label>
                    <div className="col-md-9">
                      <input disabled type="text" id="slug" value={sluger} name="slug" className="form-control" placeholder="Slug"
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
                    onChange={this.handleDes}
                    >

                    </ReactQuill>
                    
                     
                    </div>
                  </div>
      
                 
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.onUpdatePress}><i className="fa fa-dot-circle-o"></i> Submit</button>
                
                <Link to={'/page/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }


}
export default EditPage;

