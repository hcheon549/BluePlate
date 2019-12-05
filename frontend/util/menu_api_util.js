import axios from "axios";

export const fetchMenus = schoolId => {
  return axios({
    method: "GET",
    url: `/api/menus`,
    params: { id: schoolId }
  });
};

export const mapUpdateMenus = data => {
  return axios({
    method: "GET",
    url: `/api/menus`,
    params: {
      id: data.schoolId,
      bounds: data.bounds
    }
  });
};
