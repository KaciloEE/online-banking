import 'bootstrap/dist/css/bootstrap.css';
import './main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {syncHistoryWithStore} from 'react-router-redux';
import {Router, Route, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

import reducers from './reducers';
import App from './App';
import Register from './components/Register';

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(thunk)
))

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}/>
      <Route path='/register' component={Register}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();