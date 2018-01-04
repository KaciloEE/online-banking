import { browserHistory } from 'react-router';
import axios from 'axios';

import {LOGIN_USER_START, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER} from '../constants';
import {alertActions} from './alert';


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
    type: LOGIN_USER_FAILURE
  })
}

export const loginUser = (data) => dispatch => {
  dispatch({type: LOGIN_USER_START})
  axios.post('http://localhost:8081/auth/login/', {...data})
    .then(response => {
      dispatch(loginUserSuccess(response.data.token))
      dispatch(alertActions.success())
    })
    .catch(error => {
      dispatch(loginUserFailure(error))
      dispatch(alertActions.error(error.response.data))
    })
}

export const logout = () => dispatch => {
  localStorage.removeItem('token');
  dispatch({type: LOGOUT_USER})
  dispatch(alertActions.clear())
}

export const registerUser = (payload) => dispatch => {
  axios.post('http://localhost:8081/auth/register/', {...payload})
    .then(response => {
      dispatch(loginUserSuccess(response.data.token))
      dispatch(alertActions.success())
      browserHistory.push('/')
    })
    .catch(error => {
      dispatch(loginUserFailure(error))
      dispatch(alertActions.error(error.response.data))
    })

}
