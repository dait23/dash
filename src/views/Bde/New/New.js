import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import PropTypes from 'prop-types';
import {MainLink} from '../../../views/Api/';



class NewBde extends Component {

  static propTypes = {
    router: PropTypes.object,
    data: PropTypes.object,
    addCustomer: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { 
      firstName:'',
      lastName:'',
      password: '',
      name: '',
      jabatan:'Bde',
      email: '',
    }
    //this.handleChange = this.handleChange.bind(this)
    //this.handleSlug = this.handleSlug.bind(this)
    this.handlePost = this.handlePost.bind(this)
  }

   componentDidMount() {
       this.forceUpdate();
  }

  
  

  render() {

 

    return (
      <div className="animated fadeIn">
            <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong>Add </strong> New BDE
              </div>
              <div className="card-block">
                <form className="form-horizontal">
                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">First Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.firstName} name="firstName" className="form-control" placeholder="First Name"
                       onChange={(e) => this.setState({firstName: e.target.value})}
                      />
                    </div>
                  </div>

                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Last Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.LastName} name="lastName" className="form-control" placeholder="Last Name"
                       onChange={(e) => this.setState({lastName: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Email</label>
                    <div className="col-md-9">
                      <input type="email" id="text-input" value={this.state.email} name="email" className="form-control" placeholder="Email"
                       onChange={(e) => this.setState({email: e.target.value})}
                      />
                    </div>
                  </div>
                 <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Password</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.password} name="password" className="form-control" placeholder="Password"
                       onChange={(e) => this.setState({password: e.target.value})}
                      />
                    </div>
                  </div>

                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.handlePost}><i className="fa fa-dot-circle-o"></i> Submit</button>
                
                <Link to={'/bde/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }
  
  handlePost = async () => {
    const {firstName, lastName, email, password, jabatan,} = this.state
    await this.props.addUser({variables: {email, password, firstName, lastName, jabatan}})

   window.location= MainLink + "bde/all";
   //window.location.reload(true);
  }

}
const addMutation = gql`
 mutation SignupUserMutation ($email: String!, $password: String!, $jabatan: String, $firstName: String, $lastName: String) {
    signupBde(email: $email, password: $password, jabatan: $jabatan, firstName: $firstName, lastName: $lastName) {
      id
      token
    }
  }
`


const PageWithMutation = graphql(addMutation, { name: 'addUser' })(NewBde)

export default withRouter(PageWithMutation)