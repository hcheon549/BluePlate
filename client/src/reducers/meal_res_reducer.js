import {
  RECEIVE_ALL_MEALS
} from '../actions/meal_actions';


const mealResReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_MEALS:
      return action.payload.meals;
    default:
      return oldState;
  }
};

export default mealResReducer;
