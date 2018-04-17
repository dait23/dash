import React from 'react';
import { Link} from 'react-router-dom';
import ListSlider from './List';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';

class Inquiry extends React.Component {

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

// renderAddNew(){

//   if(window.localStorage.getItem('urole') == 'Mdm'){
   
//    return(
      
//       <div></div>
//     )
//   }
//   else{

//     return(
      
//       <Link to={'/brand/new'} className="btn btn-success btn-sm pull-right"><i className="fa fa-plus"></i>&nbsp; Add New</Link>
//     )
//   }


// }


// renderBde(){

//    if(window.localStorage.getItem('urole') == 'Mdm'){


//     return(

//                 <thead>
//                     <tr>
//                       <th>Title</th>
//                       <th>Wide Space</th>
//                       <th>Category</th>
//                       <th>Type</th>
//                       <th>Area</th>
//                       <th>Remarks</th>
//                       <th>From</th>
//                       <th>Status</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>

//       )


//    }else{

//       return(


//       )

//    }

// }



  render () {
    if (this.props.data.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }

    if (this.props.data.allInquiries && this.props.data.allInquiries.error) {
    return <div>Error</div>
   }

    return (
    <div className="animated fadeIn">
      <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-image"></i> All Inquiry
                 <Link to={'/inquiry/new'} className="btn btn-success btn-sm pull-right"><i className="fa fa-plus"></i>&nbsp; Add New</Link>
              </div>
              <div className="card-block">
                <table className="table table-bordered table-striped table-sm">
                  <thead>
                    <tr>
                      <th>Project Name</th>
                      <th>Budget</th>
                      <th>Wide Space</th>
                      <th>Category</th>
                      <th>Type</th>
                      <th>Facility</th>
                      <th>Area</th>
                      <th>Remarks</th>
                      <th>From</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
           {this.props.data.allInquiries.map((inquiry) => (
            <ListSlider
              key={inquiry.id}
              inquiry={inquiry}
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

const FeedQuery = gql`query allBrands {
   allInquiries(orderBy: createdAt_DESC) {
    id
    title
    wide
    status
    facilities{
      id
      name
    }
    category{
      name
    }
    type{
      name
    }
    area{
      name
    }
    user{
      id
      name
    }

    price
    remarks
  }
}`

const ListPageWithData = graphql(FeedQuery)(Inquiry)

export default ListPageWithData