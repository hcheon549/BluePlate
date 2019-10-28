import axios from "axios";

export const fetchPlans = () => {
  return axios({
    method: "GET",
    url: `/api/plans`
  });
};
