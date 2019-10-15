import { RECEIVE_ALL_SCHOOLS } from "../actions/school_actions";

const schoolReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_SCHOOLS:
      return action.schools;
    default:
      return oldState;
  }
};

export default schoolReducer;
