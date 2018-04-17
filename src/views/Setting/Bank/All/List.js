import React from 'react';
import { Link} from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';

class List extends React.Component {

  static propTypes = {
    bank: PropTypes.object,
    mutateBank: PropTypes.func,
    refresh: PropTypes.func,
  }

  //  constructor(props) {
  //   super(props);
  // }

  

  render () {


    return (
     
                    <tr>
    
                      <td>{this.props.bank.name}</td>

                      <td>{this.props.bank.number}</td>
                      <td>{this.props.bank.description}</td>                       
                      <td width='150'>
                         <Link to={`/setting/bank/edit/${this.props.bank.id}`} className="badge badge-info">Edit</Link>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateBank({
      variables: {
        id: this.props.bank.id
      }
    })

    window.location.reload();
  }
}


const deleteBank = gql`
  mutation deleteBank($id: ID!) {
    deleteBank(id: $id) {
      id
    }
  }
`

const PageWithMutation = graphql(deleteBank, {name : 'mutateBank'})(List)

export default PageWithMutation

