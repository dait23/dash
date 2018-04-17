
import React, { Component } from 'react';


export default class Step1 extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    
  }
 
  

  componentDidMount() {}

  componentWillUnmount() {}

  // not required as this component has no forms or user entry
  // isValidated() {}

  render() {
    return (
      <div className="step step1">
          <form id="Form" className="form-horizontal">
              <div className="row">
                 <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Merchant Name</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.name} name="name" className="form-control" placeholder="merchant name"
                      onChange={(e) => this.setState({name: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Merchant ID</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.name} name="name" className="form-control" placeholder="merchant ID"
                      onChange={(e) => this.setState({name: e.target.value})}
                      />
                    </div>
                  </div>


  
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Address</label>
                    <div className="col-md-9">
                    
                     <textarea className="form-control" rows="5"></textarea>
                    </div>
                  </div>


                 </div>
                  <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Pic Name/Owner</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.name} name="name" className="form-control" placeholder="Pic name /owner"
                      onChange={(e) => this.setState({name: e.target.value})}
                      />
                    </div>
                  </div>


                  <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Posisi Pic</label>
                    <div className="col-md-9">
                      <select
                        ref="posisi"
                        autoComplete="off"
                        className="form-control"
                        required
                        defaultValue={this.state.posisi}
                        onBlur={this.validationCheck}>
                          <option value="">Please select</option>
                          <option value="Male">Owner</option>
                          <option value="Female">Direktur</option>
                          <option value="Other">Marketing</option>
                      </select>
                    </div>
                  </div>
                    <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Pic Phone</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.name} name="name" className="form-control" placeholder="Pic phone"
                      onChange={(e) => this.setState({name: e.target.value})}
                      />
                    </div>
                  </div>
                    <div className="form-group row">
                    <label className="col-md-3 form-control-label" htmlFor="text-input">Pic Email</label>
                    <div className="col-md-9">
                      <input type="text" id="text-input" value={this.state.name} name="name" className="form-control" placeholder="merchant email"
                      onChange={(e) => this.setState({name: e.target.value})}
                      />
                    </div>
                  </div>

                 </div>
              </div>
               

         </form>
      
      </div>
    )
  }
}
