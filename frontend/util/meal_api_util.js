import axios from "axios";

export const fetchMeals = schoolId => {
  return axios({
    method: "GET",
    url: `/api/meals`,
    params: { id: schoolId }
  });
};