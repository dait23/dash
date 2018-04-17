import React from 'react';
import { Link} from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';


//cloudinaryConfig({ cloud_name: Cloudinary_Name });

class ListSlider extends React.Component {

  static propTypes = {
    message: PropTypes.object,
 //   mutatePost: PropTypes.func,
    refresh: PropTypes.func,
  }

  //  constructor(props) {
  //   super(props);
  //   //this.handleChange = this.handleChange.bind(this)
  // }





renderAction(){
  if(window.localStorage.getItem('urole') === 'Member'){
   
   return(
    <div>

        <Link to={`/messagesedit/${this.props.message.id}`} className="badge badge-info">Reply</Link>
        <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
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

    return (
     
                    <tr>
                      <td>{this.props.message.partner.name}</td>
                      <td>{this.props.message.content}</td>
                      <td>{this.props.message.updatedAt}</td>
                      <td width='250'>
                          {this.renderAction()}
                      </td>
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateBanner({
      variables: {
        idSlider: this.props.message.id,
      }
    })

    window.location.reload();
  }
}

const deleteBanner = gql`
  mutation deleteBanner($idSlider: ID!) {
    deleteMessage(id: $idSlider) {
      id
    }
  }
`

const SliderWithMutation = graphql(deleteBanner, {name : 'mutateBanner'})(ListSlider)

export default SliderWithMutation
