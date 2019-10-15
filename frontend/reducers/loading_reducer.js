
import {
  RECEIVE_ALL_MEALS,
  RECEIVE_SEARCH_MEALS,
  RECEIVE_MEAL_ERRORS,
  START_LOADING_ALL_MEALS,
  START_LOADING_SEARCH_MEALS
} from '../actions/meal_actions';

const initialState = {
  fetchLoading: false,
  searchLoading: false
};

const loadingReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_MEALS:
      return Object.assign({}, state, { fetchLoading: false });
    case RECEIVE_SEARCH_MEALS:
      return Object.assign({}, state, { searchLoading: false });
    case RECEIVE_MEAL_ERRORS:
      return Object.assign({}, state,
        {fetchLoading: false, searchLoading: false });
    case START_LOADING_ALL_MEALS:
      return Object.assign({}, state, { fetchLoading: true });
    case START_LOADING_SEARCH_MEALS:
      return Object.assign({}, state, { searchLoading: true });
    default:
      return state;
  }
};

export default loadingReducer;
