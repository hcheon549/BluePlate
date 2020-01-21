import * as reservationApiUtil from "../util/reservation_api_util";

export const RECEIVE_RESERVATION = "RECEIVE_RESERVATION";
export const REMOVE_RESERVATION = "REMOVE_RESERVATION";
export const RECEIVE_RES_ERRORS = "RECEIVE_RES_ERRORS";
export const SEND_RESERVATIONS = "SEND_RESERVATIONS";

export const createReservation = res => dispatch => {
  return reservationApiUtil.createReservation(res).then(
    payload => {
      return dispatch(receiveReservation(payload.data));
    },
    errors => dispatch(receiveErrors(errors.response.data))
  );
};

export const updateReservation = res => dispatch => {
  return reservationApiUtil.updateReservation(res).then(
    payload => {
      return dispatch(receiveReservation(payload.data));
    },
    errors => dispatch(receiveErrors(errors.response.data))
  );
};

export const deleteReservation = id => dispatch => {
  return reservationApiUtil.deleteReservation(id).then(
    payload => {
      return dispatch(removeReservation(payload.data));
    },
    errors => dispatch(receiveErrors(errors.response.data))
  );
};

export const sendReservations = () => dispatch => {
  return reservationApiUtil.sendReservations().then(
    payload => {
      return dispatch(sendOrders(payload.data))
    },
    errors => dispatch(receiveErrors(errors.response.data))
  )
}

const sendOrders = payload => {
  return {
    type: SEND_RESERVATIONS,
    payload
  };
};

const receiveReservation = payload => {
  return {
    type: RECEIVE_RESERVATION,
    reservation: payload.reservation,
    user: payload.user
  };
};

const removeReservation = payload => {
  return {
    type: REMOVE_RESERVATION,
    reservation: payload.reservation,
  };
};

const receiveErrors = errors => {
  return {
    type: RECEIVE_RES_ERRORS,
    errors
  };
};

export const handleReserve = (props, state) => {
  window.scrollTo(0, 0);
  if (props.resToday.constructor !== Array) {
    let newRes = Object.assign({}, props.resToday);
    newRes.menuId = props.menu.id;
    newRes.time = state.pickupTimeId;

    props.updateReservation(newRes).then(() => props.openConfirmModal());
  } else {
    let newRes = {
      userId: props.currentUser.id,
      menuId: props.menu.id,
      time: state.pickupTimeId
    };
    props.createReservation(newRes).then(() => props.openConfirmModal());
  }
};
