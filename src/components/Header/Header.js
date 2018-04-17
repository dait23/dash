import React, {Component} from 'react';
import {MainApi, No_Avatar, Cloudinary_Name} from '../../views/Api/';
import {Image} from 'cloudinary-react';
import Spinner from 'react-spinkit';
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  NavbarBrand,
  DropdownToggle
} from 'reactstrap';

var userRole = localStorage.getItem('urole');
class Header extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      datax:[],
      data:[],
      avatar:'',
    };
  }


  
  componentDidMount() {
    var that = this;
    that.getAvatar();
      
  }


  _logout = () => {
    // remove token from local storage and reload page to reset apollo client
     localStorage.removeItem('spaceToken')
     localStorage.removeItem('uid')
      localStorage.removeItem('uname')
       localStorage.removeItem('urole')
     window.location.reload()
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  getAvatar(){
     
     if(userRole === 'Mdm'){

        this.getMdm();

      }
      if(userRole === 'Bde'){

        this.getBde();

      }
      if(userRole === 'Merchant'){

        this.getMerchant();

      }
       else{
          this.setState({

            avatar: No_Avatar

          });
          console.log('Another');
      }
  }
  //////


  getMdm(){
     var that = this;
     that.setState({
          loading: true
      });
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            query Place($id: ID!) {
              User (id: $id){
                id
                mdm{
                  imageId
                }
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
              data : results.data.User,
              avatar : results.data.User.mdm.imageId,
              loading:false
             });
            //...console.log(that.state.dataz);
           // console.log(that.state.data);
          })

  }
  //////
  getBde(){
     var that = this;
     that.setState({
          loading: true
      });
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            query Place($id: ID!) {
              User (id: $id){
                id
                bde{
                  imageId
                }
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
              data : results.data.User,
              avatar : results.data.User.bde.imageId,
              loading:false
             });
            //...console.log(that.state.dataz);
           // console.log(that.state.data);
          })

  }
  //////

  getMerchant(){
     var that = this;
     that.setState({
          loading: true
      });
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            query Place($id: ID!) {
              User (id: $id){
                id
                merchant{
                  imageId
                }
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
              data : results.data.User,
              avatar : results.data.User.merchant.imageId,
              loading:false
             });
            //...console.log(that.state.dataz);
           // console.log(that.state.data);
          })

  }
  //////


  renderAvatar(){

    if (this.state.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }

    return(


              <Image cloudName={Cloudinary_Name} publicId={this.state.avatar} width="40" crop="thumb" radius="max" aspect_ratio="1" gravity="face"/>

    )

  }

  render() {
   
   
    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>&#9776;</NavbarToggler>
        <NavbarBrand href="#"></NavbarBrand>
        <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>&#9776;</NavbarToggler>
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="#">Dashboard {window.localStorage.getItem('urole')}</NavLink>
          </NavItem>
         
        </Nav>
        <Nav className="ml-auto" navbar>

          <NavItem>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle className="nav-link dropdown-toggle">
               {this.renderAvatar()} &nbsp;&nbsp;

                <span className="d-md-down-none">Hi, {window.localStorage.getItem('uname')}</span>
              </DropdownToggle>
              <DropdownMenu right className={this.state.dropdownOpen ? 'show' : ''}>
                <DropdownItem divider/>
                <DropdownItem  onClick={this._logout}><i className="fa fa-lock"></i> Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavItem>
        </Nav>
        <NavbarToggler className="d-md-down-none" type="button" onClick={this.asideToggle}></NavbarToggler>
      </header>
    )
  }
}




export default Header ;
