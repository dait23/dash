import React, {Component} from "react";
import {MainApi} from '../../views/Api/';
import {
  Row,
  Col,
  CardGroup
} from "reactstrap";
import AnalogClock, { Themes } from 'react-analog-clock';

import Widget04 from './Widget04';





var myDate = new Date();

class DashboardMerchant extends Component {
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
      that.meBrand();
       that.mePlace();
      
  }

  //

  getBrand(){
     var that = this;
     
     var fetch = require('graphql-fetch')(MainApi)
      var query = `
            query count{
              _allBrandsMeta{
                  count
                }
                  _allPlacesMeta{
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
               datax : results.data._allBrandsMeta.count,
               datay : results.data._allPlacesMeta.count,
              loading: false

             });
            //...
            //console.log(that.state.datax);
          })
  }
////////////

 meBrand(){
     var that = this;
     
     var fetch = require('graphql-fetch')(MainApi)
      var query = `
            query counter ($id: ID!)  {
               _allBrandsMeta (filter: {
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
               dataz : results.data._allBrandsMeta.count,
              loading: false

             });
            //...
           
          })
  }

  ////////////

 mePlace(){
     var that = this;
     
     var fetch = require('graphql-fetch')(MainApi)
      var query = `
            query counter ($id: ID!)  {
               _allPlacesMeta (filter: {
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
               datav : results.data._allPlacesMeta.count,
              loading: false

             });
            //...
           
          })
  }
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
          <Widget04 icon="icon-cup" color="info" header={this.state.datax} value="25">All Brand</Widget04>
          <Widget04 icon="icon-cup" color="success" header={this.state.dataz} value="25">My Brand</Widget04>
          <Widget04 icon="fa fa-building-o" color="warning" header={this.state.datay} value="25">All Place</Widget04>
          <Widget04 icon="fa fa-building-o" color="primary" header={this.state.datav} value="25">My Place</Widget04>
         
        </CardGroup>
           </Col>
           <Col xs="12" sm="2" lg="2">
              
               <AnalogClock theme={Themes.light} />

           </Col>

       </Row>
      </div>
    )
  }
}

export default DashboardMerchant;
