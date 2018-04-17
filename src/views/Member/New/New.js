import { Link} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import memberStore from '../Store/Store';
import React, { Component } from 'react';
import { inject, observer, Provider } from 'mobx-react';



// our main component
const Member = inject('memberStore')(
  observer(
    class extends Component {

    
      constructor(props) {
        super(props)
        this.state = { 
        firstName:'',
      lastName:'',
      password: '',
      name: '',
      jabatan:'Member',
      email: '',
        }
        
        
      }
   ////


   handlePost = () => this.props.memberStore.createMember(
    this.state.email, 
    this.state.password, 
    this.state.jabatan, 
    this.state.firstName, 
    this.state.lastName
    );


 //////////////////////

      render() {
    
   

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
                 <form className="form-horizontal">
                  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">First Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.firstName} name="firstName" className="form-control" placeholder="First Name"
                       onChange={(e) => this.setState({firstName: e.target.value})}
                      />
                    </div>
                  </div>

                   <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Last Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.LastName} name="lastName" className="form-control" placeholder="Last Name"
                       onChange={(e) => this.setState({lastName: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Email</label>
                    <div className="col-md-9">
                      <input type="email" id="text-input" value={this.state.email} name="email" className="form-control" placeholder="Email"
                       onChange={(e) => this.setState({email: e.target.value})}
                      />
                    </div>
                  </div>
                 <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Password</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.password} name="password" className="form-control" placeholder="Password"
                       onChange={(e) => this.setState({password: e.target.value})}
                      />
                    </div>
                  </div>

                  
                </form>
              </div>
              <div className="card-footer">

                <button type="submit" className="btn btn-sm btn-primary" onClick={this.handlePost}><i className="fa fa-dot-circle-o"></i> Save</button>
                
                <Link to={'/member/all'} className="btn btn-sm btn-danger"><i className="fa fa-ban"></i>&nbsp; Cancel</Link>
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

const NewMember = () => (
  <Provider {...stores}>
    <Member />
  </Provider>
);


export default NewMember;
