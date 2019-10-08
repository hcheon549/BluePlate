import axios from "axios";

export const fetchMeals = school => {
  return axios({
    method: "GET",
    url: `/api/meals`,
    params: { school }
  });
};

export const searchMeals = search => {
  return axios({
    method: "GET",
    url: `/api/meals/search`,
    params: {
      school: search.school,
      search: search.search,
      bounds: search.bounds
    }
  });
};
