import {
  RECEIVE_ALL_MEALS,
  RECEIVE_SEARCH_MEALS,
  RECEIVE_MEAL_ERRORS
} from '../actions/meal_actions';

const shopReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_MEALS:
      return action.payload.shops;
    case RECEIVE_SEARCH_MEALS:
      return action.payload.shops;
    case RECEIVE_MEAL_ERRORS:
      return [];
    default:
      return oldState;
  }
};

export default shopReducer;
