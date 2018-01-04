import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Row, Col, Card, CardText, CardBody,
  CardTitle, Button, InputGroupAddon,InputGroup, Input, Table, Form, FormGroup } from 'reactstrap';

import {logout, transaction,  getUsers, getAccounts} from '../../actions/index';


class Manager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount:0
    }
  }
  componentDidMount() {
    this.props.getUsers();
  }
  handleInput = (e) => {
    const amount = e.target.value
    this.setState({
      amount: amount === '' ? 0 : amount
    })
  }

  deposit = (e) => {
    if (this.state.amount > 0 ) {
      this.props.transaction(parseFloat(this.state.amount), 'D', 'Deposit');
      let inputs = document.getElementsByTagName('input');
      this.setState({amount:0})
      inputs[0].value = '';
    }
  }

  withdraw = (e) => {
    if (this.state.amount > 0) {
      this.props.transaction(parseFloat(this.state.amount), 'W', 'Withdraw');
      this.setState({amount:0});
      let inputs = document.getElementsByTagName('input');
      inputs[0].value = '';
    }
  }

  handleChange = (e) => {
    this.props.getAccounts(e.target.value)
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <h4>Accounts {this.props.firstName} {this.props.lastName}</h4>
            <br/>
            <Form>
              <FormGroup>
                <Input type="select" name="select" id="exampleSelect" onChange={this.handleChange}>
                  <option>Select User...</option>
                  {this.props.users.map(user =>
                    <option key={user.id} value={user.id}>{user.firstName}  {user.lastName}</option>
                  )}
                </Input>
              </FormGroup>
            </Form>
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
            </tr>
            </thead>
            <tbody>
            {this.props.balanceHistory.map((item,ind) =>
              <tr key={ind}>
                <td>{Date(item.date)}</td>
                <td>{item.transactionID}</td>
                <td className={item.desc === 'Deposit' ? 'green' : 'red'}>{item.desc}</td>
                <td className={item.desc === 'Deposit' ? 'green' : 'red'}>${item.amount}</td>
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
    balanceHistory: state.accounts.accData,
    users: state.accounts.users
  }
}

const mapDispatchToProps = {
  logout,
  transaction,
  getUsers,
  getAccounts
}

export default connect(mapStateToProps,mapDispatchToProps)(Manager);
