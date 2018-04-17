import React, {Component} from "react";
import {MainApi} from '../../views/Api/';
import {
  Row,
  Col,
  CardGroup
} from "reactstrap";
// import AnalogClock, { Themes } from 'react-analog-clock';

import Widget04 from './Widget04';





var myDate = new Date();

class DashboardMember extends Component {
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

  // componentDidMount() {
  //   var that = this;
  //     that.getBrand();
  //     that.meBrand();
  //      that.mePlace();
      
  // }

  // //



 
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

      </div>
    )
  }
}

export default DashboardMember;
