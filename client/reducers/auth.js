import { handleActions } from 'redux-actions';

const initialState = { loggedIn: null };

export default handleActions({
  'log in': (state, action) => {
    return Object.assign({}, state, {'loggedIn': action.payload});
  },
  'log out': (state, action) => {
    return Object.assign({}, state, {'loggedIn': null});
  }
}, initialState);