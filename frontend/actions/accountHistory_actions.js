import * as reservationApiUtil from "../util/reservation_api_util";

export const RECEIVE_ALL_RESERVATIONS = "RECEIVE_ALL_RESERVATIONS";
export const RECEIVE_ALL_RESERVATIONS_ERRORS = "RECEIVE_ALL_RESERVATIONS_ERRORS";

export const fetchReservations = () => dispatch => {
  return reservationApiUtil.fetchReservations().then(
    allReservations => {
      return dispatch(receiveAllReservations(allReservations.data));
    },
    errors => dispatch(receiveErrors(errors.response.data))
  );
};

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