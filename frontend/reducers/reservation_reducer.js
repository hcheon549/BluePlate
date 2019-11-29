import {
  RECEIVE_RESERVATION,
  REMOVE_RESERVATION
} from '../actions/reservation_actions';
import {
  RECEIVE_TODAY_RESERVATIONS
} from '../actions/accountHistory_actions';
import merge from 'lodash/merge';

let initialState = {
  lunch: {},
  dinner: {}
}
const reservationReducer = (state = initialState, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_RESERVATION:
      if (action.reservation.pickupTime.pickupType == 0){
        newState.lunch = action.reservation
      } else if (action.reservation.pickupTime.pickupType == 1){
        newState.dinner = action.reservation
      } else {
        newState
      }
      return newState;
    case RECEIVE_TODAY_RESERVATIONS:
      Object.values(action.reservations).forEach((reservation) => {
        if (reservation.pickupTime.pickupType == 0){
          newState.lunch = reservation
        } else if (reservation.pickupTime.pickupType == 1){
          newState.dinner = reservation
        } else {
          newState
        }
      })
      return newState;
    case REMOVE_RESERVATION:
      delete newState[action.resId];
      return newState;
    default:
      return state;
  }
};


export default reservationReducer;
