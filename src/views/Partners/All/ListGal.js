import React from 'react';
import { Link} from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';


class ListGal extends React.Component {

  static propTypes = {
    galeri: PropTypes.object,
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
                      <a href={`/partners/gallery-edit/${this.props.galeri.id}`}>{this.props.galeri.name} </a> -   <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>X</span>
                  
                    </li>
    )
  }

  handleDelete = async () => {
    await this.props.mutateDestinasi({
      variables: {
        id: this.props.galeri.id
      }
    })

    window.location.reload();
  }
}

const deleteCollection = gql`
  mutation deleteCollection($id: ID!) {
    deleteGallery(id: $id) {
      id
    }
  }
`

const PageWithMutation = graphql(deleteCollection, {name : 'mutateDestinasi'})(ListGal)

export default PageWithMutation
