import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import Login from './containers/Login'
import Main from './containers/Main'
import configure from './store'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

require('./main.scss')

const store = configure()
const history = syncHistoryWithStore(browserHistory, store)

const transition = (nextState, replace, path) => {
  replace({
      pathname: path,
      state: { nextPathname: nextState.location.pathname }
    })
}

const checkAuth = (nextState, replace) => {
  const state = store.getState();
  if ( state.auth.loggedIn ) {
    transition(nextState, replace, '/main');
  } else {
    transition(nextState, replace, '/login');
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" onEnter={checkAuth} />
      <Route path="/main" component={Main} />
      <Route path="/login" component={Login} />
    </Router>
  </Provider>,
  document.getElementById('root')
)
