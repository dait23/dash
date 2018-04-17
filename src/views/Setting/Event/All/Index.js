import React, { Component } from 'react';
import { inject, observer, Provider } from 'mobx-react';
import { Link} from 'react-router-dom';
import Spinner from 'react-spinkit';
import List from './List';
import eventsStore from '../Store/Store';





// our main component
const Type = inject('eventsStore')(
  observer(
    class extends Component {
   

      render() {
        const { error, loading, count, events } = this.props.eventsStore;
        //console.log(areas);

        if (error) console.error(error);
        else if (loading) return(
            
            <div><Spinner name="double-bounce" /></div>

          );
        else if (count === 0) console.warn('No Event Type :(');
        else console.log(events);

        return (

        
     <div className="animated fadeIn">
      <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-image"></i> All Event Type ({count})
                 <Link to={'/setting/event-type/new'} className="btn btn-success btn-sm pull-right"><i className="fa fa-plus"></i>&nbsp; Add New</Link>
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
                      
                       {events.map((event) => (
                          <List
                      key={event.id}
                      event={event}
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


const stores = { eventsStore };

const Event = () => (
  <Provider {...stores}>
    <Type />
  </Provider>
);

export default Event;