import React from 'react';
import { Link} from 'react-router-dom';
import List from './List';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';

class Segment extends React.Component {

  static propTypes = {
    data: PropTypes.object,
    refresh: PropTypes.func,
  }
  
  

  render () {
  	console.log(this.props.allQuery.loading);
    if (this.props.allQuery.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }


    return (
    <div className="anixmated fadeIn">
      <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-tag"></i> All Segment
                <Link to={'/setting/segment/new'} className="btn btn-success btn-sm pull-right"><i className="fa fa-plus"></i>&nbsp; Add New</Link>
              </div>
              <div className="card-block">
                <table className="table table-bordered table-striped table-sm">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
           {this.props.allQuery.allSegments.map((segment) => (
            <List
              key={segment.id}
              segment={segment}
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




const ALL_QUERY = gql`
  query AllQuery {
    allSegments (orderBy: name_ASC) {
      id
      slug
      name
    }  
  }
`

export default graphql(ALL_QUERY, { name: 'allQuery'})(Segment)
