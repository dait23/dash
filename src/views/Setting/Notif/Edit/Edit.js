import React, { Component } from 'react';
import { Link} from 'react-router-dom'
//import fetchCategory from './query';
import {MainApi} from '../../../../views/Api/';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';




class EditNotif extends Component {

  static propTypes = {
    router: PropTypes.object,
    //refresh: PropTypes.func,
  }


  constructor(props) {
    super(props)
    this.state = { 
    id: '',
    title: '',
    slug: '',
    loading: true
    }
   
    this.onUpdatePress = this.onUpdatePress.bind(this);
  }

 
  componentDidMount() {
    var that = this;
    that.getData();
      
  }

 
  getData(){
     var that = this;
     that.setState({
          loading: true
      });
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            query Notif($id: ID!) {
              NotifType(id: $id){
              id
              title
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
              data : results.data.NotifType,
              id:results.data.NotifType.id,
              title:results.data.NotifType.title,
              slug:results.data.NotifType.slug,
              loading:false
             });
            //...
          })

  }

  onUpdatePress() {

     var that = this;
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            mutation updateNotifType ($id: ID!, $title: String!, $slug: String!){
              updateNotifType (id: $id, title: $title, slug: $slug){
                id
                title
                slug              
              }
            }
          `
          var queryVars = {
            id: this.state.id,
            title: this.state.title,
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
   

 
 

  render() {
   
    if (this.state.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }

    var slugg = this.state.title;
    var slugx = slugg.replace(/\s+/g,"-");
    var sluger = slugx.toLowerCase();
  
    return (

            <div className="animated fadeIn">
            <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong>Edit </strong> Notif Type
              </div>
              <div className="card-block">
                <form className="form-horizontal">

                 
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Notif Title</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.title} name="title" className="form-control" placeholder="Title"
                      onChange={(e) => this.setState({title: e.target.value})}
                      onKeyUp={(e) => this.setState({slug: document.getElementById("slug").value})}
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
      
          
      
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.onUpdatePress}><i className="fa fa-dot-circle-o"></i> Submit</button>
                
                <Link to={'/setting/notif-type/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }


}
export default EditNotif;
