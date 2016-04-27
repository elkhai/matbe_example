
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import auth from './auth'
import transactions from './transactions'
import banks from './banks'

export default combineReducers({
  routing,
  auth,
  transactions,
  banks
})
