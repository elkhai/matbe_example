import { createAction } from 'redux-actions'
import {bind} from 'redux-effects'
import {fetch} from 'redux-effects-fetch'
import { LOGIN } from '../constants/urls'

export function doLogIn(form, history, routerActions) {
  return bind(
    fetch(LOGIN, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    }),
    ({value}) => {
      addToken(value.token);
      history.push('/main');
      routerActions.push('/main');
    },
    ({value}) => console.error('wrong user')
  )
}

const addToken = createAction('add token');
export const removeToken = createAction('remove token');