import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import PropTypes from 'prop-types';
import {MainLink} from '../../../../views/Api/';



class NewRent extends Component {

  static propTypes = {
    router: PropTypes.object,
    addSize: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { 
    name: '',
    }
    this.handlePost = this.handlePost.bind(this)
  }

  



  render() {

    // var slugg = this.state.name;
    // var slugx = slugg.replace(/\s+/g,"-");
    // var sluger = slugx.toLowerCase();

    return (
      <div className="animated fadeIn">
            <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong>Add </strong> New Rent
              </div>
              <div className="card-block">
                <form className="form-horizontal">
                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.name} name="size" className="form-control" placeholder="name"
                      onChange={(e) => this.setState({name: e.target.value})}
                
                      />
                    </div>
                  </div>
                 
             
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.handlePost}><i className="fa fa-dot-circle-o"></i> Submit</button>
                
                <Link to={'/setting/rent-type/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }

  handlePost = async () => {
    const {name} = this.state
    await this.props.addSize({variables: {name}})

   window.location= MainLink + "setting/rent-type/all";
   //window.location.reload(true);
  }

}
const addMutation = gql`
  mutation addSize($name: String) {
    createRentType(name: $name) {
      id
    }
  }
`

const PageWithMutation = graphql(addMutation, { name: 'addSize' })(NewRent)
export default withRouter(PageWithMutation)
