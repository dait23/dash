import React, { Component } from 'react';
import { Link} from 'react-router-dom'

import ReactQuill from "react-quill";
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'


import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import Select from 'react-select-plus';
import 'react-select-plus/dist/react-select-plus.css';
import {MainApi, MainLink} from '../../../views/Api/';



class NewPlace extends Component {

  static propTypes = {
    router: PropTypes.object,
    addPlace: PropTypes.func,
    addEmail: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = { 
    data:[],
    datax:[],
    address: '',
    title: '',
    name: '',
    source: '',
    phone: '',
    email: '',
    categoryId: '',
    userId: localStorage.getItem('uid'),
    areaId: '',
    to: '',
    remarks: '',
    uploadedFile: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeRe = this.handleChangeRe.bind(this)
    this.handlePost = this.handlePost.bind(this)
     this.handleChangex = this.handleChangex.bind(this)
    this.handleChangez = this.handleChangez.bind(this)
  }

  handleChangex = (categoryId) => {
    this.setState({ categoryId : categoryId.value});
    console.log(`category: ${categoryId.value}`);
  }
   handleChangez = (areaId) => {
    this.setState({ 
      areaId:areaId.value
    });
    console.log(`area: ${areaId.areaId}`);
  }

  componentDidMount() {
    var that = this;
    //that.getData();
    //that.getCategory();
    that.getType();
      
  }
/////
   getType(){
     var that = this;
     
     var fetch = require('graphql-fetch')(MainApi)
      var query = `
            query allAreas{
              allAreas (orderBy: name_ASC) {
                id
                name

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
              datax : results.data.allAreas,
              loading: false

             });
            //...
           // console.log(that.state.dataz);
          })
  }

  handleChange(value) {
    this.setState({ address: value })
  }
  handleChangeRe(value) {
    this.setState({ remarks: value })
  }



  modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ]
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]




////////////

renderArea(){

  if (this.state.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }


      return(
      
        <select id="select" value={this.state.areaId}  name="areaId" className="form-control" onChange={(e) => this.setState({areaId: e.target.value})}>
                        
             <option>Area / Regional</option>
            {this.state.datax.map((area) => (
                        <option key={area.id} value={area.id}>{area.name}</option>
                       ))}   
        </select>
      )
    
 }


  render() {
   
   if ( this.props.CatQuery.loading ) {
      return (<div><Spinner name="double-bounce" /></div>)
    }
    
     var sendTo = this.state.email;
  
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

              
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Place Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.title} name="title" className="form-control" placeholder="Place Name"
                      onChange={(e) => this.setState({title: e.target.value})}
                      />
                    </div>
                  </div>
                    <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Name Person</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.name} name="name" className="form-control" placeholder="Name Person"
                      onChange={(e) => this.setState({name: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Email</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.email} name="email" className="form-control" placeholder="email"
                      onChange={(e) => this.setState({email: e.target.value})}
                      onKeyUp={(e) => this.setState({to: document.getElementById("to").value})}
                      />

                       <input disabled type="hidden" id="to" value={sendTo} name="to" className="form-control" placeholder="email address"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Phone</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.phone} name="phone" className="form-control" placeholder="Phone Number"
                      onChange={(e) => this.setState({phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Category</label>
                    <div className="col-md-9">
                      <Select
                        name="categoryId"
                        value={this.state.categoryId}
                        onChange={this.handleChangex}
                        options={this.props.CatQuery.allPartnerCategories.map((category) => (
                           
                           {value: category.id, label: category.name}


                          ))}
                      />
                    </div>
                  </div>
                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="select">Area / Regional</label>
                    <div className="col-md-9">
                      
                           
                      <Select
                        name="areaId"
                        value={this.state.areaId}
                        onChange={this.handleChangez}
                        options={this.state.datax.map((area) => (
                           
                           {value: area.id, label: area.name}


                          ))}
                      />
                      
                    </div>
                  </div>
                 
                 
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="textarea-input">Address</label>
                    <div className="col-md-9">
                    
                    <ReactQuill theme="snow"
                    value={this.state.address}
                    modules={this.modules}
                    formats={this.formats}
                    placeholder="address"
                    onChange={this.handleChange}
                    >

                    </ReactQuill>
                    
                     
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="textarea-input">Remarks</label>
                    <div className="col-md-9">
                    
                    <ReactQuill theme="snow"
                    value={this.state.remarks}
                    modules={this.modules}
                    formats={this.formats}
                    placeholder="remarks"
                    onChange={this.handleChangeRe}
                    >

                    </ReactQuill>
                    
                     
                    </div>
                  </div>
      
                 <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Source</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.source} name="source" className="form-control" placeholder="source scraping"
                      onChange={(e) => this.setState({source: e.target.value})}
                      />
                    </div>
                  </div>
            
                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.handlePost}><i className="fa fa-dot-circle-o"></i> Save</button>
                
                <Link to={'/place/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
              </div>
            </div>
       
          </div>
          
        </div>
      </div>
    )

  }

  handlePost = async () => {
    //const {title, name, email, phone, address, categoryId, areaId, remarks, userId} = this.state
    await this.props.addPlace({variables: {
      title : this.state.title, 
      name : this.state.name, 
      email : this.state.email,
      source : this.state.source, 
      phone : this.state.phone, 
      address : this.state.address, 
      categoryId : this.state.categoryId, 
      areaId: this.state.areaId, 
      remarks: this.state.remarks, 
      userId: this.state.userId, 

    }})
  

   window.location= MainLink + "place/all";
   //window.location.reload(true);
  }

}
const addMutation = gql`
  mutation addPlace($title: String, $name: String, $email: String, $phone: String, $address: String, $categoryId: ID, $areaId: ID, $remarks: String, $userId: ID, $source: String) {
    createPlace(
    title: $title,
    name: $name, 
    email:$email,
    source:$source,
    phone: $phone, 
    address: $address,
    categoryId:$categoryId,
    areaId: $areaId,
    userId: $userId,
    remarks: $remarks
    
    ) {
      id
    }
  }
`

// const addEmail = gql`
//   mutation sendMail ($to: [String!]!){
//   sendMailgunEmail(
//     tag: "email-place-owner"
//     from: "adit@spazee.id "
//     to: "slenkois@gmail.com"
//     subject: "Are U space Owner!"
//     text: "Hai......!"
//   ) {
//     success
//   }
// }
// `

const CatQuery = gql`query allPartnerCategories {
  allPartnerCategories (orderBy: name_DESC) {
    id
    name

  }
}
`

// const PageWithMutation = graphql(addMutation, { name: 'addBanner' })(NewBrand)

// export default withRouter(PageWithMutation)

export default compose(
  graphql(CatQuery, { name: 'CatQuery' }),
  graphql(addMutation, { name: 'addPlace' }),
   //graphql(addEmail, { name: 'sendMail' }),
)(NewPlace)



// const Container = compose(
//   graphql(EntitiesQuery, { name: 'EntitiesQuery' }),
//   graphql(MeQuery, { name: 'MeQuery' }),
// )(Component);