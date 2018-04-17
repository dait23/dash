import React from 'react';
import { Link} from 'react-router-dom';
import List from './List';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';

class Bde extends React.Component {

  static propTypes = {
    data: PropTypes.object,
    refresh: PropTypes.func,
  }
  

  componentDidMount() {
       this.forceUpdate();
  }
  render () {
    if (this.props.data.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }

    return (
    <div className="animated fadeIn">
      <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="icon-people"></i> All Bde Member
                <Link to={'/bde/new'} className="btn btn-success btn-sm pull-right"><i className="fa fa-plus"></i>&nbsp; Add New</Link>
              </div>
              <div className="card-block">
                <table className="table table-bordered table-striped table-sm">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Photo</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
           {this.props.data.allBDEs.map((bde) => (
            <List
              key={bde.id}
              bde={bde}
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

const FeedQuery = gql`query allMDMs {
  allBDEs(orderBy: firstName_ASC) {
     id
    firstName
    lastName
    imageId
    imageUrl
    user{
      id
      email
      name
    }
  }
 
}`

const ListPageWithData = graphql(FeedQuery)(Bde)

export default ListPageWithData