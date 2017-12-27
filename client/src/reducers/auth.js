import {LOGIN_USER_SUCCESS, LOGOUT_USER, LOGIN_USER_FAILURE} from '../constants';
import jwtDecode from 'jwt-decode';

const initialState = {
  token: null,
  userName: null,
  isAuthenticated: false,
  statusText: null
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
        'isAuthenticated': true,
        'token': payload.token,
        'userName': jwtDecode(payload.token).userName,
        'statusText': 'You have been successfully logged in.'
      })
    case LOGIN_USER_FAILURE:
      return Object.assign({}, state, {
        'isAuthenticated': false,
        'token': null,
        'userName': null,
        'statusText': `Authentication Error: ${payload.status} ${payload.statusText}`
      })
    case LOGOUT_USER:
      return Object.assign({}, state, {
        'isAuthenticated': false,
        'token': null,
        'userName': null,
        'statusText': 'You have been successfully logged out.'
      })
    default:
      return state
  }
}
