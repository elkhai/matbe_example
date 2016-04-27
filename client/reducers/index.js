
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import auth from './auth'
import transactions from './transactions'

export default combineReducers({
  routing,
  auth,
  transactions
})
