import React from 'react';
import { Link} from 'react-router-dom';
import List from './List';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';

class Notif extends React.Component {

  static propTypes = {
    data: PropTypes.object,
    refresh: PropTypes.func,
  }
  
  
  componentDidMount() {
       this.forceUpdate();
  }
  render () {
  	console.log(this.props.allPostsQuery.loading);
    if (this.props.allPostsQuery.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }


    return (
    <div className="anixmated fadeIn">
      <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-tag"></i> All Notification Type
                <Link to={'/setting/notif-type/new'} className="btn btn-success btn-sm pull-right"><i className="fa fa-plus"></i>&nbsp; Add New</Link>
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
           {this.props.allPostsQuery.allNotifTypes.map((notif) => (
            <List
              key={notif.id}
              notif={notif}
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
  query AllPostsQuery {
    allNotifTypes (orderBy: title_DESC) {
      id
      slug
      title
    }  
  }
`

export default graphql(ALL_QUERY, { name: 'allPostsQuery'})(Notif)
