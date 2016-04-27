import { handleActions } from 'redux-actions';

const initialState = {count: 2, data: []};

export default handleActions({
  'add transaction': (state, action) => {
    let newCount = state.count++;
    return Object.assign(
      state, 
      {
        count: newCount, 
        data: [Object.assign({id: newCount}, action.payload), ...state.data]
      }
    )
  },
  'remove': (state, action) => {
    let newData = state.data.slice();
    newData.splice(action.payload, 1)
    console.log(newData);
    return Object.assign(state, { data: newData })
  },
  'initial': (state, action) => {
    return Object.assign(state, { data: action.payload })
  }
}, initialState);