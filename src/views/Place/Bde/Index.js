import React from 'react';
import { Link} from 'react-router-dom';
import ListSlider from './List';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';

class Place extends React.Component {

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

  if(window.localStorage.getItem('urole') === 'Bde'){
   
   return(
      
       <Link to={'/place/new'} className="btn btn-success btn-sm pull-right"><i className="fa fa-plus"></i>&nbsp; Add New</Link>
    )
  }
  else{

    return(
      
      <Link to={'/place/new'} className="btn btn-success btn-sm pull-right"><i className="fa fa-plus"></i>&nbsp; Add New</Link>
    )
  }
}


  render () {
    if (this.props.data.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }

    if (this.props.data.allPlaces && this.props.data.allPlaces.error) {
    return <div>Error</div>
   }

    return (
    <div className="animated fadeIn">
      <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-image"></i> All Places ({this.props.data._allPlacesMeta.count})
               {this.renderAddNew()}
              </div>
              <div className="card-block">
                <table className="table table-bordered table-striped table-sm">
                  <thead>
                    <tr>
                      <th>Place Name</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Address</th>
                       <th>Area</th>
                      <th>Category</th>
                      <th>Remarks</th>
                      <th>Source</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
           {this.props.data.allPlaces.map((place) => (
            <ListSlider
              key={place.id}
              place={place}
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

const FeedQuery = gql`query allPlaces {
   allPlaces(filter:{
    status: 1
  }, orderBy: createdAt_DESC) {
    id
    title
    name
    email
    phone
    picName
    picEmail
    picPhone
    address
    remarks
    source
    status
    area{
      name
    }
    category{
      name
    }
  }
  _allPlacesMeta (filter:{
    status: 1
  }){
    count
  }
}`

const ListPageWithData = graphql(FeedQuery)(Place)

export default ListPageWithData