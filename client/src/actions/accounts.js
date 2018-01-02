//import { browserHistory } from 'react-router';
import {GET_BALANCE, MAKE_DEPOSIT, WITHDRAW_DEPOSIT} from '../constants';
//import axios from 'axios';


export const getBalance = () => dispatch => {
  dispatch({type: GET_BALANCE})
}

export const makeDeposit = (amount, code) => dispatch => {
  let payload = {
    amount,
    code
  }
  dispatch({
    type: MAKE_DEPOSIT,
    payload
  })
}

export const withdrawDeposit = (amount, code) => dispatch => {
  let payload = {
    amount,
    code
  }
  dispatch({
    type: WITHDRAW_DEPOSIT,
    payload
  })
}