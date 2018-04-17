import request from 'superagent';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import Dropzone from 'react-dropzone'
import partnerStore from '../Store/Store';
import React, { Component } from 'react';
import { inject, observer, Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import ReactQuill from "react-quill";
import Spinner from 'react-spinkit';
import Select from 'react-select-plus';
import { Multiselect } from 'react-widgets'
import 'react-widgets/dist/css/react-widgets.css';
import 'react-select-plus/dist/react-select-plus.css';
import { Link, withRouter, Redirect} from 'react-router-dom'
import {Image} from 'cloudinary-react';
import {MainApi, MainLink, Cloudinary_Code, Cloudinary_Link} from '../../../views/Api/';;


const history = createBrowserHistory();

const CLOUDINARY_UPLOAD_PRESET = Cloudinary_Code;
const CLOUDINARY_UPLOAD_URL = Cloudinary_Link;



// our main component
const Partner = inject('partnerStore')(
  observer(
    class extends Component {

    
      constructor(props) {
        super(props)
        this.state = { 
        address: '',
        name: '',
        picName: '',
        picPhone: '',
        avgVisitor: '',
        avgSpending: '',
        lat: '',
        lng: '',
        peakHour: '',
        inclusions: '',
        exclusions: '',
        categoryId: '',
        userId: localStorage.getItem('uid'),
        areaId: '',
        visitorId: '',
        facilitiesIds: '',
        nearby: '',
        facebook: '',
        instagram: '',
        website: '',
        imageUrl:'',
        imageId:'',
        selectedOption: '',
        uploadedFile: null
        }
        //this.handleChange = this.handleChange.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleChangex = this.handleChangex.bind(this)
        this.handleChangez = this.handleChangez.bind(this)
        this.handleChangeVit = this.handleChangeVit.bind(this)
        //this.handleChangeRe = this.handleChangeRe.bind(this)
        //this.handlePost = this.handlePost.bind(this)
      }
   ////


handlePost = () => this.props.partnerStore.createPartner(this.state.name, this.state.picName);
    
    handleSelectChange (value) {

    const map1 = value.map(x => x.id);
    //const xxx = map1.toString();
     //const xxx = map1.join();
    //console.log('You\'ve selected:', map1);
    this.setState({ facilitiesIds: map1 });


     console.log('You\'ve selectedxx:', map1);
  }
      ////
       handleChangex = (categoryId) => {
        this.setState({ categoryId : categoryId.value});
        console.log(`category: ${categoryId.value}`);
      }

  
       handleChangez = (areaId) => {
        this.setState({ 
          areaId:areaId.value
        });
        console.log(`area: ${areaId.value}`);
      }

     handleChangeVit = (visitorId) => {
            this.setState({ 
              visitorId:visitorId.value
            });
            console.log(`Visitor: ${visitorId.value}`);
          }



      render() {
        const { error, loading, count, areas, categories, visitors, facilities } = this.props.partnerStore;
        //console.log(areas);

        if (error) console.error(error);
        else if (loading) return(
            
            <div><Spinner name="double-bounce" /></div>

          );
        else if (count === 0) console.warn('No Partner :(');
        else console.log('xx');

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
                   <div className="row">
                   <div className="col-md-6">
                           
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Partner Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.name} name="name" className="form-control" placeholder="partner name"
                      onChange={(e) => this.setState({name: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Pic Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.picName} name="picName" className="form-control" placeholder="pic name"
                      onChange={(e) => this.setState({picName: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Pic Phone</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.picPhone} name="picPhone" className="form-control" placeholder="pic Phone"
                      onChange={(e) => this.setState({picPhone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Average Visitor</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.avgVisitor} name="avgVisitor" className="form-control" placeholder="average visitor"
                      onChange={(e) => this.setState({avgVisitor: e.target.value})}
                      />
                    </div>
                  </div>

                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Average Spending</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.avgSpending} name="avgSpending" className="form-control" placeholder="average spendding"
                      onChange={(e) => this.setState({avgSpending: e.target.value})}
                      />
                    </div>
                  </div>

                    <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Peak Hours</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.peakHour} name="peakHour" className="form-control" placeholder="peak hours"
                      onChange={(e) => this.setState({peakHour: e.target.value})}
                      />
                    </div>
                  </div>
                  
                    <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">NearBy</label>
                    <div className="col-md-9">
                        <textarea className="form-control" rows="5" value={this.state.nearby} name="nearby"
                         onChange={(e) => this.setState({nearby: e.target.value})}></textarea>
                    
                    </div>
                  </div>


                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Inclusions</label>
                    <div className="col-md-9">
                    
                      <textarea className="form-control" rows="5" value={this.state.inclusions} name="inclusions"
                         onChange={(e) => this.setState({inclusions: e.target.value})}></textarea>
                    </div>
                  </div>
              

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Exclusion</label>
                    <div className="col-md-9">
                    
                      <textarea className="form-control" rows="5" value={this.state.exclusions} name="exclusions"
                         onChange={(e) => this.setState({exclusions: e.target.value})}></textarea>
                    </div>
                  </div>
              
                   </div>
                   <div className="col-md-6">
   

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Category</label>
                    <div className="col-md-9">
                       <Select
                        name="categoryId"
                        placeholder="Select Category"
                        value={this.state.categoryId}
                        onChange={this.handleChangex}
                        options={categories.map((category) => (
                           
                           {value: category.id, label: category.name}


                          ))}
                      />
                       
                    </div>
                  </div>
                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Address</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.address} name="address" className="form-control" placeholder="address"
                      onChange={(e) => this.setState({address: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Area / Regional</label>
                    <div className="col-md-9">
                      
                      <Select
                        name="areaId"
                        placeholder="Select Area / regional"
                        value={this.state.areaId}
                        onChange={this.handleChangez}
                        options={areas.map((area) => (
                           
                           {value: area.id, label: area.name}


                          ))}
                      />
                      
                    </div>
                  </div>
                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Visitor Type</label>
                    <div className="col-md-9">
                      
                      <Select
                        name="visitorId"
                        value={this.state.visitorId}
                        placeholder="Select Visitor Type"
                        onChange={this.handleChangeVit}
                        options={visitors.map((visitor) => (
                           
                           {value: visitor.id, label: visitor.name}


                          ))}
                      />
                      
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Facility</label>
                    <div className="col-md-9">
                      
                      <Multiselect
                       onChange={this.handleSelectChange}
                        data={facilities.map((facilityx) => (
                           
                           {id: facilityx.id, name: facilityx.name}

                         
                          ))}
                        valueField='id'
                        textField='name'
                        placeholder="Select Facility"
                        defaultValue={facilities.map((facility) => (
                           
                           {id: facility.id, name: facility.name}

                         
                          ))}
                      />
                      
                    </div>
                  </div>
    
                     <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Website</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.website} name="website" className="form-control" placeholder="http://www.example.com"
                      onChange={(e) => this.setState({website: e.target.value})}
                      />
                    </div>
                  </div>
                   
                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Facebook</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.facebook} name="facebook" className="form-control" placeholder="https://facebook.com/"
                      onChange={(e) => this.setState({facebook: e.target.value})}
                      />
                    </div>
                  </div>
                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Instagram</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.instagram} name="instagram" className="form-control" placeholder="https://instagram.com/"
                      onChange={(e) => this.setState({instagram: e.target.value})}
                      />
                    </div>
                  </div>
                
              
                  

                   </div>
                </div>
                
                 
      
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.handlePost}><i className="fa fa-dot-circle-o"></i> Save</button>
                
                <Link to={'/partners/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>

          )
      }
     

    }
  )
);



const stores = { partnerStore };

const NewPartners = () => (
  <Provider {...stores}>
    <Partner />
  </Provider>
);


export default NewPartners;