import React from 'react';
import { Link} from 'react-router-dom';
import ListSlider from './List';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';

class Request extends React.Component {

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
                <i className="fa fa-image"></i> All Request ({this.props.data._allRequestsMeta.count})
                 <Link to={'/request/new'} className="btn btn-success btn-sm pull-right"><i className="fa fa-plus"></i>&nbsp; Add New</Link>
              </div>
              <div className="card-block">
                <table className="table table-bordered table-striped table-sm">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Periode</th>
                      <th>Category</th>
                      <th>Type</th>
                      <th>Follower</th>
                      <th>From</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
           {this.props.data.allRequests.map((request) => (
            <ListSlider
              key={request.id}
              request={request}
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
   allRequests(orderBy: createdAt_DESC) {
    id
    title
    periode
    follower
    category{
      id
      name
    }
    type{
      id
      name
    }
    user{
      id
      name
    }
  }
  _allRequestsMeta{
    count
  }
}`

const ListPageWithData = graphql(FeedQuery)(Request)

export default ListPageWithData