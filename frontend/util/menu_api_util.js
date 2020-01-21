import axios from "axios";

export const fetchMenus = schoolId => {
  return axios({
    method: "GET",
    url: `/api/menus`,
    params: { id: schoolId }
  });
};

export const createMenu = menuData => {
  return axios({
    method: "POST",
    url: `/api/menus`,
    data: menuData
  })
}

export const fetchTodayMenus = () => {
  return axios({
    method: "GET",
    url: `/api/todaymenus`
  })
}

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
