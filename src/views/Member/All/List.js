import React from 'react';
import { Link} from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
import {Cloudinary_Name, No_Avatar} from '../../../views/Api/';
import {Image} from 'cloudinary-react';

class List extends React.Component {

  static propTypes = {
    member: PropTypes.object,
    mutateUser: PropTypes.func,
    refresh: PropTypes.func,
  }

  //  constructor(props) {
  //   super(props);
  //   //this.handleChange = this.handleChange.bind(this)
  // }
  
  renderAvatar(){

    if (this.props.member.imageId === ""){

        return(

              <img src={No_Avatar} alt="avatar"/>
          )
                        
      }
      else{

        return(

             <Image cloudName={Cloudinary_Name} publicId={this.props.member.imageId} width="80" crop="scale"/>

          )
      }                 
                      
  }

  render () {

    return (
     
                    <tr>
                      <td>{this.props.member.firstName} &nbsp;{this.props.member.lastName}</td>
                       <td>{this.props.member.user.email}</td>
                       <td> {this.renderAvatar()}</td>
                      <td width='150'>
                         <Link to={`/member/edit/${this.props.member.user.id}`} className="badge badge-info">Edit</Link>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateUser({
      variables: {
        id: this.props.member.id
      }
    })

    window.location.reload();
  }
}

const deleteUser = gql`
  mutation deleteUser($id: ID!) {
    deleteMember(id: $id) {
      id
    }
  }
`

const PageWithMutation = graphql(deleteUser, {name : 'mutateUser'})(List)

export default PageWithMutation
