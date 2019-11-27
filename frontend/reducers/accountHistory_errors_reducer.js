import {
  RECEIVE_ALL_RESERVATIONS,
  RECEIVE_ALL_RESERVATIONS_ERRORS
} from '../actions/accountHistory_actions';

const accountHistoryErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_RESERVATIONS:
      return [];
    case RECEIVE_ALL_RESERVATIONS_ERRORS:
      return action.errors;
    default:
      return oldState;
  }
};

export default accountHistoryErrorsReducer;