import axios from "axios";

export const fetchMenus = schoolId => {
  return axios({
    method: "GET",
    url: `/api/menus`,
    params: { id: schoolId }
  });
};
