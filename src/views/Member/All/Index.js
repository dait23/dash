import React, { Component } from 'react';
import { inject, observer, Provider } from 'mobx-react';
import { Link} from 'react-router-dom';
import Spinner from 'react-spinkit';
import List from './List';
import memberStore from '../Store/Store';





// our main component
const Member = inject('memberStore')(
  observer(
    class extends Component {
      //sayHello = () => this.props.postsStore.createPost('Hello World Again Mobx!');

      render() {
        const { error, loading, count, members } = this.props.memberStore;

        if (error) console.error(error);
        else if (loading) return(
            
            <div><Spinner name="double-bounce" /></div>

          );
        else if (count === 0) console.warn('No members :(');
        else console.log(members);

        return (

        
     <div className="animated fadeIn">
      <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-image"></i> All Members
                 <Link to={'/member/new'} className="btn btn-success btn-sm pull-right"><i className="fa fa-plus"></i>&nbsp; Add New</Link>
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
                      
                       {members.map((member) => (
                          <List
                      key={member.id}
                      member={member}
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


const stores = { memberStore };

const Members = () => (
  <Provider {...stores}>
    <Member />
  </Provider>
);

export default Members;