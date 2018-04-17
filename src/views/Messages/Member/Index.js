import React from 'react';
import { Link} from 'react-router-dom';
import ListSlider from './List';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';

class Messages extends React.Component {

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
      
      <Link to={'/messages/new'} className="btn btn-success btn-sm pull-right"><i className="fa fa-plus"></i>&nbsp; Add New</Link>
    )
  }
}

renderMdm(){

  if(window.localStorage.getItem('urole') === 'Member'){

   return(


            <thead>
                    <tr>
                      <th>From</th>
                      <th>Message</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>

   )

  }else{

    return(
    

            <thead>
                    <tr>
                      <th>From</th>
                      <th>Message</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>


    )

  }

}

  render () {
    if (this.props.data.loading) {
      return (<div><Spinner name="double-bounce" /></div>)
    }

    if (this.props.data.allMessages && this.props.data.allMessages.error) {
    return <div>Error</div>
   }



    return (
    <div className="animated fadeIn">
      <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-image"></i> All Brand
               {this.renderAddNew()}
              </div>
              <div className="card-block">
                <table className="table table-bordered table-striped table-sm">
                  {this.renderMdm()}
                  <tbody>
           {this.props.data.allMessages.map((message) => (
            <ListSlider
              key={message.id}
              message={message}
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
const FeedQuery = gql`query allBrands($id: ID!) {
   allMessages(orderBy: updatedAt_DESC, filter:{
    user:{
      id: $id
    }
  }){
    id
    content
    createdAt
    updatedAt
    partner{
      id
      name
    }
    user{
      id
      name
    }
  }
   
}`
const ListPageWithData = graphql(FeedQuery, {
  options: { variables: { id: Uid } }
})(Messages)

export default ListPageWithData