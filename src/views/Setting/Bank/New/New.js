import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
import {MainLink} from '../../../../views/Api/';

//const history = createBrowserHistory();

class NewBank extends Component {

  static propTypes = {
    router: PropTypes.object,
    addBank: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { 
    name: '',
    number: '',
    description: '',
    }
    //this.handleChange = this.handleChange.bind(this)
    this.handlePost = this.handlePost.bind(this)
  }

  

  // handleChange(value) {
  //   this.setState({ description: value })
  // }


  


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
                <strong>Add </strong> New
              </div>
              <div className="card-block">
                <form className="form-horizontal">
                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Bank Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.name} name="name" className="form-control" placeholder="Bank Name"
                      onChange={(e) => this.setState({name: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Bank Numbers</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.number} name="number" className="form-control" placeholder="Bank Numbers"
                      onChange={(e) => this.setState({number: e.target.value})}
                      />
                    </div>
                  </div>
                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Account Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.description} name="description" className="form-control" placeholder="Account Name"
                      onChange={(e) => this.setState({description: e.target.value})}
                      />
                    </div>
                  </div>
                
                 
                
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.handlePost}><i className="fa fa-dot-circle-o"></i> Submit</button>
                
                <Link to={'/setting/bank/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }

  handlePost = async () => {
    const {name,number,description} = this.state
    await this.props.addBank({variables: {name,number,description}})

   window.location= MainLink + "setting/bank/all";
   //window.location.reload(true);
  }

}
const addMutation = gql`
  mutation addBank($name: String!, $number: String!, $description: String!) {
    createBank(name: $name, number: $number, description: $description) {
      id
    }
  }
`

const PageWithMutation = graphql(addMutation, { name: 'addBank' })(NewBank)
export default withRouter(PageWithMutation)
