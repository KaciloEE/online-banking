import {LOGIN_USER_SUCCESS, LOGOUT_USER, LOGIN_USER_FAILURE} from '../constants';
import jwtDecode from 'jwt-decode';

const initialState = {
  token: null,
  firstName: null,
  lastName: null,
  isAuthenticated: false
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
        'isAuthenticated': true,
        'token': payload.token,
        'firstName': jwtDecode(payload.token).firstName,
        'lastName': jwtDecode(payload.token).lastName
      })
    case LOGIN_USER_FAILURE:
      return Object.assign({}, state, {
        'isAuthenticated': false,
        'token': null,
        'firstName': null,
        'lastName': null
      })
    case LOGOUT_USER:
      return Object.assign({}, state, {
        'isAuthenticated': false,
        'token': null,
        'firstName': null,
        'lastName': null
      })
    default:
      return state
  }
}
