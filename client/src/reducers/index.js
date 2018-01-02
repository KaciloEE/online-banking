import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import accounts from './accounts';
import auth from './auth';
import alert from './alert';

export default combineReducers({
  routing: routerReducer,
  accounts,
  auth,
  alert
})
