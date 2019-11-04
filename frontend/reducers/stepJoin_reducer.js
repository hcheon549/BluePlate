
import {
  SET_STEP_JOIN_STEP,
} from '../actions/stepjoin_actions';

const stepJoinReducer = (state = null, action) => {
  Object.freeze(state);
  switch (action.type) {
    case SET_STEP_JOIN_STEP:
      return action.payload;
    default:
      return state;
  }
};

export default stepJoinReducer;
