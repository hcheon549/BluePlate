import { TOGGLE_BURGER } from "../actions/burger_actions";

const burgerReducer = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_BURGER:
      let newState = !state;
      return newState;
    default:
      return state;
  }
};

export default burgerReducer;
