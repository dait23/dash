import React from 'react';
import { Link} from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';

class List extends React.Component {

  static propTypes = {
    notif: PropTypes.object,
    mutateNotif: PropTypes.func,
    refresh: PropTypes.func,
  }

  //  constructor(props) {
  //   super(props);
  //   //this.handleChange = this.handleChange.bind(this)
  // }

  

  render () {

  	//var xxx = '/slider/edit/'+this.props.slider.id;
    return (
     
                    <tr>
    
                      <td>{this.props.notif.title}</td>
                     
                      <td width='150'>
                         <Link to={`/setting/notif-type/edit/${this.props.notif.id}`} className="badge badge-info">Edit</Link>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateNotif({
      variables: {
        id: this.props.notif.id
      }
    })

    window.location.reload();
  }
}


const deleteNotif = gql`
  mutation deleteNotif($id: ID!) {
    deleteNotifType(id: $id) {
      id
    }
  }
`

const PageWithMutation = graphql(deleteNotif, {name : 'mutateNotif'})(List)

export default PageWithMutation

