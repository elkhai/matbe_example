import { createAction } from 'redux-actions'
import {bind} from 'redux-effects'
import {fetch} from 'redux-effects-fetch'
import { TRANSACTION, TRANSACTIONS, DELETE_TRANSACTION } from '../constants/urls'

const add = createAction('add transaction');
const remove = createAction('remove');
const initialLoad = createAction('initial');

export function addTransaction(form) {
  console.log(form);
  return bind(
    fetch(TRANSACTION, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    }),
    ({value}) => add(form),
    ({value}) => console.error('cant add transaction')
  )
}

export function removeTransaction(count) {
  return bind(
    fetch(DELETE_TRANSACTION, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({count: count})
    }),
    ({value}) => remove(count),
    ({value}) => console.error('cant remove transaction')
  )
}

export function loadTransactions() {
  return bind(
    fetch(TRANSACTIONS),
    ({value}) => initialLoad(value.transactions),
    ({value}) => console.error('cant load transactions')
  )
}