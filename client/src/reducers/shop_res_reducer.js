import {
  RECEIVE_ALL_MEALS
} from '../actions/meal_actions';


const shopResReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_MEALS:
      return action.payload.shops;
    default:
      return oldState;
  }
};

export default shopResReducer;
