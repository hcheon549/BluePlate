import { 
  RECEIVE_LEAD,
  RECEIVE_LEAD_ERRORS 
} from "../actions/user_actions";

import {
  MARK_AS_SEEN
} from '../actions/modal_actions';

let initialState = {
  seen: false,
  capture: null,
  errors: []
}

const leadReducer = (state=initialState, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_LEAD:
      newState = {...state, capture: action.lead, seen: true}
      return newState;
    case RECEIVE_LEAD_ERRORS:
        newState = {...state, errors: action.errors, seen: true}
      return newState
    case MARK_AS_SEEN:
        newState = {...state, seen: true}
      return newState
    default:
      return state;
  }
};

export default leadReducer;
