import { Link} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import collabsStore from '../Store/Store';
import React, { Component } from 'react';
import { inject, observer, Provider } from 'mobx-react';



// our main component
const Collab = inject('collabsStore')(
  observer(
    class extends Component {

    
      constructor(props) {
        super(props)
        this.state = { 
        name:'',
        slug:''
        }
        
        
      }
   ////


   handlePost = () => this.props.collabsStore.createCollab(
    this.state.name, 
    this.state.slug
    );


 //////////////////////

      render() {
      var slugg = this.state.name;
      var slugx = slugg.replace(/\s+/g,"-");
      var sluger = slugx.toLowerCase();

       // const { error, loading, count, areas, categories, visitors, facilities } = this.props.partnerStore;
        //console.log(areas);

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
                <strong>Add </strong> New 
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
                    <label className="col-md-3 form-control-label" htmlFor="text-input"></label>
                    <div className="col-md-9">
                      <input type="hidden" id="slug" value={sluger} name="slug" className="form-control" placeholder="Slug"
                      />
                     
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.handlePost}><i className="fa fa-dot-circle-o"></i> Save</button>
                
                <Link to={'/setting/collabs/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
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

const NewCollabs = () => (
  <Provider {...stores}>
    <Collab />
  </Provider>
);


export default NewCollabs;
