import {
  RECEIVE_ALL_RESERVATIONS,
} from '../actions/accountHistory_actions';
import merge from 'lodash/merge';

const accountHistoryReducer = (state = {}, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_ALL_RESERVATIONS:
      return merge(state, action.allReservations);
    default:
      return newState;
  }
};


export default accountHistoryReducer;
