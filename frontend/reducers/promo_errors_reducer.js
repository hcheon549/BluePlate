import {
  RECEIVE_PROMO,
  RECEIVE_PROMO_ERRORS
} from '../actions/promo_actions';

const promoErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_PROMO:
      return [];
    case RECEIVE_PROMO_ERRORS:
      return action.error;
    default:
      return oldState;
  }
};

export default promoErrorsReducer;
