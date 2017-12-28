import {GET_BALANCE, MAKE_DEPOSIT, WITHDRAW_DEPOSIT} from '../constants';
import { hashCode } from './helper';
// const initialState = {
//   totalBalance: 0
// }
let initialState = require('./data.js');

export default (state = initialState, {type, payload}) => {
  let unixTime = Math.round((new Date()).getTime() / 1000);
  switch (type) {
    case GET_BALANCE:
      let totalDepositFilter = state.accData.account.checking.filter(item => item.desc ==='Deposit').map(d => d.amount);
      let totalWithdrawFilter = state.accData.account.checking.filter(item => item.desc ==='Withdraw').map(d => d.amount);
      let totalDep = totalDepositFilter.reduce((a,b) => a+b);
      let totalWith = totalWithdrawFilter.reduce((a,b) => a+b);

      return Object.assign({}, state, {
        'totalBalance': totalDep - totalWith
      })
    case MAKE_DEPOSIT:
      let depositTrans = {
        id: hashCode(payload.code, unixTime),
        amount: parseFloat(payload.amount),
        balance: parseFloat(payload.amount) + parseFloat(state.accData.account.checking[0].balance),
        date: parseFloat(unixTime),
        desc: 'Deposit'
      }
      return Object.assign({}, state, {
        accData: {
          account: {
            checking: [depositTrans, ...state.accData.account.checking]
          }
        }
      })
    case WITHDRAW_DEPOSIT:
      let withdrawTrans = {
        id: hashCode(payload.code, unixTime),
        amount: parseFloat(payload.amount),
        balance: parseFloat(state.accData.account.checking[0].balance) - parseFloat(payload.amount),
        date: parseFloat(unixTime),
        desc: 'Withdraw'
      }
      return Object.assign({}, state, {
        accData: {
          account: {
            checking: [withdrawTrans, ...state.accData.account.checking]
          }
        }
      })
    default:
      return state
  }
}
