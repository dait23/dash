import React from 'react';
import { Link} from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
import {Cloudinary_Name, No_Avatar} from '../../../views/Api/';
import {Image} from 'cloudinary-react';

class List extends React.Component {

  static propTypes = {
    team: PropTypes.object,
    mutateUser: PropTypes.func,
    refresh: PropTypes.func,
  }

  //  constructor(props) {
  //   super(props);
  //   //this.handleChange = this.handleChange.bind(this)
  // }
  
  renderAvatar(){

    if (this.props.team.imageId === ""){

        return(

              <img src={No_Avatar} alt="avatar"/>
          )
                        
      }
      else{

        return(

             <Image cloudName={Cloudinary_Name} publicId={this.props.team.imageId} width="80" crop="scale"/>

          )
      }                 
                      
  }

  render () {

    return (
     
                    <tr>
                      <td>{this.props.team.firstName} &nbsp;{this.props.team.lastName}</td>
                       <td>{this.props.team.user.email}</td>
                       <td> {this.renderAvatar()}</td>
                      <td width='150'>
                         <Link to={`/mdm/edit/${this.props.team.user.id}`} className="badge badge-info">Edit</Link>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateUser({
      variables: {
        idUser: this.props.team.id
      }
    })

    window.location.reload();
  }
}

const deleteUser = gql`
  mutation deleteUser($idUser: ID!) {
    deleteMDM(id: $idUser) {
      id
    }
  }
`

const PageWithMutation = graphql(deleteUser, {name : 'mutateUser'})(List)

export default PageWithMutation
