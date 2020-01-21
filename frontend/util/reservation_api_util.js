import axios from "axios";

export const fetchReservations = () => {
  return axios({
    method: "GET",
    url: `/api/reservations`
  });
};

export const sendReservations = () => {
  return axios({
    method: "GET",
    url: `/api/reservations/getreservations`
  })
}

export const createReservation = reservation => {
  return axios({
    method: "POST",
    url: `/api/reservations`,
    data: {
      reservation: {
        user_id: reservation.userId,
        menu_id: reservation.menuId,
        pickup_time_id: reservation.pickupTimeId
      }
    }
  });
};

export const updateReservation = reservation => {
  return axios({
    method: "PATCH",
    url: `/api/reservations/${reservation.id}`,
    data: {
      reservation: {
        user_id: reservation.userId,
        menu_id: reservation.menuId,
        pickup_time_id: reservation.pickupTimeId
      }
    }
  });
};

export const deleteReservation = id => {
  return axios({
    method: "DELETE",
    url: `/api/reservations/${id}`
  });
};

export const sendOrder = data => {
  return axios({
    method: "POST",
    url: `/api/reservations/sendorder/${data.shop_id}`,
    data
  })
}