
import {
  SET_STEP_JOIN_STEP,
} from '../actions/stepjoin_actions';

const stepJoinReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case SET_STEP_JOIN_STEP:
      return Object.assign({}, state, { stepJoin: action.payload });
    default:
      return state;
  }
};

export default stepJoinReducer;
