import React, {Component} from "react";
import {MainApi} from '../../views/Api/';
import {
  Row,
  Col,
  CardGroup
} from "reactstrap";


import Widget04 from './Widget04';





var myDate = new Date();

class DashboardMdm extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      datax:[],
      datay:[],
      dataz:[],
      datav:[],
      dropdownOpen: false
    };
  }

  componentDidMount() {
    var that = this;
       that.getBrand();
       that.meFU1();
       that.meFU2();
       that.meFU3();
        that.getTeam();
      
  }

  getTeam(){
     var that = this;
     
     var fetch = require('graphql-fetch')(MainApi)
      var query = `
            query count {
               _allMDMsMeta {
                  count
                }
            }
          `
          var queryVars = {
            
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
               datab : results.data._allMDMsMeta.count,
              loading: false

             });
            //...
            //console.log(that.state.datax);
          })
  }

/////

  //

  getBrand(){
     var that = this;
     
     var fetch = require('graphql-fetch')(MainApi)
      var query = `
            query count  ($id: ID!){
               _allWorkflowsMeta (
                      filter:{  
                        user:{
                          id: $id
                        }
                      }
                      
                    ){
                  count
                }
            }
          `
          var queryVars = {
             id: window.localStorage.getItem('uid')
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
               datax : results.data._allWorkflowsMeta.count,
              loading: false

             });
            //...
            //console.log(that.state.datax);
          })
  }

/////
////////////

 meFU1(){
     var that = this;
     
     var fetch = require('graphql-fetch')(MainApi)
      var query = `
            query counter ($id: ID!)  {
               _allWorkflowsMeta (filter: {
                status: 1,
                 user:{
                  id: $id
                }
                }){
                count
              }
            }
          `
          var queryVars = {
             id: window.localStorage.getItem('uid')
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
               datav : results.data._allWorkflowsMeta.count,
              loading: false

             });
            //...
           
          })
  }
  ///
////////////

 meFU2(){
     var that = this;
     
     var fetch = require('graphql-fetch')(MainApi)
      var query = `
            query counter ($id: ID!)  {
               _allWorkflowsMeta (filter: {
                status: 2,
                 user:{
                  id: $id
                }
                }){
                count
              }
            }
          `
          var queryVars = {
             id: window.localStorage.getItem('uid')
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
               datay : results.data._allWorkflowsMeta.count,
              loading: false

             });
            //...
           
          })
  }
  ///
  ////////////

 meFU3(){
     var that = this;
     
     var fetch = require('graphql-fetch')(MainApi)
      var query = `
            query counter ($id: ID!)  {
               _allWorkflowsMeta (filter: {
                status: 3,
                 user:{
                  id: $id
                }
                }){
                count
              }
            }
          `
          var queryVars = {
             id: window.localStorage.getItem('uid')
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
               dataz : results.data._allWorkflowsMeta.count,
              loading: false

             });
            //...
           
          })
  }
  ///
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
   renderGreting(){

    if ( myDate.getHours() < 12 ) 
    {
        return(


                <h6>Selamat Pagi, {window.localStorage.getItem('uname')}</h6>
         

          );
    }
    if ( myDate.getHours() >= 12 && myDate.getHours() <= 17 ) 
    {
        return(

     

                <h6>Selamat sore, {window.localStorage.getItem('uname')}</h6>
      
          );
    }else{

    
        return(

  

                <h6>Selamat Malam, {window.localStorage.getItem('uname')}</h6> 
       

          );


    }


  }

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
       
         <Col xs="12" sm="12" lg="12">
          <div>
         {this.renderGreting()}<br /> 
           
          </div>

        </Col>
         
        </Row>

        <Row>
           <Col xs="12" sm="10" lg="10">

            
         <CardGroup>
        
        </CardGroup>
           </Col>
           <Col xs="12" sm="2" lg="2">
              
             
           </Col>

       </Row>
      </div>
    )
  }
}

export default DashboardMdm;
