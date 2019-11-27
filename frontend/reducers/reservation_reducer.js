import {
  RECEIVE_RESERVATION,
  RECEIVE_ALL_RESERVATIONS,
  REMOVE_RESERVATION
} from '../actions/reservation_actions';
import merge from 'lodash/merge';

let initialState = {
  lunch: {},
  dinner: {}
}
const reservationReducer = (state = initialState, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_ALL_RESERVATIONS:
      return action.reses;
    case RECEIVE_RESERVATION:
      if (action.reservation.pickupTime.pickupType == 0){
        newState.lunch = action.reservation
      } else if (action.reservation.pickupTime.pickupType == 1){
        newState.dinner = action.reservation
      } else {
        newState
      }
      debugger
      return newState;
    case REMOVE_RESERVATION:
      delete newState[action.resId];
      return newState;
    default:
      return state;
  }
};


export default reservationReducer;
