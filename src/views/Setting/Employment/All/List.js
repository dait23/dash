import React from 'react';
import { Link} from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';

class List extends React.Component {

  static propTypes = {
    posisi: PropTypes.object,
    mutateEmployment: PropTypes.func,
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
    
                      <td>{this.props.posisi.title}</td>
                     
                      <td width='150'>
                         <Link to={`/setting/employment/edit/${this.props.posisi.id}`} className="badge badge-info">Edit</Link>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateEmployment({
      variables: {
        id: this.props.posisi.id
      }
    })

    window.location.reload();
  }
}


const deleteEmployment = gql`
  mutation deleteEmployment($id: ID!) {
    deleteEmployment(id: $id) {
      id
    }
  }
`

const PageWithMutation = graphql(deleteEmployment, {name : 'mutateEmployment'})(List)

export default PageWithMutation

