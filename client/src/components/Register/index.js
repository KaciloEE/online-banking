import React, { Component } from 'react';
import {connect} from 'react-redux';

import Header from '../Header'
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import {registerUser} from '../../actions'

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lastName: '',
      firstName: '',
      email: '',
      password: ''
    }
  }
  handleRegister = () => {
    const payload = {
      lastName: this.state.lastName,
      firstName: this.state.firstName,
      email: this.state.email,
      password: this.state.password
    }
    this.props.registerUser(payload)
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Header/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              <FormGroup row>
                <Label for="firstName" sm={2}>firstName</Label>
                <Col sm={10}>
                  <Input type="text" onChange={(e) => this.setState({firstName: e.target.value})} name="firstName" id="firstName" placeholder="with a placeholder" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="lastName" sm={2}>lastName</Label>
                <Col sm={10}>
                  <Input type="text" onChange={(e) => this.setState({lastName: e.target.value})} name="lasName" id="lastName" placeholder="with a placeholder" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>Email</Label>
                <Col sm={10}>
                  <Input type="email" onChange={(e) => this.setState({email: e.target.value})} name="email" id="exampleEmail" placeholder="with a placeholder" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="examplePassword" sm={2}>Password</Label>
                <Col sm={10}>
                  <Input type="password" onChange={(e) => this.setState({password: e.target.value})} name="password" id="examplePassword" placeholder="password placeholder" />
                </Col>
              </FormGroup>
              <FormGroup check row>
                <Col sm={{ size: 10, offset: 2 }}>
                  <Button color="success" onClick={this.handleRegister}>Submit</Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  registerUser
}

export default connect(null, mapDispatchToProps)(Register);
