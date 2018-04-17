import React from 'react';
import { Link} from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';

class List extends React.Component {

  static propTypes = {
    ukuran: PropTypes.object,
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
    
                      <td>{this.props.ukuran.size}</td>
                     
                      <td width='150'>
                         <Link to={`/setting/size/edit/${this.props.ukuran.id}`} className="badge badge-info">Edit</Link>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateSize({
      variables: {
        id: this.props.ukuran.id
      }
    })

    window.location.reload();
  }
}


const deleteSize = gql`
  mutation deleteSize($id: ID!) {
    deleteWideSpace(id: $id) {
      id
    }
  }
`

const PageWithMutation = graphql(deleteSize, {name : 'mutateSize'})(List)

export default PageWithMutation

