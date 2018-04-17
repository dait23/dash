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


  componentDidMount() {
       this.forceUpdate();
  }

renderAddNew(){

  if(window.localStorage.getItem('urole') === 'Member'){
   
   return(
      
      <div></div>
    )
  }
  else{

    return(
      
      <Link to={'/inquiry/new'} className="btn btn-success btn-sm pull-right"><i className="fa fa-plus"></i>&nbsp; Add New</Link>
    )
  }
}

renderMdm(){

  if(window.localStorage.getItem('urole') === 'Member'){

   return(


            <thead>
                    <tr>
                      <th>Partner Space</th>
                      <th>Start At</th>
                      <th>End At</th>
                      <th>Status</th>     
                      <th>Action</th>
                    </tr>
                  </thead>

   )

  }else{

    return(
    

            <thead>
                    
                    <tr>
                      <th>Partner Space</th>
                      <th>Start At</th>
                      <th>End At</th>
                      <th>Status</th>     
                      <th>Action</th>
                    </tr>
                  </thead>


    )

  }

}

  render () {
    if (this.props.data.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }

    if (this.props.data.allInquiries&& this.props.data.allInquiries.error) {
    return <div>Error</div>
   }



    return (
    <div className="animated fadeIn">
      <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-image"></i> All Inquiry
               {this.renderAddNew()}
              </div>
              <div className="card-block">
                <table className="table table-bordered table-striped table-sm">
                  {this.renderMdm()}
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

const Uid = localStorage.getItem('uid');

const FeedQuery = gql`query allBrands($id: ID!) {
   allInquiries(orderBy: createdAt_DESC, filter:{
    user:{
      id: $id
    }
  }) {
    id
    title
    startAt
    endAt
    status
    isApprove
    user{
      id
      name
    }
    partner{
      id
      name
    }
  }
   
}`
const ListPageWithData = graphql(FeedQuery, {
  options: { variables: { id: Uid } }
})(Inquiry)

export default ListPageWithData