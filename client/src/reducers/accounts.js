import {GET_ACCOUNTS, GET_BALANCE, TRANSACTION, CLEAR_STATE_ACCOUNT} from '../constants';
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

      let totalDep = totalDepositFilter.length > 0 ? totalDepositFilter.reduce((a,b) => a+b) : 0;
      let totalWith = totalWithdrawFilter.length > 0 ? totalWithdrawFilter.reduce((a,b) => a+b) : 0;

      return Object.assign({}, state, {
        'totalBalance': totalDep - totalWith
      })
    // case MAKE_DEPOSIT:
    //   return Object.assign({}, state, {
    //     accData: [payload, ...state.accData]
    //   })
    // case WITHDRAW_DEPOSIT:
    //   return Object.assign({}, state, {
    //     accData: [payload, ...state.accData]
    //   })
    case TRANSACTION:
      return Object.assign({}, state, {
        accData: [payload, ...state.accData]
      })
    case CLEAR_STATE_ACCOUNT:
      return Object.assign({}, state, {
        'totalBalance': 0,
        'accData': []
      })
    default:
      return state
  }
}
