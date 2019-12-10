import { 
  RECEIVE_LEAD,
  RECEIVE_LEAD_ERRORS 
} from "../actions/user_actions";

let initialState = {
  capture: null,
  errors: null
}

const signatureReducer = (state=initialState, action) => {
  switch (action.type) {
    case RECEIVE_LEAD:
      return state.capture = action.lead;
    case RECEIVE_LEAD_ERRORS:
      return state.errors = action.errors
    default:
      return state;
  }
};

export default signatureReducer;
