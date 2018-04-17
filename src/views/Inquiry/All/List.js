import React from 'react';
import { Link} from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';

class ListSlider extends React.Component {

  static propTypes = {
    inquiry: PropTypes.object,
    //mutatePost: PropTypes.func,
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

  ///////////////////////

//   renderFacility(){

//     if (this.state.loading) {
//       return (<div><Spinner name="double-bounce" /></div>)
//     }
     
//   return(
//      <td>
//       {this.props.inquiry.facilities.map((fasilitas) => (

//                         "xxx"
//                        ))}   
//   </td>
//     )

  
// }

  ////////////Modal



  renderStatus(){
 
   if (this.props.inquiry.status === '0' && window.localStorage.getItem('urole') === 'Mdm'){

    return(
    
      <div>
       <span className="badge badge-success">Open</span>
       </div>

      )

   } 

    if (this.props.inquiry.status === '0' && window.localStorage.getItem('urole') === 'Bde'){

    return(
    
      <div>
       <span className="badge badge-success">Open</span>
       </div>

      )

   }

   if (this.props.inquiry.status === '0' && window.localStorage.getItem('urole') === 'Super'){

    return(
    
      <div>
       <Link to={`/inquiry/edit/${this.props.inquiry.id}`} className="badge badge-success">Open</Link>
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

  if(window.localStorage.getItem('urole') === 'Mdm' && this.props.inquiry.user.id === window.localStorage.getItem('uid')){
   
   return(
    <div>
     
      <Link to={`/inquiry/edit/${this.props.inquiry.id}`} className="badge badge-info">Edit</Link>
      <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
    </div>
    )
  }
   if(window.localStorage.getItem('urole') === 'Super'){
   
   return(
    <div>
     
      <Link to={`/inquiry/edit/${this.props.inquiry.id}`} className="badge badge-info">Edit</Link>
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
          <h4>{this.props.inquiry.title}</h4>
           <tr>
                      <td>{this.props.inquiry.title}</td><br />
                      <td>{this.props.inquiry.wide}</td><br />
                      <td>{this.props.inquiry.category.name}</td><br />
                      <td>{this.props.inquiry.type.name}</td><br />
                      <td>{this.props.inquiry.area.name}</td><br />
                      <td dangerouslySetInnerHTML={{ __html: this.props.inquiry.remarks }} ></td><br />
                       <td>{this.props.inquiry.user.name}</td><br />
                         <td>{this.renderStatus()}</td>
           </tr>
        </Modal>
      </div>

  )
}



  render () {


    return (
     
                    <tr>
                      <td>{this.props.inquiry.title}</td>
                       <td></td>
                      <td>{this.props.inquiry.wide}</td>
                      <td>{this.props.inquiry.category.name}</td>
                      <td>{this.props.inquiry.type.name}</td>
                      <td>{this.props.inquiry.facilities.map((tipe) => (
                        tipe.name + ', '
                       ))}   
                     </td>
                      <td>{this.props.inquiry.area.name}</td>
                      <td dangerouslySetInnerHTML={{ __html: this.props.inquiry.remarks }} ></td>
                       <td>{this.props.inquiry.user.name}</td>
                         <td>{this.renderStatus()}</td>
                      <td width='150'>
                         {this.renderAction()}
                      </td>
                       {this.renderModal()}
                    </tr>
                
                  
    )
  }

  handleDelete = async () => {
    await this.props.mutateBanner({
      variables: {
        idSlider: this.props.inquiry.id,
      }
    })

    window.location.reload();
  }
}

const deleteBanner = gql`
  mutation deleteBanner($idSlider: ID!) {
    deleteInquiry(id: $idSlider) {
      id
    }
  }
`

const SliderWithMutation = graphql(deleteBanner, {name : 'mutateBanner'})(ListSlider)

export default SliderWithMutation
