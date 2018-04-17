import React from 'react';
import { Link} from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';

class List extends React.Component {

  static propTypes = {
    visitor: PropTypes.object,
    mutateVisitor: PropTypes.func,
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
    
                      <td>{this.props.visitor.name}</td>
                     
                      <td width='150'>
                         <Link to={`/setting/visitor-type/edit/${this.props.visitor.id}`} className="badge badge-info">Edit</Link>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateVisitor({
      variables: {
        id: this.props.visitor.id
      }
    })

    window.location.reload();
  }
}


const deleteVisitorType = gql`
  mutation deleteVisitorType($id: ID!) {
    deleteVisitorType(id: $id) {
      id
    }
  }
`

const PageWithMutation = graphql(deleteVisitorType, {name : 'mutateVisitor'})(List)

export default PageWithMutation

