import React from 'react';
import { Link} from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';


//cloudinaryConfig({ cloud_name: Cloudinary_Name });

class ListSlider extends React.Component {

  static propTypes = {
    brand: PropTypes.object,
 //   mutatePost: PropTypes.func,
    refresh: PropTypes.func,
  }

  //  constructor(props) {
  //   super(props);
  //   //this.handleChange = this.handleChange.bind(this)
  // }


///////////

renderLink(){

    if (this.props.brand.facebook !==  null){
        
        return(

            
             <td><Link to={`${this.props.brand.facebook}`} target='_Blank'>{this.props.brand.facebook}</Link></td>

          )

    } if (this.props.brand.instagram !== null){
        
        return(

            
             <td><Link to={`${this.props.brand.instagram}`} >{this.props.brand.instagram}</Link></td>

          )

    }
    if (this.props.brand.twitter !== null){
        
        return(

            
             <td><Link to={`${this.props.brand.twitter}`} >{this.props.brand.twitter}</Link></td>

          )

    }
    else{
     
      return(

            
            <td><Link to={`${this.props.brand.website}`} >{this.props.brand.website}</Link></td>

          )

    }
}

////////////////

renderX(){

  if (window.localStorage.getItem('urole') === 'Mdm'){


    return(
       
       <div></div>

      )
  }
  else{

   return(
     <td>
     {this.renderStatus()}
     </td>
   )

  }
}

//////////////

renderStatus(){

     if(this.props.brand.status === '0' ){

      return(

        <div><Link to={`/brand/edit/${this.props.brand.id}`} className="badge badge-warning">Not Complete</Link></div>

      )

      }
     else{

       return(

        <div><span className="badge badge-success" >Complete</span></div>

      )

     }

}



renderAction(){
  if(window.localStorage.getItem('urole') === 'Mdm'){
   
   return(
    <div>

       <Link to={`/brand/view/${this.props.brand.id}`} className="badge badge-info">View</Link>
       <Link to={`/brand/create/${this.props.brand.id}`} className="badge badge-success">Create Workflow</Link>
    </div>
    )
  }
   if(window.localStorage.getItem('urole') === 'Super'){
   
   return(
    <div>

         <Link to={`/brand/edit/${this.props.brand.id}`} className="badge badge-info">Edit</Link>
        <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
    </div>
    )
  }
  else{

    return(
      <div>
      <Link to={`/brand/edit/${this.props.brand.id}`} className="badge badge-info">Edit</Link>
      <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
      </div>
    )
  }
}




  render () {
    //console.log(window.localStorage.getItem('urole'));
    return (
     
                    <tr>
                      <td>{this.props.brand.name}</td>
                      {this.renderLink()}
                      <td>{this.props.brand.follower}</td>
                      <td>{this.props.brand.category.name}</td>
                      <td>{this.props.brand.type.name}</td>
                      <td>{this.props.brand.phone}</td>
                      
                       {this.renderX()}
                       <td>{this.props.brand.source}</td>
                      <td width='150'>
                          {this.renderAction()}
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateBanner({
      variables: {
        idSlider: this.props.brand.id,
      }
    })

    window.location.reload();
  }
}

const deleteBanner = gql`
  mutation deleteBanner($idSlider: ID!) {
    deleteBrand(id: $idSlider) {
      id
    }
  }
`

const SliderWithMutation = graphql(deleteBanner, {name : 'mutateBanner'})(ListSlider)

export default SliderWithMutation
