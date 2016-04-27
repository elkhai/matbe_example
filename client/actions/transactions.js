import { createAction } from 'redux-actions'
import {bind} from 'redux-effects'
import {fetch} from 'redux-effects-fetch'
import { TRANSACTION, TRANSACTIONS, DELETE_TRANSACTION } from '../constants/urls'

export function addTransaction(t) {
  return bind(
    fetch(`${TRANSACTION}?amount=${t.amount}&bankId=${t.bankId}`),
    ({value}) => add(t),
    ({value}) => console.error('cant add transaction')
  )
}

export function removeTransaction(count) {
  return bind(
    fetch(`${DELETE_TRANSACTION}?count=${count}`),
    ({value}) => remove(count),
    ({value}) => console.error('cant remove transaction')
  )
}

export function loadTransactions() {
  return bind(
    fetch(TRANSACTIONS),
    ({value}) => initialLoad(value),
    ({value}) => console.error('cant load transactions')
  )
}

const add = createAction('add');
const remove = createAction('remove');
const initialLoad = createAction('initial');