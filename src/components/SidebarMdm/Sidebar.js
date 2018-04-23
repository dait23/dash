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

    if(window.localStorage.getItem('urole') === 'Mdm'){

      return (
        <div>


          

          <li className="nav-item nav-dropdown">
              <a className="nav-link nav-dropdown-toggle"  onClick={this.handleClick.bind(this)}><i className="icon-game-controller"></i> Settings</a>
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
                  <NavLink to={'/inquiry/all'} className="nav-link" activeClassName="active"><i className="fa fa-money"></i>Inquiry</NavLink>
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
