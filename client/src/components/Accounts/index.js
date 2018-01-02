import React, { Component } from 'react';
import {connect} from 'react-redux';
import {logout, getBalance, makeDeposit, withdrawDeposit} from '../../actions';

import {Row, Col, Card, CardText, CardBody,
  CardTitle, Button, InputGroupAddon,InputGroup, Input, Table } from 'reactstrap';

class Accounts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount:0
    }
  }
  componentDidMount() {
    this.props.getBalance();
  }
  handleInput = (e) => {
    const amount = e.target.value
    this.setState({
      amount: amount === '' ? 0 : amount
    })
  }

  deposit = (e) => {
    if (this.state.amount > 0 ) {
      this.props.makeDeposit(parseFloat(this.state.amount), 'D');
      this.props.getBalance();
      let inputs = document.getElementsByTagName('input');
      this.setState({amount:0})
      inputs[0].value = '';
    }
  }

  withdraw = (e) => {

    if (this.state.amount > 0) {
      this.props.withdrawDeposit(parseFloat(this.state.amount), 'W');
      this.props.getBalance();
      this.setState({amount:0});
      let inputs = document.getElementsByTagName('input');
      inputs[0].value = '';
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <h4>Accounts {this.props.firstName} {this.props.lastName}</h4>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <Card>
              <CardBody>
                  <InputGroup>
                    <InputGroupAddon>$</InputGroupAddon>
                    <Input onChange={this.handleInput} className="warningRed" placeholder="Amount" type="number" min="0" step="50" />
                  </InputGroup>
                <br/>
                <Button color="success" onClick={this.deposit}>Deposits</Button>{' '}
                <Button color="danger" onClick={this.withdraw}>Withdraw</Button>{' '}
                <Button color="info " onClick={this.props.logout}>LOGOUT</Button>
              </CardBody>
            </Card>
          </Col>
          <Col xs="6">
            <Card>
              <CardBody>
                <CardTitle>Summary</CardTitle>
                <hr/>
                <CardText>Checking balance ${this.props.totalBalance} </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <br/>
        <Row>
          <Table hover bordered>
            <thead>
            <tr>
              <th>Date</th>
              <th>TransactionID</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Available Balance</th>
            </tr>
            </thead>
            <tbody>
            {this.props.balanceHistory.map((item,ind) =>
              <tr key={ind}>
                <td>{item.date}</td>
                <td>{item.id}</td>
                <td className={item.desc === 'Deposit' ? 'green' : 'red'}>{item.desc}</td>
                <td className={item.desc === 'Deposit' ? 'green' : 'red'}>${item.amount}</td>
                <td>${item.balance}</td>
              </tr>
            )}
            </tbody>
          </Table>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    totalBalance: state.accounts.totalBalance,
    balanceHistory: state.accounts.accData.account.checking
  }
}

const mapDispatchToProps = {
  logout,
  getBalance,
  makeDeposit,
  withdrawDeposit
}

export default connect(mapStateToProps,mapDispatchToProps)(Accounts);
