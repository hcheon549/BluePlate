import {
  RECEIVE_ALL_MENUS,
  RECEIVE_SEARCH_MENUS,
  RECEIVE_MENU_ERRORS
} from '../actions/menu_actions';

const menuErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_MENUS:
      return [];
    case RECEIVE_SEARCH_MENUS:
      return [];
    case RECEIVE_MENU_ERRORS:
      return action.errors;
    default:
      return oldState;
  }
};

export default menuErrorsReducer;
