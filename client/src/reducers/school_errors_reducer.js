import {
  RECEIVE_ALL_SCHOOLS,
  RECEIVE_SCHOOL_ERRORS
} from '../actions/school_actions';

const schoolErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_SCHOOLS:
      return [];
    case RECEIVE_SCHOOL_ERRORS:
      return action.errors;
    default:
      return oldState;
  }
};

export default schoolErrorsReducer;
