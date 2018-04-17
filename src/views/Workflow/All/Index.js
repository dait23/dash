import React from 'react';
import { Link} from 'react-router-dom';
import ListSlider from './List';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';

class Workflow extends React.Component {

  static propTypes = {
    data: PropTypes.object,
    refresh: PropTypes.func,
  }
  
  //  constructor(props) {
  //   super(props);
  //   //this.forceUpdate();
  //   //this.handleChange = this.handleChange.bind(this)
  // }

  componentDidMount() {
       this.forceUpdate();
  }

renderAddNew(){

  if(window.localStorage.getItem('urole') === 'Mdm'){
   
   return(
      
      <Link to={'/mdm-workflow/new'} className="btn btn-success btn-sm pull-right"><i className="fa fa-plus"></i>&nbsp; Add New</Link>
    )
  }
  else{

    return(
      
      <Link to={'/mdm-workflow/new'} className="btn btn-success btn-sm pull-right"><i className="fa fa-plus"></i>&nbsp; Add New</Link>
    )
  }
}

////renderMdm()//{

//   if(window.localStorage.getItem('urole') == 'Mdm'){

//    return(


//             <thead>
//                     <tr>
//                       <th>Date</th>
//                       <th>Brand</th>
//                       <th>Category</th>
//                       <th>Owner / Marketing</th>
//                       <th>Phone</th>
//                       <th>Remark</th>
//                        <th>status</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>

//    )

//   }else{

//     return(
    

//       <thead>
//                     <tr>
//                       <th>Brand Name</th>
//                       <th>Address</th>
//                       <th>Category</th>
//                       <th>Type</th>
//                       <th>Phone</th>
//                        <th>Status</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>


//     )

//   }

// }

  render () {
    if (this.props.data.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }

    if (this.props.data.allBanners && this.props.data.allBanners.error) {
    return <div>Error</div>
   }



    return (
    <div className="animated fadeIn">
      <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-image"></i> All Brand
               {this.renderAddNew()}
              </div>
              <div className="card-block">
                <table className="table table-bordered table-striped table-sm">
                      <th>Dates</th>
                      <th>Brand Name</th>
                      <th>Category</th>
                      <th>Owner / Marketing</th>
                      <th>Phone</th>
                      <th>Remark</th>
                       <th>status</th>
                      <th>Action</th>
                  <tbody>
           {this.props.data.allWorkflows.map((workflow) => (
            <ListSlider
              key={workflow.id}
              workflow={workflow}
              refresh={() => this.props.data.refetch()}
            />
          ))}
           </tbody>
          </table>
        </div>
       </div>
         </div>
        </div>
      </div>

    )
  }
}




const FeedQuery = gql`query allWorkflows ($id: ID!) {
   allWorkflows(filter:{
    user:{
      id:$id
    }
  }) {
    id
    name
    picName
    picPhone
    ownerName
    ownerPhone
    remarks
    createdAt
    status
    brand{
      name
      category{
        name
      }
    }
   
  }
}`

const ListPageWithData = graphql(FeedQuery, {
  options: { variables: { id: window.localStorage.getItem('uid') } },
})(Workflow)

export default ListPageWithData