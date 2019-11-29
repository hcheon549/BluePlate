import * as reservationApiUtil from "../util/reservation_api_util";

export const RECEIVE_ALL_RESERVATIONS = "RECEIVE_ALL_RESERVATIONS";
export const RECEIVE_ALL_RESERVATIONS_ERRORS = "RECEIVE_ALL_RESERVATIONS_ERRORS";
export const RECEIVE_TODAY_RESERVATIONS = "RECEIVE_TODAY_RESERVATIONS";

export const fetchReservations = () => dispatch => {
  return reservationApiUtil.fetchReservations().then(
    allReservations => {
      dispatch(receiveTodayReservations(allReservations.data.todayReservations));
      return dispatch(receiveAllReservations(allReservations.data.allReservations));
    },
    errors => dispatch(receiveErrors(errors.response.data))
  );
};

const receiveTodayReservations = reservations => {
  return {
    type: RECEIVE_TODAY_RESERVATIONS,
    reservations
  }
}

const receiveAllReservations = reses => {
  return {
    type: RECEIVE_ALL_RESERVATIONS,
    reses
  };
};

const receiveErrors = errors => {
  return {
    type: RECEIVE_ALL_RESERVATIONS_ERRORS,
    errors
  };
};