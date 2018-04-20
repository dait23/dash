import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Sidebar extends Component {

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  //activeRoute(routeName) {
    //return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  //}

  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }

  render() {
    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">
            <li className="nav-item">
              <NavLink to={'/dashboard'} className="nav-link" activeClassName="active"><i className="icon-speedometer"></i> Dashboard <span className="badge badge-info">NEW</span></NavLink>
            </li>
            <li className="nav-title">
              Front Elements
            </li>
            
            
          
            <li className="nav-item nav-dropdown">
              <a className="nav-link nav-dropdown-toggle"  onClick={this.handleClick.bind(this)}><i className="icon-people"></i>Users</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <NavLink to={'/mdm/all'} className="nav-link" activeClassName="active"><i className="icon-user"></i>MDM</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/bde/all'} className="nav-link" activeClassName="active"><i className="icon-user"></i> BDE</NavLink>
                </li>

                 <li className="nav-item">
                  <NavLink to={'/member/all'} className="nav-link" activeClassName="active"><i className="icon-user"></i>Member</NavLink>
                </li>
                 
                 
              </ul>
            </li>
             <li className="nav-item">
                  <NavLink to={'/brand/all'} className="nav-link" activeClassName="active"><i className="icon-cup"></i>Brand</NavLink>
            </li>
         
           <li className="nav-item nav-dropdown">
              <a className="nav-link nav-dropdown-toggle"  onClick={this.handleClick.bind(this)}><i className="fa fa-building-o"></i>Partners</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <NavLink to={'/partners/all'} className="nav-link" activeClassName="active"><i className="icon-star"></i> All Partners</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/spaces/all'} className="nav-link" activeClassName="active"><i className="icon-star"></i> All Space</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/gallery/all'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Gallery</NavLink>
                </li>
             
              </ul>
            </li>
           
            <li className="nav-item nav-dropdown">
              <a className="nav-link nav-dropdown-toggle"  onClick={this.handleClick.bind(this)}><i className="fa fa-money"></i>Withdraw</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <NavLink to={'/wthdraw/all'} className="nav-link" activeClassName="active"><i className="icon-star"></i> All Withdraw</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/wthdraw/unpaid'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Unpaid Withdraw</NavLink>
                </li>
               <li className="nav-item">
                  <NavLink to={'/wthdraw/paid'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Paid Withdraw</NavLink>
                </li>
              </ul>
            </li>

              <li className="nav-item">
                  <NavLink to={'/inquiry/all'} className="nav-link" activeClassName="active"><i className="fa fa-money"></i>Inquiry</NavLink>
            </li>
            
             <li className="nav-item">
                  <NavLink to={'/notification/all'} className="nav-link" activeClassName="active"><i className="icon-bulb"></i>Notification</NavLink>
            </li>
             <li className="nav-item">
                  <NavLink to={'/reviews/all'} className="nav-link" activeClassName="active"><i className="icon-bubble"></i>Reviews</NavLink>
            </li>
             <li className="nav-item">
                  <NavLink to={'/invoice/all'} className="nav-link" activeClassName="active"><i className="fa fa-clipboard"></i>Invoice</NavLink>
            </li>
            
            
            <li className="divider"></li>
            <li className="nav-title">
              SETTINGS
            </li>
            
            <li className="nav-item nav-dropdown">
              <a className="nav-link nav-dropdown-toggle"  onClick={this.handleClick.bind(this)}><i className="icon-game-controller"></i> App Settings</a>
              <ul className="nav-dropdown-items">

               <li className="nav-item nav-dropdown">
                <a className="nav-link nav-dropdown-toggle"  onClick={this.handleClick.bind(this)}><i className="fa fa-building-o"></i>Partners</a>
                <ul className="nav-dropdown-items">
                 <li className="nav-item">
                    <NavLink to={'/setting/inclusion/all'} className="nav-link" activeClassName="active"><i className="icon-puzzle"></i>Inclusions</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={'/setting/exclusion/all'} className="nav-link" activeClassName="active"><i className="icon-puzzle"></i>Exclusions</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={'/setting/size/all'} className="nav-link" activeClassName="active"><i className="icon-puzzle"></i> Size Space</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to={'/setting/collabs/all'} className="nav-link" activeClassName="active"><i className="icon-puzzle"></i>Event Collaboration</NavLink>
                  </li>
                   <li className="nav-item">
                    <NavLink to={'/setting/visitor-type/all'} className="nav-link" activeClassName="active"><i className="icon-puzzle"></i> Visitor Type</NavLink>
                  </li>
                    <li className="nav-item">
                    <NavLink to={'/setting/facility-partners/all'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Facility Partners</NavLink>
                  </li>
                 <li className="nav-item">
                    <NavLink to={'/setting/category-partners/all'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Category Partners</NavLink>
                  </li>
                <li className="nav-item">
                  <NavLink to={'/setting/area/all'} className="nav-link" activeClassName="active"><i className="icon-map"></i> Area / Regional</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/setting/event-type/all'} className="nav-link" activeClassName="active"><i className="fa fa-calendar"></i> Event Type</NavLink>
                </li>

                </ul>
              </li>

              <li className="nav-item nav-dropdown">
                <a className="nav-link nav-dropdown-toggle"  onClick={this.handleClick.bind(this)}><i className="icon-cup"></i>Brand</a>
                <ul className="nav-dropdown-items">
                 
                 <li className="nav-item">
                  <NavLink to={'/setting/category/all'} className="nav-link" activeClassName="active"><i className="icon-puzzle"></i> Main Category</NavLink>
                </li>
                  <li className="nav-item">
                  <NavLink to={'/setting/brand-category/all'} className="nav-link" activeClassName="active"><i className="fa fa-barcode"></i> Sub Category</NavLink>
                </li>
               
                 <li className="nav-item">
                  <NavLink to={'/setting/rent-type/all'} className="nav-link" activeClassName="active"><i className="icon-puzzle"></i> Rent Type</NavLink>
                </li>
              
                 <li className="nav-item">
                  <NavLink to={'/setting/brand-type/all'} className="nav-link" activeClassName="active"><i className="fa fa-barcode"></i> Brand Type</NavLink>
                </li>

                </ul>
              </li>


               
               
                 
                 <li className="nav-item">
                  <NavLink to={'/setting/notif-type/all'} className="nav-link" activeClassName="active"><i className="fa fa-bullhorn"></i>Notif Type</NavLink>
                </li>
                 <li className="nav-item">
                  <NavLink to={'/setting/employment/all'} className="nav-link" activeClassName="active"><i className="icon-briefcase"></i>Employment</NavLink>
                </li>
                 <li className="nav-item">
                  <NavLink to={'/setting/payment/all'} className="nav-link" activeClassName="active"><i className="fa fa-money"></i>Payment Type</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/setting/bank/all'} className="nav-link" activeClassName="active"><i className="fa fa-bank"></i>Bank List</NavLink>
                </li>

              </ul>
            </li>
            <li className="nav-item nav-dropdown">
              <a className="nav-link nav-dropdown-toggle"  onClick={this.handleClick.bind(this)}><i className="icon-screen-desktop"></i> Web Settings</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <NavLink to={'/setting/meta/'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Meta Information</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/setting/user/all'} className="nav-link" activeClassName="active"><i className="icon-user-follow"></i> User Admin</NavLink>
                </li>
               
              </ul>
            </li>

             <li className="nav-item nav-dropdown">
              <a className="nav-link nav-dropdown-toggle"  onClick={this.handleClick.bind(this)}><i className="icon-puzzle"></i> Components</a>
              <ul className="nav-dropdown-items">
         
                <li className="nav-item">
                  <NavLink to={'/banner/all'} className="nav-link" activeClassName="active"><i className="fa fa-image"></i> Banner / Slider </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/page/all'} className="nav-link" activeClassName="active"><i className="fa fa-files-o"></i>Static Pages</NavLink>
                </li>
               
              </ul>
            </li>

              <li className="nav-item nav-dropdown">
              <a className="nav-link nav-dropdown-toggle" onClick={this.handleClick.bind(this)}><i className="fa fa-cogs"></i> 3rd Party Plugin</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <NavLink to={'/plugin/google'} className="nav-link" activeClassName="active"><i className="fa fa-google"></i> Google</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/plugin/google'} className="nav-link" activeClassName="active"><i className="fa fa-amazon"></i> Amazon</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/plugin/onesignal'} className="nav-link" activeClassName="active"><i className="icon-bulb"></i>Onesignal</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/plugin/mailchimp'} className="nav-link" activeClassName="active"><i className="fa fa-envelope-o"></i>Mailchimp</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/plugin/cloudinary'} className="nav-link" activeClassName="active"><i className="fa fa-cloud-upload"></i>Cloudinary</NavLink>
                </li>
                 <li className="nav-item">
                  <NavLink to={'/plugin/mailgun'} className="nav-link" activeClassName="active"><i className="fa fa-envelope-o"></i>Mailgun</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/plugin/sendgrid'} className="nav-link" activeClassName="active"><i className="fa fa-envelope-o"></i>Sendgrid</NavLink>
                </li>
               
              </ul>
            </li>
           
          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar;
