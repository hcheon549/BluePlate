import { SET_SIGNATURE } from "../actions/modal_actions";

const signatureReducer = (state = null, action) => {
  switch (action.type) {
    case SET_SIGNATURE:
      return true;
    default:
      return state;
  }
};

export default signatureReducer;
