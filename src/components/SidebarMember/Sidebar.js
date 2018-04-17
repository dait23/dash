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
              MemberElements
            </li>
            
            
          
             <li className="nav-item">
                  <NavLink to={'/profile'} className="nav-link" activeClassName="active"><i className="icon-people"></i>Profile</NavLink>
            </li>
            <li className="nav-item">
                  <NavLink to={'/brand/all'} className="nav-link" activeClassName="active"><i className="icon-cup"></i>Brands</NavLink>
            </li>
             <li className="nav-item">
                  <NavLink to={'/inquiry/all'} className="nav-link" activeClassName="active"><i className="fa fa-money"></i>Inquiry</NavLink>
            </li>
             <li className="nav-item">
                  <NavLink to={'/messages/all'} className="nav-link" activeClassName="active"><i className="icon-speech"></i>Messages</NavLink>
            </li>
             <li className="nav-item">
                  <NavLink to={'/invoice/all'} className="nav-link" activeClassName="active"><i className="fa fa-clipboard"></i>Invoice</NavLink>
            </li>
             
            
           

           
          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar;
