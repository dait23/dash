import React from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
//import {Cloudinary_Name, No_Avatar} from '../../../views/Api/';
//import {Image} from 'cloudinary-react';

class List extends React.Component {

  static propTypes = {
    event: PropTypes.object,
    mutateUser: PropTypes.func,
    refresh: PropTypes.func,
  }



  render () {
// console.log(this.props.collabsStore)
    return (
     
                    <tr>
                      <td>{this.props.event.name}</td>
                      <td width='150'>
                        <a href={`/setting/event-type/edit/${this.props.event.id}`} className="badge badge-info">Edit</a>
                         
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateUser({
      variables: {
        id: this.props.event.id
      }
    })

    window.location.reload();
  }
}

const deleteUser = gql`
  mutation deleteUser($id: ID!) {
    deleteEventType(id: $id) {
      id
    }
  }
`

const PageWithMutation = graphql(deleteUser, {name : 'mutateUser'})(List)

export default PageWithMutation
