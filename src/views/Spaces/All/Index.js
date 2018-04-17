import React, { Component } from 'react';
import { inject, observer, Provider } from 'mobx-react';
import { Link} from 'react-router-dom';
import Spinner from 'react-spinkit';
import List from './List';
import spaceStore from '../Store/Store';





// our main component
const Space = inject('spaceStore')(
  observer(
    class extends Component {
      //sayHello = () => this.props.postsStore.createPost('Hello World Again Mobx!');

      render() {
        const { error, loading, count, spaces } = this.props.spaceStore;
        //console.log(areas);

        if (error) console.error(error);
        else if (loading) return(
            
            <div><Spinner name="double-bounce" /></div>

          );
        return (

        
     <div className="animated fadeIn">
      <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-image"></i> All Spaces ({count})
                 <Link to={'/spaces/new'} className="btn btn-success btn-sm pull-right"><i className="fa fa-plus"></i>&nbsp; Add New</Link>
              </div>
              <div className="card-block">
                <table className="table table-bordered table-striped table-sm">
                  <thead>
                    <tr>
                       <th>Name Space</th>
                      <th>Name Partner</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                      
                       {spaces.map((space) => (
                          <List
                      key={space.id}
                      space={space}
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


const stores = { spaceStore };

const Spaces = () => (
  <Provider {...stores}>
    <Space />
  </Provider>
);

export default Spaces;