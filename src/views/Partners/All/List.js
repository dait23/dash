import React from 'react';
import { Link} from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
import ListSpace from './ListSpace';

class List extends React.Component {

  static propTypes = {
    partner: PropTypes.object,
    mutateUser: PropTypes.func,
    refresh: PropTypes.func,
  }



renderGallery(){

 if(this.props.partner.status){


 }

}


  
 renderStatus(){

     if(this.props.partner.status === '0' ){

      return(

        <div><Link to={`/partners/edit/${this.props.partner.id}`} className="badge badge-warning">Not Complete</Link></div>

      )

      }
     else{

       return(

        <div><span className="badge badge-success" >Complete</span></div>

      )

     }

}


  render () {

    return (
     
                    <tr>
                      <td>{this.props.partner.name}</td>
                      <td>{this.props.partner.category.name}</td>
                      <td>{this.props.partner.area.name}</td>
                      <td>


                           <ul>
                            {this.props.partner.spaces.map((space) => (
                            <ListSpace
                              key={space.id}
                              space={space}
                            />
                          ))}
                          </ul>

                      </td>
      
            
                      <td width='200'>
                         <a href={`/partners/edit/${this.props.partner.id}`} className="badge badge-info">Edit</a>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                         <Link to={`/partners/space/${this.props.partner.id}`} className="badge badge-success">Add Space</Link>
                        
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateUser({
      variables: {
        id: this.props.partner.id
      }
    })

    window.location.reload();
  }
}

const deleteUser = gql`
  mutation deleteUser($id: ID!) {
    deletePartner(id: $id) {
      id
    }
  }
`

const PageWithMutation = graphql(deleteUser, {name : 'mutateUser'})(List)

export default PageWithMutation
