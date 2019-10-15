import axios from "axios";

export const fetchSchools = () => {
  return axios({
    method: "GET",
    url: `/api/schools`
  });
};
