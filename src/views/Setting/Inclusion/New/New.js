import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import PropTypes from 'prop-types';
import {MainLink} from '../../../../views/Api/';



class NewInclusion extends Component {

  static propTypes = {
    router: PropTypes.object,
    addBrand: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { 
    name: '',
    }
    this.handlePost = this.handlePost.bind(this)
  }

  




  render() {

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
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.name} name="name" className="form-control" placeholder="Name"
                      onChange={(e) => this.setState({name: e.target.value})}

                      />
                    </div>
                  </div>
                 
                 
    
                
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.handlePost}><i className="fa fa-dot-circle-o"></i> Submit</button>
                
                <Link to={'/setting/inclusion/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }

  handlePost = async () => {
    const {name} = this.state
    await this.props.addBrand({variables: {name}})

   window.location= MainLink + "setting/inclusion/all";
   //window.location.reload(true);
  }

}
const addMutation = gql`
  mutation addBrand($name: String!) {
    createInclusion(name: $name) {
      id
    }
  }
`

const PageWithMutation = graphql(addMutation, { name: 'addBrand' })(NewInclusion)
export default withRouter(PageWithMutation)
