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

  //  constructor(props) {
  //   super(props);
  //    this.state = { 
     
  //     open: false,

  //    }
  //   //this.handleChange = this.handleChange.bind(this)
  // }
  /////////////Modal


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
 
   if (this.props.inquiry.isApprove === true && window.localStorage.getItem('urole') === 'Member'){

    return(
    
      <div>
       <span className="badge badge-success">Approved</span>
       </div>

      )

   } 

   //  if (this.props.inquiry.status === '0' && window.localStorage.getItem('urole') === 'Bde'){

   //  return(
    
   //    <div>
   //     <span className="badge badge-success">Open</span>
   //     </div>

   //    )

   // }

   // if (this.props.inquiry.status === '0' && window.localStorage.getItem('urole') === 'Super'){

   //  return(
    
   //    <div>
   //     <Link to={`/inquiry/edit/${this.props.inquiry.id}`} className="badge badge-success">Open</Link>
   //     </div>

   //    )

   // }
   else{

      return(
      <div>
      <span className="badge badge-danger">Not Approved</span>
     </div>
      )
   }



  }


renderAction(){

  if(window.localStorage.getItem('urole') === 'Member' && this.props.inquiry.user.id === window.localStorage.getItem('uid')){
   
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



  render () {


    return (
     
                    <tr>
                      <td>{this.props.inquiry.partner.name}</td>
                       <td>{this.props.inquiry.startAt}</td>
                       <td>{this.props.inquiry.endAt}</td>                     
                     <td>{this.renderStatus()}</td>
                      <td width='150'>
                         {this.renderAction()}
                      </td>
           
                    </tr>
                
                  
    )
  }

  handleDelete = async () => {
    await this.props.mutateBanner({
      variables: {
        id: this.props.inquiry.id,
      }
    })

    window.location.reload();
  }
}

const deleteBanner = gql`
  mutation deleteBanner($id: ID!) {
    deleteInquiry(id: $id) {
      id
    }
  }
`

const SliderWithMutation = graphql(deleteBanner, {name : 'mutateBanner'})(ListSlider)

export default SliderWithMutation
