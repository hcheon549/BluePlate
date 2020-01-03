import { 
  RECEIVE_PASSWORD_RESET_RESPOSE,
  RECEIVE_PASSWORD_RESET_RESPONSE_ERROR
 } from "../actions/password_reset_actions";

 const initialState = {
   response: null,
   errors: null
 }

const passwordResetReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_PASSWORD_RESET_RESPOSE:
      newState = {...state, response: action.response}
      return newState;
    case RECEIVE_PASSWORD_RESET_RESPONSE_ERROR:
      newState = {...state, error: action.error}
      return newState;
    default:
      return state;
  }
};

export default passwordResetReducer;
