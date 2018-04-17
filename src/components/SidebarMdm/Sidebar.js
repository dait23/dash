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



  renderSetting(){

    if(window.localStorage.getItem('urole') === 'Mdm' && window.localStorage.getItem('uname') === 'Fahrix'){

      return (
        <div>


           <li className="nav-item nav-dropdown">
              <a className="nav-link nav-dropdown-toggle"  onClick={this.handleClick.bind(this)}><i className="icon-people"></i> Mdm Teams</a>
              <ul className="nav-dropdown-items">
               
               <li className="nav-item">
                  <NavLink to={'/mdm-team/all'} className="nav-link" activeClassName="active"><i className="icon-ghost"></i> All Teams</NavLink>
                </li>
           
                <li className="nav-item">
                  <NavLink to={'/mdm-team/performance'} className="nav-link" activeClassName="active"><i className="icon-speedometer"></i>Performance Team</NavLink>
                </li>

              </ul>
            </li>

          <li className="nav-item nav-dropdown">
              <a className="nav-link nav-dropdown-toggle"  onClick={this.handleClick.bind(this)}><i className="icon-game-controller"></i> Settings</a>
              <ul className="nav-dropdown-items">
               
               <li className="nav-item">
                  <NavLink to={'/setting/category/all'} className="nav-link" activeClassName="active"><i className="icon-puzzle"></i> Main Category</NavLink>
                </li>
           
                <li className="nav-item">
                  <NavLink to={'/setting/area/all'} className="nav-link" activeClassName="active"><i className="icon-map"></i> Area / Regional</NavLink>
                </li>
                 <li className="nav-item">
                  <NavLink to={'/setting/brand-category/all'} className="nav-link" activeClassName="active"><i className="fa fa-barcode"></i> Brand Category</NavLink>
                </li>
                 <li className="nav-item">
                  <NavLink to={'/setting/brand-type/all'} className="nav-link" activeClassName="active"><i className="fa fa-barcode"></i> Brand Type</NavLink>
                </li>
                 <li className="nav-item">
                  <NavLink to={'/setting/event-type/all'} className="nav-link" activeClassName="active"><i className="fa fa-calendar"></i> Event Type</NavLink>
                </li>


              </ul>
            </li>
         </div>

        )


    }else{

      
       return(
            
        <div></div>

       )


    }


  }

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
            
            
          
           
            <li className="nav-item">
                  <NavLink to={'/brand/all'} className="nav-link" activeClassName="active"><i className="icon-cup"></i>Brand</NavLink>
            </li>
             <li className="nav-item">
                  <NavLink to={'/partners/all'} className="nav-link" activeClassName="active"><i className="fa fa-building-o"></i>Partners</NavLink>
            </li>
             <li className="nav-item">
                  <NavLink to={'/invoice/all'} className="nav-link" activeClassName="active"><i className="icon-calculator"></i>My Invoice</NavLink>
            </li>
            

           
            {this.renderSetting()}
           

           
          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar;
