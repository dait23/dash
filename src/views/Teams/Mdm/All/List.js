import React from 'react';
import { Link} from 'react-router-dom';


import PropTypes from 'prop-types';
import {Cloudinary_Name, No_Avatar} from '../../../../views/Api/';
import {Image} from 'cloudinary-react';

class List extends React.Component {

  static propTypes = {
    team: PropTypes.object,
  }


  
  renderAvatar(){

    if (this.props.team.imageId === ""){

        return(

              <img src={No_Avatar}  alt="avatar"/>
          )
                        
      }
      else{

        return(

             <Image cloudName={Cloudinary_Name} publicId={this.props.team.imageId} width="80" crop="scale"/>

          )
      }                 
                      
  }

  render () {

    return (
     
                    <tr>
                      <td>{this.props.team.firstName} &nbsp;{this.props.team.lastName}</td>
                       <td width='80' style={{textAlign:'center'}}> {this.renderAvatar()}</td>
                      <td style={{textAlign:'center', fontWeight:'bold'}}>{this.props.team.user.fu1.count}</td>
                      <td style={{textAlign:'center', fontWeight:'bold'}}>{this.props.team.user.fu2.count}</td>
                      <td style={{textAlign:'center', fontWeight:'bold'}}>{this.props.team.user.fu3.count}</td>

                     
                      <td width='150' style={{textAlign:'center'}}>
                         <Link to={`/mdm-team/performance/${this.props.team.user.id}`} className="badge badge-info">View Performance</Link>
  
                      </td>
                    </tr>
    )
  }

}

export default List;
