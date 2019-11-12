import {
  SET_POLICY,
  RECEIVE_CHARGE_ERRORS
} from '../util/charge_api_util';

const chargeErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case SET_POLICY:
      return [];
    case RECEIVE_CHARGE_ERRORS:
      return action.errors;
    default:
      return oldState;
  }
};

export default chargeErrorsReducer;
