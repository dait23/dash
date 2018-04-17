import React from 'react';
import { Link} from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';

//cloudinaryConfig({ cloud_name: Cloudinary_Name });

class ListSlider extends React.Component {

  static propTypes = {
    request: PropTypes.object,
    mutateRequest: PropTypes.func,
    refresh: PropTypes.func,
  }

   constructor(props) {
    super(props);
     this.state = { 
     
      open: false,

     }
    //this.handleChange = this.handleChange.bind(this)
  }
  /////////////Modal

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  ////////////Modal

  renderStatus(){
 
  if (this.props.request.status !== 1){

    return(
    
      <div>
       <Link to={`/request/edit/${this.props.request.id}`} className="badge badge-success">Open</Link>
       </div>

      )

   }
   else{

      return(
      <div>
      <span className="badge badge-danger">Close</span>
     </div>
      )
   }



  }


renderAction(){

  if(window.localStorage.getItem('urole') === 'Mdm' && this.props.request.user.id === window.localStorage.getItem('uid')){
   
   return(
    <div>
     
      <Link to={`/request/edit/${this.props.request.id}`} className="badge badge-info">Edit</Link>
      <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
    </div>
    )
  }
   if(window.localStorage.getItem('urole') === 'Super'){
   
   return(
    <div>
     
      <Link to={`/request/edit/${this.props.request.id}`} className="badge badge-info">Edit</Link>
      <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
    </div>
    )
  }
  else{

    return(
      <div>
       <span className="badge badge-warning" onClick={this.onOpenModal} style={{cursor: 'pointer'}}>View</span>
      </div>
    )
  }
}

renderModal(){
 const { open } = this.state;
  return(

     <div>
        <Modal open={open} onClose={this.onCloseModal} little>
          <h4>{this.props.request.title}</h4>
           <tr>
                      <td>{this.props.request.title}</td><br />
                      <td>{this.props.request.category.name}</td><br />
                      <td>{this.props.request.type.name}</td><br />
                      <td>{this.props.request.user.name}</td><br />
                      
           </tr>
        </Modal>
      </div>

  )
}



  render () {
    return (
     
                    <tr>
                      <td>{this.props.request.title}</td>
                      <td>{this.props.request.periode}</td>
                      <td>{this.props.request.category.name}</td>
                      <td>{this.props.request.type.name}</td>
                       <td>{this.props.request.follower}</td>
                       <td>{this.props.request.user.name}</td>
                         <td>{this.renderStatus()}</td>
                      <td width='150'>
                         {this.renderAction()}
                      </td>
                       {this.renderModal()}
                    </tr>
                
                  
    )
  }

  handleDelete = async () => {
    await this.props.mutateRequest({
      variables: {
        id: this.props.request.id,
      }
    })

    window.location.reload();
  }
}

const deleteRequest = gql`
  mutation deleteRequest($id: ID!) {
    deleteRequest(id: $id) {
      id
    }
  }
`

const SliderWithMutation = graphql(deleteRequest, {name : 'mutateRequest'})(ListSlider)

export default SliderWithMutation
