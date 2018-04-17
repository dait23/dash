import React from 'react';
import { Link} from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';

class List extends React.Component {

  static propTypes = {
    brand: PropTypes.object,
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
    
                      <td>{this.props.brand.name}</td>
                     
                      <td width='150'>
                         <Link to={`/setting/category-partners/edit/${this.props.brand.id}`} className="badge badge-info">Edit</Link>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateBrand({
      variables: {
        id: this.props.brand.id
      }
    })

    window.location.reload();
  }
}


const deleteBrand = gql`
  mutation deleteBrand($id: ID!) {
    deletePartnerCategory(id: $id) {
      id
    }
  }
`

const PageWithMutation = graphql(deleteBrand, {name : 'mutateBrand'})(List)

export default PageWithMutation

