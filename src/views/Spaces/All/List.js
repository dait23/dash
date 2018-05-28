import React from 'react';
import { Link} from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
import {Cloudinary_Name, No_Avatar, No_Image} from '../../../views/Api/';
import {Image} from 'cloudinary-react';

class List extends React.Component {

  static propTypes = {
    space: PropTypes.object,
    mutateUser: PropTypes.func,
    refresh: PropTypes.func,
  }


renderThumb(){

    if (this.props.space.imageId === ""){

        return(

              <img src={No_Image} alt="thumb"/>
          )
                        
      }
      else{

        return(

             <Image cloudName={Cloudinary_Name} publicId={this.props.space.imageId} width="50" crop="scale" />

          )
      }      

  }



  render () {

    return (
     
                    <tr>
                    <td width="50">{this.renderThumb()}</td>
                      <td width="250">{this.props.space.title}</td>
                      <td>{this.props.space.partner.name}</td>
                      <td align="center">{this.props.space.total}</td>
                      <td width='200'>Rp. {this.props.space.price1}</td>
                      <td>{this.props.space.price7}</td>
                      <td>{this.props.space.price30}</td>
            
                      <td width='250'>
                         <a href={`/partners/space-edit/${this.props.space.id}`} className="badge badge-info">Edit</a>
 
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                        
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateUser({
      variables: {
        id: this.props.space.id
      }
    })

    window.location.reload();
  }
}

const deleteUser = gql`
  mutation deleteUser($id: ID!) {
    deleteSpace(id: $id) {
      id
    }
  }
`

const PageWithMutation = graphql(deleteUser, {name : 'mutateUser'})(List)

export default PageWithMutation
