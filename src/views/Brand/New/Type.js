import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Type extends Component {

  static propTypes = {
    type: PropTypes.object,
    refresh: PropTypes.func,
  }

  render () {

  	//var xxx = '/slider/edit/'+this.props.slider.id;
    return (
     
                <option value={this.props.type.id}>{this.props.type.name}</option>    
    )
  }

}
export default Type;
