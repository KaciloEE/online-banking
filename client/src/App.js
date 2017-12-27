import React, {Component} from 'react';
import Header from './components/Header';
import Home from './components/Home'
import Accounts from './components/Accounts'

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
            {this.state.isActive ? <Accounts/> : <Home/> }
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App;
