import React, {Component} from 'react';
import {connect} from 'react-redux';

import Header from './components/Header';
import Home from './components/Home';
import Accounts from './components/Accounts';

import { Container, Row, Col } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    };
  }
  render () {
    return (
      <Container>
        <Row>
          <Col>
            <Header/>
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
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(App);
