import { RECEIVE_ALL_PLANS } from "../actions/plan_actions";

const planReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_PLANS:
      return action.plans;
    default:
      return oldState;
  }
};

export default planReducer;
