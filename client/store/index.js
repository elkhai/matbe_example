
import { createStore, applyMiddleware, compose } from 'redux'
import persistState from 'redux-localstorage'
import effects from 'redux-effects'
import fetch, { fetchEncodeJSON } from 'redux-effects-fetch'

import { logger } from '../middleware'
import rootReducer from '../reducers'

export default function configure(initialState) {
  const create = compose(
    persistState()
  )(createStore)

  const createStoreWithMiddleware = applyMiddleware(
    logger,
    effects, 
    fetch, 
    fetchEncodeJSON
  )(create)

  const store = createStoreWithMiddleware(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
