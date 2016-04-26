
import { createStore, applyMiddleware, compose } from 'redux'
import persistState from 'redux-localstorage'

import { logger } from '../middleware'
import rootReducer from '../reducers'

export default function configure(initialState) {
  const create = compose(
    persistState()
  )(createStore)

  const createStoreWithMiddleware = applyMiddleware(
    logger
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
