import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Alert, Form, Jumbotron, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Col } from 'reactstrap';
import {Link} from 'react-router';
import {loginUser} from '../../actions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: 'static',
      email: '',
      password: '',
      visible: false,
      errorText: ''
    };
  }

  onDismiss = () => {
    this.setState({ visible: false });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleSubmit = (e) => {
    const email = this.state.email
    const password = this.state.password

    if (email === '' || password === '') {
      this.setState({
        visible: true,
        errorText: 'Make sure you fill all the fields!'
      })
      return null
    }

    if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      this.setState({
        visible: true,
        errorText: 'No valid email!'
      })
      return null
    }

    this.props.loginUser({
      email,
      password
    })
    this.toggle()
  }

  handleEmail = (e) => {
    this.setState({
      email: e.target.value
    })
  }
  handlePassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  render () {
    return (
      <div>
          <Jumbotron>
            <h1 className="display-4">Your live online bank!</h1>
            <hr className="my-2"/>
            <p>Control the movement of funds in a bank account.</p>
            <p>Instantly. All mobile operators in Ukraine.</p>
            <p>Open saving accounts with great % rates remotely and manage it.</p>
            <p className="lead">
              <Button color="success" onClick={this.toggle}>Login</Button>{'      '}
              <Link to="/register" className="btn btn-info">Register</Link>
            </p>
          </Jumbotron>

        <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={this.state.backdrop}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
              {this.state.errorText}
            </Alert>
            <Form>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>Email</Label>
              <Col sm={10}>
                <Input type="email" onChange={this.handleEmail} name="email" id="exampleEmail" placeholder="with a placeholder" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="examplePassword" sm={2}>Password</Label>
              <Col sm={10}>
                <Input type="password" onChange={this.handlePassword} name="password" id="examplePassword" placeholder="password placeholder" />
              </Col>
            </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    statusText: state.auth.statusText
  }
}

export default connect(mapStateToProps, {loginUser})(Home);
