import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import menuReducer from './menu_reducer';
import shopReducer from './shop_reducer';
import schoolReducer from './school_reducer';
import favoriteReducer from './favorite_reducer';
import reservationReducer from './reservation_reducer';
import menuResReducer from './menu_res_reducer';
import shopResReducer from './shop_res_reducer';
import planReducer from './plans_reducer';
import subscriptionReducer from './subscription_reducer';
import timeReducer from './time_reducer'

const entitiesReducer = combineReducers({
  currentUser: usersReducer,
  menus: menuReducer,
  menuRes: menuResReducer,
  shops: shopReducer,
  shopRes: shopResReducer,
  schools: schoolReducer,
  plans: planReducer,
  favorites: favoriteReducer,
  reservations: reservationReducer,
  subscription: subscriptionReducer,
  pickupTime: timeReducer,
});

export default entitiesReducer;
