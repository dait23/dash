import React from 'react';
import { Link} from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
import {Cloudinary_Name, No_Avatar, No_Image} from '../../../views/Api/';
import {Image} from 'cloudinary-react';
import ListSpace from './ListSpace';
import ListGal from './ListGal';

class List extends React.Component {

  static propTypes = {
    partner: PropTypes.object,
    mutateUser: PropTypes.func,
    refresh: PropTypes.func,
  }



renderGallery(){

 if(this.props.partner.galleries == ''){
  
   return(
      
        <p>No Gallery</p>
    )

 }
 else{
   return(

       <ol>
                            {this.props.partner.galleries.map((galeri) => (
                            <ListGal
                              key={galeri.id}
                              galeri={galeri}
                            />
                          ))}
                          </ol>
   )
 }

}


////////// render image

  renderThumb(){

    if (this.props.partner.imageId === ""){

        return(

              <img src={No_Image} alt="thumb"/>
          )
                        
      }
      else{

        return(

             <Image cloudName={Cloudinary_Name} publicId={this.props.partner.imageId} width="50" crop="scale" />

          )
      }      

  }



renderSpace(){

  if(this.props.partner.spaces === []){

    return(
           
           <p>Empty Spaces</p>

      )

  }else{

     return(


     <ol>
                            {this.props.partner.spaces.map((space) => (
                            <ListSpace
                              key={space.id}
                              space={space}
                            />
                          ))}
                          </ol>



     )

    

  }

}

  
 renderStatus(){

     if(this.props.partner.status == '0' ){

      return(

       <span className="badge badge-warning">Draft</span>

      )

      }
       if(this.props.partner.status == '2' ){

      return(

       <span className="badge badge-info">Pending</span>

      )

      }
       if(this.props.partner.status == '3' ){

      return(

       <span className="badge badge-danger">Expired</span>

      )

      }
     else{

       return(

        <span className="badge badge-success">Publish</span>

      )

     }

}


  render () {

    return (
     
                    <tr>
                     <td width="50">{this.renderThumb()}</td>
                      <td>{this.props.partner.name}</td>
                      <td>{this.props.partner.category.name}</td>
                      <td>{this.props.partner.area.name}</td>
                       <td align="center">{this.renderStatus()}</td>
                      <td>

                         {this.renderSpace()}
                           

                      </td>
      
                     <td align="center">{this.renderGallery()}</td>
                      <td width='250'>
                         <a href={`/partners/edit/${this.props.partner.id}`} className="badge badge-info">Edit</a>
                         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                         <Link to={`/partners/space/${this.props.partner.id}`} className="badge badge-success">Add Space</Link>
                         <a href={`/partners/gallery/${this.props.partner.id}`} className="badge badge-warning">Add Gallery</a>
                        
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
