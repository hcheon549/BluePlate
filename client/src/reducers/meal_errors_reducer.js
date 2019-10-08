import {
  RECEIVE_ALL_MEALS,
  RECEIVE_SEARCH_MEALS,
  RECEIVE_MEAL_ERRORS
} from '../actions/meal_actions';

const mealErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_MEALS:
      return [];
    case RECEIVE_SEARCH_MEALS:
      return [];
    case RECEIVE_MEAL_ERRORS:
      return action.errors;
    default:
      return oldState;
  }
};

export default mealErrorsReducer;
