import React from 'react';
import { Link} from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
//import Moment from 'react-moment';
import moment from 'moment'
//import 'moment-timezone';
//cloudinaryConfig({ cloud_name: Cloudinary_Name });


 moment.locale('id')
class ListSlider extends React.Component {

  static propTypes = {
    workflow: PropTypes.object,
    mutateWorkflow: PropTypes.func,
    refresh: PropTypes.func,
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

     if(this.props.workflow.status === '1' ){

      return(

        <div><span className="badge badge-danger" >FU 1</span></div>


      )

      }
       if(this.props.workflow.status === '2' ){

      return(

        <div><span className="badge badge-warning" >FU 2</span></div>

      )

      }
     else{

       return(

        <div><span className="badge badge-success" >FU 3</span></div>

      )

     }

}



// renderAction(){
//   if(window.localStorage.getItem('urole') == 'Mdm'){
   
//    return(
//     <div>

//        <Link to={`/brand/view/${this.props.brand.id}`} className="badge badge-info">View</Link>
//        <Link to={`/brand/create/${this.props.brand.id}`} className="badge badge-success">Create Workflow</Link>
//     </div>
//     )
//   }
//    if(window.localStorage.getItem('urole') == 'Super'){
   
//    return(
//     <div>

//         <Link to={`/brand/edit/${this.props.brand.id}`} className="badge badge-info">Edit</Link>
//         <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
//     </div>
//     )
//   }
//   else{

//     return(
//       <div>
//       <Link to={`/brand/edit/${this.props.brand.id}`} className="badge badge-info">Edit</Link>
//       <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
//       </div>
//     )
//   }
// }




  render () {
    //console.log(window.localStorage.getItem('urole'));
    const dateTime= this.props.workflow.createdAt
    //Moment.locale('id') //For Turkey
   const formattedDT = moment(dateTime).format('LL')//20 Mart 2017
    return (
     
                    <tr>
                     <td>{formattedDT}</td>
                      <td>{this.props.workflow.name}</td>
                      <td>{this.props.workflow.brand.category.name}</td>
                      <td>{this.props.workflow.picName}</td>
                       <td>{this.props.workflow.picPhone}</td>
                      <td dangerouslySetInnerHTML={{ __html: this.props.workflow.remarks }} ></td>
                       {this.renderStatus()}
                      
                      <td width='150'>
                       
                      <Link to={`/mdm-workflow/edit/${this.props.workflow.id}`} className="badge badge-info">Edit</Link>
                      <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
                      </td>
                    
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateWorkflow({
      variables: {
        id: this.props.workflow.id,
      }
    })

    window.location.reload();
  }
}

const deleteWorkflow = gql`
  mutation deleteWorkflow($id: ID!) {
    deleteWorkflow(id: $id) {
      id
    }
  }
`

const SliderWithMutation = graphql(deleteWorkflow, {name : 'mutateWorkflow'})(ListSlider)

export default SliderWithMutation
