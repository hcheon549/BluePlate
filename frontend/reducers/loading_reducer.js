
import {
  RECEIVE_ALL_MENUS,
  RECEIVE_MENU_ERRORS,
  START_LOADING_ALL_MENUS,
  RECEIVE_SEARCH_MENUS,
  START_LOADING_SEARCH_MENUS
} from '../actions/menu_actions';

const initialState = {
  fetchLoading: false,
  searchLoading: false
};

const loadingReducer = (state = initialState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_MENUS:
      return Object.assign({}, state, { fetchLoading: false });
    case RECEIVE_SEARCH_MENUS:
      return Object.assign({}, state, { searchLoading: false });
    case RECEIVE_MENU_ERRORS:
      return Object.assign({}, state,
        {fetchLoading: false, searchLoading: false });
    case START_LOADING_ALL_MENUS:
      return Object.assign({}, state, { fetchLoading: true });
    case START_LOADING_SEARCH_MENUS:
      return Object.assign({}, state, { searchLoading: true });
    default:
      return state;
  }
};

export default loadingReducer;
