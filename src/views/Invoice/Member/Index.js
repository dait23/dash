import React from 'react';
import { Link} from 'react-router-dom';
import ListSlider from './List';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';

class Invoice extends React.Component {

  static propTypes = {
    data: PropTypes.object,
    refresh: PropTypes.func,
  }
  
  //  constructor(props) {
  //   super(props);
  //   //this.forceUpdate();
  //   //this.handleChange = this.handleChange.bind(this)
  // }

  componentDidMount() {
       this.forceUpdate();
  }

renderAddNew(){

  if(window.localStorage.getItem('urole') === 'Member'){
   
   return(
      
      <div></div>
    )
  }
  else{

    return(
      
      <Link to={'/invoice/new'} className="btn btn-success btn-sm pull-right"><i className="fa fa-plus"></i>&nbsp; Add New</Link>
    )
  }
}


  render () {
    if (this.props.data.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }

    if (this.props.data.allInvoices && this.props.data.allInvoices.error) {
    return <div>Error</div>
   }

    return (
    <div className="animated fadeIn">
      <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-image"></i> All Invoices
               {this.renderAddNew()}
              </div>
              <div className="card-block">
                <table className="table table-bordered table-striped table-sm">
                  <thead>
                    <tr>
                      <th>Invoice ID</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
           {this.props.data.allInvoices.map((invoice) => (
            <ListSlider
              key={invoice.id}
              invoice={invoice}
              refresh={() => this.props.data.refetch()}
            />
          ))}
           </tbody>
          </table>
        </div>
       </div>
         </div>
        </div>
      </div>

    )
  }
}

const Uid = localStorage.getItem('uid');
const FeedQuery = gql`query allBrands {
   allInvoices (orderBy: createdAt_DESC, filter:{
    user:{
      id: "cjfasyvpclvfh0192tphvwiyt"
    }
  }) {
    id
    title
    description
    quantity
    price
    total
    user{
      id
      mdm{
        firstName
      }
    }
  }
}`

const ListPageWithData = graphql(FeedQuery, {
  options: { variables: { id: Uid } }
})(Invoice)


export default ListPageWithData