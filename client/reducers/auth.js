import { handleActions } from 'redux-actions';

const initialState = { loggedIn: null };

export default handleActions({
  'add token': (state, action) => {
    return Object.assign({}, state, {'loggedIn': action.payload});
  },
  'remove token': (state, action) => {
    return Object.assign({}, state, {'loggedIn': null});
  }
}, initialState);