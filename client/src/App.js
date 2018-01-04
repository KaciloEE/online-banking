import React, {Component} from 'react';
import {connect} from 'react-redux';

import Header from './components/Header';
import Home from './containers/Home';
import Accounts from './containers/Accounts';
import Manager from './containers/Manager';

import {UncontrolledAlert, Container, Row, Col } from 'reactstrap';

class App extends Component {
  render () {
    const { isAuthenticated, alert, role } = this.props;
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
          </Col>
        </Row>
        <Row>
          <Col>
            {!isAuthenticated ? <Home/>: role === 'admin' ? <Manager/> : <Accounts/> }
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const {alert} = state;
  return {
    isAuthenticated: state.auth.isAuthenticated,
    role: state.auth.role,
    alert
  }
}

export default connect(mapStateToProps)(App);
