import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import Login from './containers/Login'
import configure from './store'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

require('./main.scss')

global.Immutable = require('immutable');

const store = configure()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Login}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
