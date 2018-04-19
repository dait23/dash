import React from 'react';
import { Link} from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';

class List extends React.Component {

  static propTypes = {
    rent: PropTypes.object,
    mutateSize: PropTypes.func,
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
    
                      <td>{this.props.rent.name}</td>
                     
                      <td width='150'>
                         <Link to={`/setting/rent-type/edit/${this.props.rent.id}`} className="badge badge-info">Edit</Link>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateSize({
      variables: {
        id: this.props.rent.id
      }
    })

    window.location.reload();
  }
}


const deleteSize = gql`
  mutation deleteSize($id: ID!) {
    deleteRentType(id: $id) {
      id
    }
  }
`

const PageWithMutation = graphql(deleteSize, {name : 'mutateSize'})(List)

export default PageWithMutation

