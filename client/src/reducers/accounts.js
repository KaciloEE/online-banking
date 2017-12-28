import {GET_BALANCE, MAKE_DEPOSIT} from '../constants';

const initialState = {
  totalBalance: 0
}

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_BALANCE:
      return Object.assign({}, state, {
        'totalBalance': 0
      })
    case MAKE_DEPOSIT:
      return Object.assign({}, state, {
        'totalBalance': payload.amount
      })
    default:
      return state
  }
}
