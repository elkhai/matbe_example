import { handleActions } from 'redux-actions';

const initialState = [];

export default handleActions({
  'add': (state, action) => {
    return action.payload
  }
}, initialState);