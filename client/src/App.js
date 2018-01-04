import React, {Component} from 'react';
import {connect} from 'react-redux';

import Header from './components/Header';
import Home from './containers/Home';
import Accounts from './containers/Accounts';

import {UncontrolledAlert, Container, Row, Col } from 'reactstrap';

class App extends Component {
  render () {
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
          </Col>
        </Row>
        <Row>
          <Col>
            {this.props.isAuthenticated ? <Accounts/> : <Home/> }
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
    alert
  }
}

export default connect(mapStateToProps)(App);
