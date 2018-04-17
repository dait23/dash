import { Link} from 'react-router-dom';
//import { createBrowserHistory } from 'history';
import { ToastContainer } from 'react-toastify';
import eventsStore from '../Store/Store';
import React, { Component } from 'react';
import { inject, observer, Provider } from 'mobx-react';
import {MainApi} from '../../../../views/Api/';;

//const history = createBrowserHistory();

//const path = window.location.pathname;
var pathArray = window.location.pathname.split( '/' );
var secondLevelLocation = pathArray[4];


// our main component
const Event = inject('eventsStore')(
  observer(
    class extends Component {


    
    constructor(props) {
        super(props)
        this.state = {
        id:'', 
        name:'',
        slug:''
        }
        
      }
   ////

  componentDidMount() {
    var that = this;
    that.getData();
      
  }

 
  getData(){
     var that = this;
     that.setState({
          loading: true
      });
     var fetch = require('graphql-fetch')(MainApi)

          var query = `
            query Event($id: ID!) {
              EventType(id: $id){
              id
              name
              slug
            }
            }
          `
          var queryVars = {
            id: secondLevelLocation
          }
          var opts = {
            // custom fetch options
          }


          fetch(query, queryVars, opts).then(function (results) {
            if (results.errors) {
              //...
              return
            }
            //var BlogCategory = results.data.BlogCategory

            that.setState({
              data : results.data.EventType,
              id:results.data.EventType.id,
              name:results.data.EventType.name,
              slug:results.data.EventType.slug,
              loading:false
             });
            //...
          })

  }


   updatePost = () => this.props.eventsStore.updateEvent(
    this.state.id, 
    this.state.name, 
    this.state.slug
    );


 //////////////////////

      render() {
      var slugg = this.state.name;
      var slugx = slugg.replace(/\s+/g,"-");
      var sluger = slugx.toLowerCase();

        //const {single, xxx} = this.props.collabsStore;

       // const { error, loading, count, areas, categories, visitors, facilities } = this.props.partnerStore;
        //console.log(this.props.collabsStore);

        // if (error) console.error(error);
        // else if (loading) return(
            
        //     <div><Spinner name="double-bounce" /></div>

        //   );
        // else if (count === 0) console.warn('No Partner :(');
        // else console.log('xx');

        return (

        
     <div className="animated fadeIn">
         <ToastContainer autoClose={1000} />
            <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <strong>Edit</strong>
              </div>
              <div className="card-block">
                <form  className="form-horizontal">
                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.name} name="name" className="form-control" placeholder="Name"
                      onChange={(e) => this.setState({name: e.target.value})}
                      onKeyUp={(e) => this.setState({slug: document.getElementById("slug").value})}
                      />
                    </div>
                  </div>
                 
                 
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Slug</label>
                    <div className="col-md-9">
                      <input disabled type="text" id="slug" value={sluger} name="slug" className="form-control" placeholder="Slug"
                      />
                     
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.updatePost}><i className="fa fa-dot-circle-o"></i> Save</button>
                
                <Link to={'/setting/event-type/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
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

const EditEvent = () => (
  <Provider {...stores}>
    <Event />
  </Provider>
);


export default EditEvent;
