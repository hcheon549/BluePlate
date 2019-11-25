import axios from "axios";

export const RECEIVE_ALL_TIMES = "RECEIVE_ALL_TIMES";

export const fetchTimes = () => dispatch => {
  return getTimes().then(
    payload => {
      return dispatch(receiveTimes(payload.data));
    }
  );
};

const receiveTimes = times => {
  return {
    type: RECEIVE_ALL_TIMES,
    times
  };
};


const getTimes = () => {
  return axios({
    method: "GET",
    url: `/api/pickup_times`
  });
};
