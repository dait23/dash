import React, {Component} from "react";
import {Container, Row, Col, CardGroup, Card, CardBlock, Button, Input, InputGroup, InputGroupAddon} from "reactstrap";
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

//const Background = 'http://res.cloudinary.com/spazeeid/image/upload/v1517912118/26868374_1580579998663511_16247732431749120_n_lfh0ql.jpg';
class Login extends Component {

  state = {
    email: '',
    password: '',
  }


  render() {

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup className="mb-0">
                <Card className="p-4">
                  <CardBlock className="card-body">
                    <img src={'https://res.cloudinary.com/spazeeid/image/upload/c_scale,w_200/lhukm16yizg5dl58e2vi'} alt="login"/><br />
                     <p className="text-muted"></p>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Username"
                        value={this.state.email}
                        onChange={(e) => this.setState({email: e.target.value})}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={(e) => this.setState({password: e.target.value})}
                      />
                    </InputGroup>
                    <Row>
                      <Col xs="6" className="pull-left">
                        {this.state.email && this.state.password &&
                        <Button color="primary" className="px-4"  onClick={this.authenticateUser} style={{marginLeft:-15}}>Login</Button>
                        }
                      </Col>
                      <Col xs="6" className="text-right">

                      </Col>
                    </Row>
                  </CardBlock>
                </Card>
                <Card className="text-white  py-3 d-md-down-none loginImg">
                  <CardBlock className="card-body">
                    <div>

                    </div>
                  </CardBlock>
                </Card>
              </CardGroup>
               <p className="text-muted text-lowercase" style={{fontSize: 10}}>&copy; 2018 - spazee.id</p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
  authenticateUser = async () => {
    const {email, password} = this.state

    const response = await this.props.authenticateUserMutation({variables: {email, password}})
    localStorage.setItem('spaceToken', response.data.authenticateUser.token)
    this.props.history.replace('/')
    window.location.reload();
    
  }


}

const AUTHENTICATE_USER_MUTATION = gql`
  mutation AuthenticateUserMutation ($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      token
    }
  }
`

const LOGGED_IN_USER_QUERY = gql`
  query LoggedInUserQuery {
    loggedInUser {
      id
      name
      status
      jabatan
    }
  }
`
export default compose(
  graphql(AUTHENTICATE_USER_MUTATION, {name: 'authenticateUserMutation'}),
  graphql(LOGGED_IN_USER_QUERY, {
    name: 'loggedInUserQuery',
    options: { fetchPolicy: 'network-only' }
  })
)(withRouter(Login))
