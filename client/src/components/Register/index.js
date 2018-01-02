import React, { Component } from 'react';
import {connect} from 'react-redux';
import {UncontrolledAlert, Alert, Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import Header from '../Header'
import {registerUser} from '../../actions'

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lastName: '',
      firstName: '',
      email: '',
      password: '',
      visible: false,
      errorText: ''
    }
  }
  handleSubmit = () => {
    if (this.state.lastName === '' || this.state.firstName === '' || this.state.email === '' || this.state.password === '') {
      this.setState({
        visible: true,
        errorText: 'Make sure you fill all the fields!'
      })
      return null
    }

    if (!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      this.setState({
        visible: true,
        errorText: 'No valid email!'
      })
      return null
    }

    const payload = {
      lastName: this.state.lastName,
      firstName: this.state.firstName,
      email: this.state.email,
      password: this.state.password
    }
    this.props.registerUser(payload)
  }

  onDismiss = () => {
    this.setState({ visible: false });
  }

  render() {
    const { alert } = this.props;
    return (
      <Container>
        <Row>
          <Col>
            <Header/>
          </Col>
        </Row>
        <Row>
          <Col>
            {alert.message ? <UncontrolledAlert color={alert.type}>{alert.message}</UncontrolledAlert>: '' }
            <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
              {this.state.errorText}
            </Alert>
            <Form>
              <FormGroup row>
                <Label for="firstName" sm={2}>First Name</Label>
                <Col sm={10}>
                  <Input type="text" onChange={(e) => this.setState({firstName: e.target.value})} name="firstName" id="firstName" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="lastName" sm={2}>Last Name</Label>
                <Col sm={10}>
                  <Input type="text" onChange={(e) => this.setState({lastName: e.target.value})} name="lasName" id="lastName" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>Email</Label>
                <Col sm={10}>
                  <Input type="email" onChange={(e) => this.setState({email: e.target.value})} name="email" id="exampleEmail" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="examplePassword" sm={2}>Password</Label>
                <Col sm={10}>
                  <Input type="password" onChange={(e) => this.setState({password: e.target.value})} name="password" id="examplePassword" />
                </Col>
              </FormGroup>
              <FormGroup check row>
                <Col sm={{ size: 10, offset: 2 }}>
                  <Button color="success" onClick={this.handleSubmit}>Submit</Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  const {alert} = state;
  return {
    alert
  }
}

const mapDispatchToProps = {
  registerUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
