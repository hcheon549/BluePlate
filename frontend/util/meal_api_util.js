import axios from "axios";

export const fetchMenus = schoolId => {
  return axios({
    method: "GET",
    url: `/api/meals`,
    params: { id: schoolId }
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
