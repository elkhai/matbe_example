import { createAction } from 'redux-actions'
import {bind} from 'redux-effects'
import {fetch} from 'redux-effects-fetch'
import { BANKS } from '../constants/urls'

export function getBanksList() {
  return bind(
    fetch(BANKS),
    ({value}) => add(value.banks),
    ({value}) => console.error('cant add transaction')
  )
}

const add = createAction('add');