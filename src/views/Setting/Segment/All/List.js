import React from 'react';
import { Link} from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';

class List extends React.Component {

  static propTypes = {
    segment: PropTypes.object,
    mutateSegment: PropTypes.func,
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
    
                      <td>{this.props.segment.name}</td>
                     
                      <td width='150'>
                         <Link to={`/setting/segment/edit/${this.props.segment.id}`} className="badge badge-info">Edit</Link>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateSegment({
      variables: {
        id: this.props.segment.id
      }
    })

    window.location.reload();
  }
}


const deleteSegment = gql`
  mutation deleteSegment($id: ID!) {
    deleteSegment(id: $id) {
      id
    }
  }
`

const PageWithMutation = graphql(deleteSegment, {name : 'mutateSegment'})(List)

export default PageWithMutation

