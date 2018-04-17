import React from 'react';
import { Link} from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';


//cloudinaryConfig({ cloud_name: Cloudinary_Name });

class ListSlider extends React.Component {

  static propTypes = {
    place: PropTypes.object,
    mutatePlace: PropTypes.func,
    refresh: PropTypes.func,
  }




renderAction(){

  if(window.localStorage.getItem('urole') === 'Bde'){
   
   return(
    <div>

    </div>
    )
  }
  else{

    return(
      <div>
      <Link to={`/place/edit/${this.props.place.id}`} className="badge badge-info">Edit</Link>
      <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
      </div>
    )
  }
}


renderStatus(){

     if(this.props.place.status === '0'){

      return(

        <div><Link to={`/place/edit/${this.props.place.id}`} className="badge badge-warning">Not Complete</Link></div>

      )

     }else{

       return(

        <div><span className="badge badge-success" >Complete</span></div>

      )

     }

}




  render () {
    return (
     
                    <tr>
                      <td>{this.props.place.title}</td>
                      <td>{this.props.place.name}</td>
                      <td>{this.props.place.email}</td>
                      <td>{this.props.place.phone}</td>
                      <td dangerouslySetInnerHTML={{ __html: this.props.place.address }} ></td>
                                         <td>{this.props.place.area.name}</td>
                      <td>{this.props.place.category.name}</td>
                      <td dangerouslySetInnerHTML={{ __html: this.props.place.remarks }} ></td>
                      <td>{this.renderStatus()}</td>
                       <td>{this.props.place.source}</td>
                      <td width='150'>
                          <Link to={`/place/edit/${this.props.place.id}`} className="badge badge-info">Edit</Link>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutatePlace({
      variables: {
        id: this.props.place.id,
      }
    })
    window.location.reload();
  }
}

const deletePlace = gql`
  mutation deletePlace($id: ID!) {
    deletePlace(id: $id) {
      id
    }
  }
`

const SliderWithMutation = graphql(deletePlace, {name : 'mutatePlace'})(ListSlider)

export default SliderWithMutation
