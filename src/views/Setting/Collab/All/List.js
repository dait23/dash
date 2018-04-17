import React from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
//import {Cloudinary_Name, No_Avatar} from '../../../views/Api/';
//import {Image} from 'cloudinary-react';

class List extends React.Component {

  static propTypes = {
    collab: PropTypes.object,
    collabsStore: PropTypes.object,
    mutateUser: PropTypes.func,
    refresh: PropTypes.func,
  }



  render () {
 console.log(this.props.collabsStore)
    return (
     
                    <tr>
                      <td>{this.props.collab.name}</td>
                      <td width='150'>
                        <a href={`/setting/collabs/edit/${this.props.collab.id}`} className="badge badge-info">Edit</a>
                         
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateUser({
      variables: {
        id: this.props.collab.id
      }
    })

    window.location.reload();
  }
}

const deleteUser = gql`
  mutation deleteUser($id: ID!) {
    deleteCollab(id: $id) {
      id
    }
  }
`

const PageWithMutation = graphql(deleteUser, {name : 'mutateUser'})(List)

export default PageWithMutation
