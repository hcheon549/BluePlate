import {
  RECEIVE_ALL_MENUS
} from '../actions/menu_actions';


const shopResReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_MENUS:
      return action.payload.shops;
    default:
      return oldState;
  }
};

export default shopResReducer;
