
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import auth from './auth'

export default combineReducers({
  routing,
  auth
})
