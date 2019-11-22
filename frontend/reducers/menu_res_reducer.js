import {
  RECEIVE_ALL_MENUS
} from '../actions/menu_actions';


const menuResReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_MENUS:
      debugger
      return action.payload.menus;
    default:
      return oldState;
  }
};

export default menuResReducer;
