import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import PropTypes from 'prop-types';
import {MainLink} from '../../../../views/Api/';



class NewSize extends Component {

  static propTypes = {
    router: PropTypes.object,
    addSize: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { 
    size: '',
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
                <strong>Add </strong> New Size
              </div>
              <div className="card-block">
                <form className="form-horizontal">
                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Size Space</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.size} name="size" className="form-control" placeholder="size"
                      onChange={(e) => this.setState({size: e.target.value})}
                
                      />
                    </div>
                  </div>
                 
             
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.handlePost}><i className="fa fa-dot-circle-o"></i> Submit</button>
                
                <Link to={'/setting/size/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }

  handlePost = async () => {
    const {size} = this.state
    await this.props.addSize({variables: {size}})

   window.location= MainLink + "setting/size/all";
   //window.location.reload(true);
  }

}
const addMutation = gql`
  mutation addSize($size: String!) {
    createWideSpace(size: $size) {
      id
    }
  }
`

const PageWithMutation = graphql(addMutation, { name: 'addSize' })(NewSize)
export default withRouter(PageWithMutation)
