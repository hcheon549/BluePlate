import { RECEIVE_ALL_TIMES } from "../actions/time_action";

const timeReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_TIMES:
      return action.times
    default:
      return oldState;
  }
};

export default timeReducer;
