import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
import {MainLink} from '../../../../views/Api/';


class NewEmployment extends Component {

  static propTypes = {
    router: PropTypes.object,
    addTipe: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { 
    title: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handlePost = this.handlePost.bind(this)
  }

  

  handleChange(value) {
    this.setState({ description: value })
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
                <strong>Add </strong> Employment
              </div>
              <div className="card-block">
                <form className="form-horizontal">
                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Title</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.title} name="name" className="form-control" placeholder="Title"
                      onChange={(e) => this.setState({title: e.target.value})}
                      />
                    </div>
                  </div>
                
                 
                
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.handlePost}><i className="fa fa-dot-circle-o"></i> Submit</button>
                
                <Link to={'/setting/employment/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }

  handlePost = async () => {
    const {title} = this.state
    await this.props.addEmployment({variables: {title}})

   window.location= MainLink + "setting/employment/all";
   //window.location.reload(true);
  }

}
const addMutation = gql`
  mutation addEmployment($title: String!) {
    createEmployment(title: $title) {
      id
      title
    }
  }
`

const PageWithMutation = graphql(addMutation, { name: 'addEmployment' })(NewEmployment)
export default withRouter(PageWithMutation)
