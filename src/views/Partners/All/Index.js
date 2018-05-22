import React, { Component } from 'react';
import { inject, observer, Provider } from 'mobx-react';
import { Link} from 'react-router-dom';
import Spinner from 'react-spinkit';
import List from './List';
import partnerStore from '../Store/Store';





// our main component
const Partner = inject('partnerStore')(
  observer(
    class extends Component {
      //sayHello = () => this.props.postsStore.createPost('Hello World Again Mobx!');

      render() {
        const { error, loading, count, partners } = this.props.partnerStore;
        //console.log(areas);

        if (error) console.error(error);
        else if (loading) return(
            
            <div><Spinner name="double-bounce" /></div>

          );
        else if (count === 0) console.warn('No Partner :(');
       // else if  (console.log(areas);)
        else console.log(partners);

        return (

        
     <div className="animated fadeIn">
      <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-image"></i> All Partners ({count})
                 <Link to={'/partners/new'} className="btn btn-success btn-sm pull-right"><i className="fa fa-plus"></i>&nbsp; Add New</Link>
              </div>
              <div className="card-block">
                <table className="table table-bordered table-striped table-sm">
                  <thead>
                    <tr>
                    <th width='80'>Thumb</th>
                      <th width='200'>Name Partner</th>
                      <th width='100'>Category</th>
                      <th width='100'>Area</th>
                      <th align="center" width='50'>Status</th>
                      <th>Spaces</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                      
                       {partners.map((partner) => (
                          <List
                      key={partner.id}
                      partner={partner}
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
  )
);


const stores = { partnerStore };

const Partners = () => (
  <Provider {...stores}>
    <Partner />
  </Provider>
);

export default Partners;