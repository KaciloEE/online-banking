import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Jumbotron, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Col } from 'reactstrap';
import {Link} from 'react-router';
import {loginUser} from '../../actions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: 'static',
      email: '',
      password: ''
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleLogin = (e) => {
    const data = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(data)

    this.setState({
      modal: !this.state.modal
    })
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
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleLogin}>Do Something</Button>{' '}
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
