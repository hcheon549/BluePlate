import * as menuApiUtil from "../util/menu_api_util";

export const RECEIVE_ALL_MENUS = "RECEIVE_ALL_MENUS";
export const RECEIVE_SEARCH_MENUS = "RECEIVE_SEARCH_MENUS";
export const RECEIVE_MENU_ERRORS = "RECEIVE_MENU_ERRORS";
export const RECEIVE_ALL_SHOPS = "RECEIVE_ALL_SHOPS"

export const START_LOADING_ALL_MENUS = "START_LOADING_ALL_MENUS";
export const START_LOADING_SEARCH_MENUS = "START_LOADING_SEARCH_MENUS";

export const fetchMenus = schoolId => dispatch => {
  return menuApiUtil.fetchMenus(schoolId).then(
    payload => {
      return dispatch(receiveMenus(payload.data));
    },
    errors => dispatch(receiveErrors(errors.response.data))
  );
};

export const createMenu = menuData => dispatch => (
  menuApiUtil.createMenu(menuData)
)

export const updateMapMenus = data => dispatch => {
  return menuApiUtil.mapUpdateMenus(data).then(
    payload => {
      dispatch(receiveShops(payload.data.shops))
      return dispatch(receiveMenus(payload.data));
    },
    errors => dispatch(receiveErrors(errors.response.data))
  );
};

// export const fetchTodayMenu = () => dispatch => {
//   return menuApiUtil.fetchTodayMenus().then(
//     payload => {
//       return dispatch(receiveTodayMenu(payload.data))
//     }
//   )
// }

const receiveShops = shops => {
  return {
    type: RECEIVE_ALL_SHOPS,
    shops
  }
}

const receiveMenus = payload => {
  return {
    type: RECEIVE_ALL_MENUS,
    payload
  };
};

const receiveErrors = errors => {
  return {
    type: RECEIVE_MENU_ERRORS,
    errors
  };
};
