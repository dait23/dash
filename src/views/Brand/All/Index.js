import React from 'react';
import { Link} from 'react-router-dom';
import ListSlider from './List';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';

class Brand extends React.Component {

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
      
       <Link to={'/brand/new'} className="btn btn-success btn-sm pull-right"><i className="fa fa-plus"></i>&nbsp; Add New</Link>
    )
  }
  else{

    return(
      
      <Link to={'/brand/new'} className="btn btn-success btn-sm pull-right"><i className="fa fa-plus"></i>&nbsp; Add New</Link>
    )
  }
}

renderMdm(){

  if(window.localStorage.getItem('urole') === 'Mdm'){

   return(


            <thead>
                    <tr>
                      <th>Brand Name</th>
                      <th>Link</th>
                      <th>Follower</th>
                      <th>Category</th>
                      <th>Type</th>
                      <th>Phone</th>
                      <th>Source</th>
                      <th>Action</th>
                    </tr>
                  </thead>

   )

  }else{

    return(
    

      <thead>
                    <tr>
                      <th>Brand Name</th>
                      <th>Link</th>
                       <th>Follower</th>
                      <th>Category</th>
                      <th>Type</th>
                      <th>Phone</th>
                       <th>Status</th>
                        <th>Source</th>
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
                  {this.renderMdm()}
                  <tbody>
           {this.props.data.allBrands.map((brand) => (
            <ListSlider
              key={brand.id}
              brand={brand}
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
   allBrands(orderBy: createdAt_DESC) {
    id
    name
    phone
    address
    facebook
    instagram
    website
    twitter
    follower
    email
    status
    source
    type{
      name
    }
    category{
      name
    }
  }
   
}`

const ListPageWithData = graphql(FeedQuery)(Brand)

export default ListPageWithData