import React, { Component } from 'react';
import { inject, observer, Provider } from 'mobx-react';
import { Link} from 'react-router-dom';
import Spinner from 'react-spinkit';
import List from './List';
import collabsStore from '../Store/Store';





// our main component
const Collab = inject('collabsStore')(
  observer(
    class extends Component {
   

      render() {
        const { error, loading, count, collabs } = this.props.collabsStore;
        //console.log(areas);

        if (error) console.error(error);
        else if (loading) return(
            
            <div><Spinner name="double-bounce" /></div>

          );
        else if (count === 0) console.warn('No Collabs :(');
        else console.log(collabs);

        return (

        
     <div className="animated fadeIn">
      <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-image"></i> All Collabs ({count})
                 <Link to={'/setting/collabs/new'} className="btn btn-success btn-sm pull-right"><i className="fa fa-plus"></i>&nbsp; Add New</Link>
              </div>
              <div className="card-block">
                <table className="table table-bordered table-striped table-sm">
                  <thead>
                    <tr>
                       <th>Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                      
                       {collabs.map((collab) => (
                          <List
                      key={collab.id}
                      collab={collab}
                      {...this.props}
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


const stores = { collabsStore };

const Collabs = () => (
  <Provider {...stores}>
    <Collab />
  </Provider>
);

export default Collabs;