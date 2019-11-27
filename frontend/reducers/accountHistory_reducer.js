import {
  RECEIVE_ALL_RESERVATIONS,
} from '../actions/accountHistory_actions';
import merge from 'lodash/merge';

const accountHistoryReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_ALL_RESERVATIONS:
      return action.reses;
    default:
      return newState;
  }
};


export default accountHistoryReducer;
