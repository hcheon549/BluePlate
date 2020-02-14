import {
  RECEIVE_ALL_USERS,
} from '../actions/user_actions';
import merge from 'lodash/merge';

const accountsReducer = (state = {}, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_ALL_USERS:
      return merge(state, action.users);
    default:
      return newState;
  }
};


export default accountsReducer;
