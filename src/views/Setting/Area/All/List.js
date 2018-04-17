import React from 'react';
import { Link} from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';

class List extends React.Component {

  static propTypes = {
    area: PropTypes.object,
    mutateArea: PropTypes.func,
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
    
                      <td>{this.props.area.name}</td>
                     
                      <td width='150'>
                         <Link to={`/setting/area/edit/${this.props.area.id}`} className="badge badge-info">Edit</Link>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateArea({
      variables: {
        id: this.props.area.id
      }
    })

    window.location.reload();
  }
}


const deleteArea = gql`
  mutation deleteArea($id: ID!) {
    deleteArea(id: $id) {
      id
    }
  }
`

const PageWithMutation = graphql(deleteArea, {name : 'mutateArea'})(List)

export default PageWithMutation

