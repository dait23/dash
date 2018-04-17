import React, { Component } from 'react';

import PropTypes from 'prop-types';

//import {MainApi, MainLink, Cloudinary_Code, Cloudinary_Link} from '../../../views/Api/';

import Example from './examples/Example';

require('./css/main.css');



class NewWorkflow extends Component {

  static propTypes = {
    router: PropTypes.object,
    addBanner: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { 
    data:[],
    datax:[],
    address: '',
    name: '',
    phone: '',
    email: '',
    categoryId: '',
    userId: localStorage.getItem('uid'),
    typeId: '',
    remarks: '',
    facebook: '',
    instagram: '',
    twitter: '',
    website: '',
    imageUrl:'',
    imageId:'',
    link:'',
    uploadedFile: null
    }
   
  }

 




  render() {
   
    return (
      <div className="animated fadeIn">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <strong>Add </strong> New 
                  </div>
                  <div className="card-block">
                       <Example />
                  </div>
                
                </div> 
          </div>
          
        </div>
      </div>
    )

  }


}



export default NewWorkflow;

