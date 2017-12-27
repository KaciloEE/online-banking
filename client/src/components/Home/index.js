import React, {Component} from 'react';
import { Jumbotron, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Col } from 'reactstrap';
import {Link} from 'react-router';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: 'static',
      email: '',
      password: ''
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  handleClick = (e) => {
    this.setState({
      modal: !this.state.modal
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
            <p>{this.state.email}</p>
            <p>{this.state.password}</p>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>Email</Label>
              <Col sm={10}>
                <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="examplePassword" sm={2}>Password</Label>
              <Col sm={10}>
                <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
              </Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleClick}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
};

export default Home;
