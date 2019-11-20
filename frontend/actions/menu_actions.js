import * as mealApiUtil from "../util/meal_api_util";

export const RECEIVE_ALL_MENUS = "RECEIVE_ALL_MENUS";
export const RECEIVE_SEARCH_MENUS = "RECEIVE_SEARCH_MENUS";
export const RECEIVE_MENU_ERRORS = "RECEIVE_MENU_ERRORS";

export const START_LOADING_ALL_MENUS = "START_LOADING_ALL_MENUS";
export const START_LOADING_SEARCH_MENUS = "START_LOADING_SEARCH_MENUS";

export const fetchMenus = schoolId => dispatch => {
  dispatch(startLoadingAllMenus());
  return mealApiUtil.fetchMenus(schoolId).then(
    payload => {
      debugger
      return dispatch(receiveMenus(payload.data));
    },
    errors => dispatch(receiveErrors(errors.response.data))
  );
};

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

export const startLoadingAllMenus = () => ({
  type: START_LOADING_ALL_MENUS
});