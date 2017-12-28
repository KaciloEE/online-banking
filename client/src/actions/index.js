import {LOGIN_USER_START, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER, GET_BALANCE, MAKE_DEPOSIT} from '../constants';
import axios from 'axios';


export const loginUserSuccess = (token) => dispatch => {
  localStorage.setItem('token', token);
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: {
      token
    }
  })
}

export const loginUserFailure = (error) => dispatch => {
  localStorage.removeItem('token');
  dispatch({
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  })
}

export const loginUser = (data) => dispatch => {
  dispatch({type: LOGIN_USER_START})
  axios.post('http://localhost:8081/auth/login/', {...data})
    .then(response => {
      dispatch(loginUserSuccess(response.data.token));
    })
    .catch(error => dispatch(loginUserFailure(error)))
}

export const logout = () => dispatch => {
  localStorage.removeItem('token');
  dispatch({type: LOGOUT_USER})
}

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