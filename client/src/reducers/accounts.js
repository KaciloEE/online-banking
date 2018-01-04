import {GET_ACCOUNTS, GET_BALANCE, MAKE_DEPOSIT, WITHDRAW_DEPOSIT} from '../constants';
const initialState = {
  totalBalance: 0,
  accData: []
}

export default (state = initialState, {type, payload}) => {

  switch (type) {
    case GET_ACCOUNTS:
      return Object.assign({}, state, payload)
    case GET_BALANCE:
      let totalDepositFilter = state.accData.filter(item => item.desc ==='Deposit').map(d => d.amount);
      let totalWithdrawFilter = state.accData.filter(item => item.desc ==='Withdraw').map(d => d.amount);
      let totalDep = totalDepositFilter.reduce((a,b) => a+b);
      let totalWith = totalWithdrawFilter.reduce((a,b) => a+b);

      return Object.assign({}, state, {
        'totalBalance': totalDep - totalWith
      })
    case MAKE_DEPOSIT:
      return Object.assign({}, state, {
        accData: [payload, ...state.accData]
      })
    case WITHDRAW_DEPOSIT:
      return Object.assign({}, state, {
        accData: [payload, ...state.accData]
      })
    default:
      return state
  }
}
