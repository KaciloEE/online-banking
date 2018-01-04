import axios from 'axios';
import jwtDecode from 'jwt-decode';

import {GET_ACCOUNTS,GET_BALANCE, TRANSACTION, CLEAR_STATE_ACCOUNT} from '../constants';
import { hashCode } from '../utils';


let unixTime = Math.round((new Date()).getTime() / 1000);

export const getAccounts = () => async (dispatch, getState) => {
  await axios.get('http://localhost:8081/api/balance/', { headers: { token: getState().auth.token } })
    .then((response) => {
      dispatch({
        type: GET_ACCOUNTS,
        payload: response.data
      })
      dispatch(getBalance())
    })
    .catch(err => {
      console.log(err)
    })
}

export const getBalance = () => (dispatch) => {
  dispatch({type: GET_BALANCE})
}

export const transaction = (amount, code, desc) => async (dispatch, getState) => {
  let depositTrans = {
    transactionID: hashCode(code, unixTime),
    amount: parseFloat(amount),
    date: parseFloat(unixTime),
    desc: desc,
    user: jwtDecode(getState().auth.token).id
  }
  await axios.post('http://localhost:8081/api/transfer/', { headers: { token: getState().auth.token }, depositTrans } )
    .then(response => {
      dispatch({
        type: TRANSACTION,
        payload: response.data
      })
      dispatch(getBalance())
    })
    .catch(err => console.log(err))
}

export const clearStateAccount = () => (dispatch) => {
  dispatch({type: CLEAR_STATE_ACCOUNT})
}

// export const makeDeposit = (amount, code) => async (dispatch, getState) => {
//   let depositTrans = {
//     transactionID: hashCode(code, unixTime),
//     amount: parseFloat(amount),
//     date: parseFloat(unixTime),
//     desc: 'Deposit',
//     user: jwtDecode(getState().auth.token).id
//   }
//   await axios.post('http://localhost:8081/api/transfer/', { headers: { token: getState().auth.token }, depositTrans } )
//     .then(response => {
//       dispatch({
//         type: MAKE_DEPOSIT,
//         payload: response.data
//       })
//       dispatch(getBalance())
//     })
//     .catch(err => console.log(err))
// }
//
// export const withdrawDeposit = (amount, code) => async (dispatch, getState) => {
//   let depositTrans = {
//     transactionID: hashCode(code, unixTime),
//     amount: parseFloat(amount),
//     date: parseFloat(unixTime),
//     desc: 'Withdraw',
//     user: jwtDecode(getState().auth.token).id
//   }
//   await axios.post('http://localhost:8081/api/transfer/', { headers: { token: getState().auth.token }, depositTrans } )
//     .then(response => {
//       dispatch({
//         type: WITHDRAW_DEPOSIT,
//         payload: response.data
//       })
//       dispatch(getBalance())
//     })
//     .catch(err => console.log(err))
// }

