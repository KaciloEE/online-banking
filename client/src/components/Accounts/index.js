import React, { Component } from 'react';
import {Row, Col, Card, CardText, CardBody,
  CardTitle, Button, InputGroupAddon,InputGroup, Input, Table } from 'reactstrap';

class Accounts extends Component {
  render() {
    return (
      <div>
        <Row>
          <h4>Accounts</h4>
        </Row>
        <Row>
          <Col xs="6">
            <Card>
              <CardBody>
                  <InputGroup>
                    <InputGroupAddon>$</InputGroupAddon>
                    <Input placeholder="Amount" type="number" step="1" />
                  </InputGroup>
                <br/>
                <Button color="success">Deposits</Button>{' '}
                <Button color="danger">Withdraw</Button>{' '}
              </CardBody>
            </Card>
          </Col>
          <Col xs="6">
            <Card>
              <CardBody>
                <CardTitle>Summary</CardTitle>
                <hr/>
                <CardText>Checking balance $</CardText>
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

export default Accounts;