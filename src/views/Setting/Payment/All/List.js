import React from 'react';
import { Link} from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';

class List extends React.Component {

  static propTypes = {
    payment: PropTypes.object,
    //mutatePayment: PropTypes.func,
    refresh: PropTypes.func,
  }

  //  constructor(props) {
  //   super(props);
  // }

  

  render () {

    return (
     
                    <tr>
    
                      <td>{this.props.payment.name}</td>
                     
                      <td width='150'>
                         <Link to={`/setting/payment/edit/${this.props.payment.id}`} className="badge badge-info">Edit</Link>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutatePayment({
      variables: {
        id: this.props.payment.id
      }
    })

    window.location.reload();
  }
}


const deletePayment = gql`
  mutation deletePayment($id: ID!) {
    deletePayment(id: $id) {
      id
    }
  }
`

const PageWithMutation = graphql(deletePayment, {name : 'mutatePayment'})(List)

export default PageWithMutation

