import { ALERT_SUCCESS, ALERT_ERROR, ALERT_CLEAR } from '../constants';

function success() {
  return { type: ALERT_SUCCESS };
}

function error(payload) {
  return { type: ALERT_ERROR, payload };
}

function clear() {
  return { type: ALERT_CLEAR };
}

export const alertActions = {
  success,
  error,
  clear
};