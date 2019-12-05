import * as mealApiUtil from "../util/meal_api_util";

export const RECEIVE_ALL_MEALS = "RECEIVE_ALL_MEALS";
export const RECEIVE_SEARCH_MEALS = "RECEIVE_SEARCH_MEALS";
export const RECEIVE_MEAL_ERRORS = "RECEIVE_MEAL_ERRORS";

export const RECEIVE_ALL_SHOPS = "RECEIVE_ALL_SHOPS";

export const START_LOADING_ALL_MEALS = "START_LOADING_ALL_MEALS";
export const START_LOADING_SEARCH_MEALS = "START_LOADING_SEARCH_MEALS";

export const fetchMeals = schoolId => dispatch => {
  dispatch(startLoadingAllMeals());
  return mealApiUtil.fetchMeals(schoolId).then(
    payload => {
      dispatch(receiveShops(payload.data.shops))
      return dispatch(receiveMeals(payload.data.meals));
    },
    errors => dispatch(receiveErrors(errors.response.data))
  );
};

const receiveMeals = meals => {
  return {
    type: RECEIVE_ALL_MEALS,
    meals
  };
};


const receiveShops = shops => {
  return {
    type: RECEIVE_ALL_SHOPS,
    shops
  }
}

const receiveErrors = errors => {
  return {
    type: RECEIVE_MEAL_ERRORS,
    errors
  };
};

export const startLoadingAllMeals = () => ({
  type: START_LOADING_ALL_MEALS
});

export const startLoadingSearchMeals = () => ({
  type: START_LOADING_SEARCH_MEALS
});
