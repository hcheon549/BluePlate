import {
  RECEIVE_ALL_PLANS,
  RECEIVE_PLAN_ERRORS
} from '../actions/plan_actions';

const planErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_PLANS:
      return [];
    case RECEIVE_PLAN_ERRORS:
      return action.errors;
    default:
      return oldState;
  }
};

export default planErrorsReducer;
