import React from 'react';
import { Link} from 'react-router-dom';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';

//cloudinaryConfig({ cloud_name: Cloudinary_Name });

class ListSlider extends React.Component {

  static propTypes = {
    invoice: PropTypes.object,
    mutatePost: PropTypes.func,
    refresh: PropTypes.func,
  }



  renderAction(){

    if(window.localStorage.getItem('urole') === 'Member'){
 
   return(
    <td width='150'>

       <Link to={`/invoice/view/${this.props.invoice.id}`} className="badge badge-info">View Invoice</Link>
     </td>
    )

    }
    else{
      return(
       <td width='150'>
            <Link to={`/invoice/edit/${this.props.invoice.id}`} className="badge badge-info">Edit</Link>
            <span className="badge badge-danger" onClick={this.handleDelete} style={{cursor: 'pointer'}}>Delete</span>
        </td>
    )
    }
  }

  render () {

  	
    return (
     
                    <tr>
                    <td>{this.props.invoice.invoiceId}</td>
                      <td>{this.props.invoice.title}</td>
                      <td dangerouslySetInnerHTML={{ __html: this.props.invoice.description }} ></td>
                      <td>{this.props.invoice.quantity}</td>
                      <td>{this.props.invoice.price}</td>
                      <td>{this.props.invoice.total}</td>
                      {this.renderAction()}
                     
                    </tr>
    )
  }

  handleDelete = async () => {
    await this.props.mutateBanner({
      variables: {
        idSlider: this.props.invoice.id,
      }
    })

    window.location.reload();
  }
}

const deleteBanner = gql`
  mutation deleteBanner($idSlider: ID!) {
    deleteInvoice(id: $idSlider) {
      id
    }
  }
`

const SliderWithMutation = graphql(deleteBanner, {name : 'mutateBanner'})(ListSlider)

export default SliderWithMutation
