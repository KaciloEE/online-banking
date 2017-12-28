import React, { Component } from 'react';
import {connect} from 'react-redux';
import {logout, getBalance, makeDeposit} from '../../actions';

import {Row, Col, Card, CardText, CardBody,
  CardTitle, Button, InputGroupAddon,InputGroup, Input, Table } from 'reactstrap';

class Accounts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount:0
    }
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
      //this.props.getBalance();
      let inputs = document.getElementsByTagName('input');
      this.setState({amount:0})
      inputs[0].value = '';
    }
  }

  withdraw(e){
    e.preventDefault();
    //Checking if user input is greater than available balance, if its greater
    //it will show "Not enough balance"
    let currentBalance = document.getElementsByClassName('miniOverviewBalance')[0].innerText;
    if(parseFloat(currentBalance) <= 0 || parseFloat(this.state.amount) > parseFloat(currentBalance)){
      let el = document.getElementsByClassName('warningRed');
      el[0].innerText = 'Not enough balance'
      el[0].style.opacity = 1;
      return;
    }
    //If amount is valid and withdrawing less than available balance
    if(!isNaN(this.state.amount)  && this.state.amount > 0){
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
          <h4>Accounts {this.props.userName} {this.state.amount}</h4>
        </Row>
        <Row>
          <Col xs="6">
            <Card>
              <CardBody>
                  <InputGroup>
                    <InputGroupAddon>$</InputGroupAddon>
                    <Input onChange={this.handleInput} className="warningRed" placeholder="Amount" type="number" min="0" step="1" />
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
              <th>Available</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            </tbody>
          </Table>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userName: state.auth.userName,
    totalBalance: state.accounts.totalBalance
  }
}

const mapDispatchToProps = {
  logout,
  getBalance,
  makeDeposit
}

export default connect(mapStateToProps,mapDispatchToProps)(Accounts);
