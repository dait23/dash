import React from 'react';
import { Link} from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';


class ListSpace extends React.Component {

  static propTypes = {
    space: PropTypes.object,
    mutateDestinasi: PropTypes.func,
    refresh: PropTypes.func,
  }

   constructor(props) {
    super(props);
    //this.handleChange = this.handleChange.bind(this)
  }

  render () {

  	//var xxx = '/slider/edit/'+this.props.slider.id;
    return (
     
                    <li>
                      <Link to={`/partners/space-edit/${this.props.space.id}`}>{this.props.space.title} </Link> -   <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>X</span>
                  
                    </li>
    )
  }

  handleDelete = async () => {
    await this.props.mutateDestinasi({
      variables: {
        id: this.props.space.id
      }
    })

    window.location.reload();
  }
}

const deleteCollection = gql`
  mutation deleteCollection($id: ID!) {
    deleteSpace(id: $id) {
      id
    }
  }
`

const PageWithMutation = graphql(deleteCollection, {name : 'mutateDestinasi'})(ListSpace)

export default PageWithMutation
