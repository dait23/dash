

import React, { Component } from 'react';
import {
  Col,
  FormGroup,
  Label,
  Input
} from "reactstrap";

 class Step2 extends Component {
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
      <div className="step step2">
          <form id="Form" className="form-horizontal">
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup row>
                    <Col md="3">
                      <Label>Tipe Event</Label></Col>
                    <Col md="9">
                      <FormGroup check className="form-check-inline">
                        <Label check htmlFor="inline-checkbox1">
                          <Input type="checkbox" id="inline-checkbox1" name="inline-checkbox1" value="option1"/> Bazaar
                        </Label>
                        <Label check htmlFor="inline-checkbox2">
                          <Input type="checkbox" id="inline-checkbox2" name="inline-checkbox2" value="option2"/> Pop Up
                        </Label>
                        <Label check htmlFor="inline-checkbox3">
                          <Input type="checkbox" id="inline-checkbox3" name="inline-checkbox3" value="option3"/> Event
                        </Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                   <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Min Budget</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="text-input" placeholder="min budget"/>
                    
                    </Col>
                  </FormGroup>
                   <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Luas Space yg diinginkan</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="text-input" placeholder="min space"/>
                    
                    </Col>
                  </FormGroup>
                   <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Harga Produk</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="text-input" placeholder="price"/>
                    
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="textarea-input">Remarks</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" name="textarea-input" id="textarea-input" rows="9"
                             placeholder="Content..."/>
                    </Col>
                  </FormGroup>
                 
                  </div>
                  <div className="col-md-6">
                   <FormGroup row>
                    <Col md="3">
                      <Label>Jenis Kerjasama</Label></Col>
                    <Col md="9">
                      <FormGroup check className="form-check-inline">
                        <Label check htmlFor="inline-checkbox1">
                          <Input type="checkbox" id="inline-checkbox1" name="inline-checkbox1" value="option1"/> Rental
                        </Label>
                        <Label check htmlFor="inline-checkbox2">
                          <Input type="checkbox" id="inline-checkbox2" name="inline-checkbox2" value="option2"/> Profit Sharing
                        </Label>
                        <Label check htmlFor="inline-checkbox3">
                          <Input type="checkbox" id="inline-checkbox3" name="inline-checkbox3" value="option3"/> Consigment
                        </Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Max Budget</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="text-input" placeholder="max budget"/>
                    
                    </Col>
                  </FormGroup>
        
                   <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Area / Region</Label>
                    </Col>
                    <Col xs="12" md="9">
                     <select
                        ref="area"
                        autoComplete="off"
                        className="form-control"
                        required
                        defaultValue={this.state.area}
                        onBlur={this.validationCheck}>
                          <option value="">Please select</option>
                          <option value="Male">Jakarta Timur</option>
                          <option value="Female">Jakarta Barat</option>
                          <option value="Other">Jakarta Utara</option>
                      </select>
                    
                    </Col>
                  </FormGroup>
                  </div>
                </div>


         </form>
      
      </div>
    )
  }
}

export default Step2;