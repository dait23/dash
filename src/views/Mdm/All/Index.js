import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { inject, observer, Provider } from 'mobx-react';
import Spinner from 'react-spinkit';
import List from './List';
import mdmStore from '../Store/Store';





// our main component
const Teams = inject('mdmStore')(
  observer(
    class extends Component {
      //sayHello = () => this.props.postsStore.createPost('Hello World Again Mobx!');

      render() {
        const { error, loading, count, teams } = this.props.mdmStore;

        if (error) console.error(error);
        else if (loading) return(
            
            <div><Spinner name="double-bounce" /></div>

          );
        else if (count === 0) console.warn('No Teams :(');
        else console.log(teams);

        return (

        
     <div className="animated fadeIn">
      <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-image"></i> Mdm Teams
                 <Link to={'/mdm/new'} className="btn btn-success btn-sm pull-right"><i className="fa fa-plus"></i>&nbsp; Add New</Link>
              </div>
              <div className="card-block">
                <table className="table table-bordered table-striped table-sm">
                  <thead>
                    <tr>
                       <th>Name</th>
                      <th>Email</th>
                      <th>Photo</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                      
                       {teams.map((team) => (
                          <List
                      key={team.id}
                      team={team}
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


const stores = { mdmStore };

const MdmTeam = () => (
  <Provider {...stores}>
    <Teams />
  </Provider>
);

export default MdmTeam;