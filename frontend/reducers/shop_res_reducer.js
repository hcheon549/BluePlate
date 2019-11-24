import {
  RECEIVE_ALL_MENUS
} from '../actions/menu_actions';


const shopResReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_MENUS:
      let shop = action.payload.shop ? action.payload.shop : {}
      return shop;
    default:
      return oldState;
  }
};

export default shopResReducer;
