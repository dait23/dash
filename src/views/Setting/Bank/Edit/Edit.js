import React, { Component } from 'react';
import { Link} from 'react-router-dom'
//import fetchCategory from './query';
import {MainApi} from '../../../../views/Api/';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
//const history = createBrowserHistory();




class EditBank extends Component {

  static propTypes = {
    router: PropTypes.object,
  }


  constructor(props) {
    super(props)
    this.state = { 
    id: '',
    name: '',
    number:'',
    description:'',
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
            query Bank($id: ID!) {
              Bank(id: $id){
              id
              name
              number
              description
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
              data : results.data.Bank,
              id:results.data.Bank.id,
              name:results.data.Bank.name,
              number:results.data.Bank.number,
              description:results.data.Bank.description,
              loading:false
             });
            //...
          })

  }

  onUpdatePress() {

     var that = this;
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            mutation updateBank ($id: ID!, $name: String!, $number: String!, $description: String!){
              updateBank (id: $id, name: $name, number: $number, description: $description){
                id
              
              }
            }
          `
          var queryVars = {
            id: this.state.id,
            name: this.state.name,
            number: this.state.number,
            description: this.state.description,
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

  
    return (

            <div className="animated fadeIn">
            <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong>Edit </strong> Bank
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
                      <input type="text" id="text-input" value={this.state.number} name="number" className="form-control" placeholder="Bank Number"
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

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.onUpdatePress}><i className="fa fa-dot-circle-o"></i> Submit</button>
                
                <Link to={'/setting/bank/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }


}
export default EditBank;
