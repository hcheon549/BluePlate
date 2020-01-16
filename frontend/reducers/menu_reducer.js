import {
  RECEIVE_ALL_MENUS,
  RECEIVE_SEARCH_MENUS,
  RECEIVE_MENU_ERRORS
} from '../actions/menu_actions';

const menuReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  
  switch (action.type) {
    case RECEIVE_ALL_MENUS:
      let menus = action.payload.menus || {}
      return menus;
    case RECEIVE_SEARCH_MENUS:
      return action.payload.menus;
    case RECEIVE_MENU_ERRORS:
      return [];
    default:
      return oldState;
  }
};

export default menuReducer;