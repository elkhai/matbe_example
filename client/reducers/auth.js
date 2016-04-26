import { handleActions } from 'redux-actions';
import Immutable from 'immutable'

const initialState = Immutable.Map({ loggedIn: null });

export default handleActions({
  'log in': (state, action) => {
    return state.update('loggedIn', t => action.payload);
  }
}, initialState);