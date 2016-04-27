
import { createStore, applyMiddleware, compose } from 'redux'
import persistState from 'redux-localstorage'
import effects from 'redux-effects'
import fetch, { fetchEncodeJSON } from 'redux-effects-fetch'
import fetchFixture, { responses } from 'redux-effects-fetch-fixture'
import * as urls from '../constants/urls'

import { logger } from '../middleware'
import rootReducer from '../reducers'
let count = 2;
let transactions = [
  {id:1, amount: 100, bankId: 1}, 
  {id:2, amount: 200, bankId: 2}
];

const fixtures = {
  [urls.LOGIN]: {
    'POST': body => (body.username === 'admin' && body.password === 'admin') ? responses.ok({token: 'sometoken'}) : responses.notFound('404', 'Запрашиваемый пользователь не найден')
  },
  [urls.BANKS]: {
    'GET': () => responses.ok({banks: ["Сбербанк","ВТБ","АльфаБанк","Тинькофф","МКБ"]})
  },
  [urls.TRANSACTION]: {
    'POST': body => { transactions.push({id: ++count, amount: body.amount, bankId: body.bankId}); return responses.ok() }
  },
  [urls.TRANSACTIONS]: {
    'GET': () => responses.ok({transactions: transactions})
  },
  [urls.DELETE_TRANSACTION]: {
    'POST': (body) => { transactions.splice(body.count, 1); return responses.ok() }
  }
}

export default function configure(initialState) {
  let env = process.env.NODE_ENV === 'production';
  console.log('env', env);

  const fetchMiddleware = env ? fetch : fetchFixture(fixtures);

  const create = compose(
    persistState()
  )(createStore)

  const createStoreWithMiddleware = applyMiddleware(
    logger,
    effects, 
    fetchMiddleware,
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
