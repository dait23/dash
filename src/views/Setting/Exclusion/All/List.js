import React from 'react';
import { Link} from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';

class List extends React.Component {

  static propTypes = {
    inclusion: PropTypes.object,
    mutateBrand: PropTypes.func,
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
    
                      <td>{this.props.inclusion.name}</td>
                     
                      <td width='150'>
                         <Link to={`/setting/exclusion/edit/${this.props.inclusion.id}`} className="badge badge-info">Edit</Link>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateBrand({
      variables: {
        id: this.props.inclusion.id
      }
    })

    window.location.reload();
  }
}


const deleteBrand = gql`
  mutation deleteBrand($id: ID!) {
    deleteExclusion(id: $id) {
      id
    }
  }
`

const PageWithMutation = graphql(deleteBrand, {name : 'mutateBrand'})(List)

export default PageWithMutation

