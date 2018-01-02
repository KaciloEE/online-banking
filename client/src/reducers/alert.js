import { ALERT_SUCCESS, ALERT_ERROR, ALERT_CLEAR } from '../constants';

const initialState = {};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case ALERT_SUCCESS:
      return {
        type: 'success',
        message: 'You have been successfully logged in.'
      };
    case ALERT_ERROR:
      return {
        type: 'danger',
        message: 'Authentication Error'
        //message: `Authentication Error: ${payload.status} ${payload.statusText}`
      };
    case ALERT_CLEAR:
      return {};
    default:
      return state
  }
}