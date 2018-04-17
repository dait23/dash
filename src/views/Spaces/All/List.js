import React from 'react';
import { Link} from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';


class List extends React.Component {

  static propTypes = {
    space: PropTypes.object,
    mutateUser: PropTypes.func,
    refresh: PropTypes.func,
  }




  render () {

    return (
     
                    <tr>
                      <td>{this.props.space.title}</td>
                      <td>{this.props.space.partner.name}</td>
                      <td>{this.props.space.price}</td>
            
                      <td width='250'>
                         <a href={`/spaces/edit/${this.props.space.id}`} className="badge badge-info">Edit</a>
 
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                        
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateUser({
      variables: {
        id: this.props.space.id
      }
    })

    window.location.reload();
  }
}

const deleteUser = gql`
  mutation deleteUser($id: ID!) {
    deleteSpace(id: $id) {
      id
    }
  }
`

const PageWithMutation = graphql(deleteUser, {name : 'mutateUser'})(List)

export default PageWithMutation
