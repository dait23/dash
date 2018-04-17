import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
import {MainLink} from '../../../../views/Api/';


class NewPayment extends Component {

  static propTypes = {
    router: PropTypes.object,
    addPayment: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { 
    slug: '',
    name: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handlePost = this.handlePost.bind(this)
  }

  

  handleChange(value) {
    this.setState({ description: value })
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
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Title</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.name} name="name" className="form-control" placeholder="Name"
                      onChange={(e) => this.setState({name: e.target.value})}
                      onKeyUp={(e) => this.setState({slug: document.getElementById("slug").value})}
                      />
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
                
                <Link to={'/setting/payment/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }

  handlePost = async () => {
    const {name, slug} = this.state
    await this.props.addPayment({variables: {name, slug}})

   window.location= MainLink + "setting/payment/all";
   //window.location.reload(true);
  }

}
const addMutation = gql`
  mutation addPayment($name: String!, $slug: String!) {
    createPayment(name: $name, slug: $slug) {
      id
      name
      slug
    }
  }
`

const PageWithMutation = graphql(addMutation, { name: 'addPayment' })(NewPayment)
export default withRouter(PageWithMutation)
